import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Queue } from 'bullmq';
import dotenv from 'dotenv';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import { redisConnection } from '../config/redis.js';
import { createOrderSchema, verifyPaymentSchema } from '../validators/zodSchemas.js';

dotenv.config();

const emailQueue = new Queue('emailQueue', { connection: redisConnection });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = createOrderSchema.parse(req.body);
    const { campaignId, amount, donorName, donorEmail } = validatedData;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404);
      throw new Error('Campaign not found');
    }

    const options = {
      amount: amount * 100, // paisa
      currency: 'USD',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    await Donation.create({
      campaignId,
      donorName,
      donorEmail,
      amount,
      razorpayOrderId: order.id,
      status: 'PENDING'
    });

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      }
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400);
      throw error;
    }
    res.status(500);
    throw new Error(error.message || 'Failed to create order');
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = verifyPaymentSchema.parse(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = validatedData;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      res.status(400);
      throw new Error('Invalid signature');
    }

    // ACID TRANSACTIONS: Start a MongoDB session to ensure atomic updates
    const session = await mongoose.startSession();
    let finalDonation;
    let finalCampaign;

    await session.withTransaction(async () => {
      const donation = await Donation.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { razorpayPaymentId: razorpay_payment_id, status: 'COMPLETED' },
        { new: true, session }
      );

      if (!donation) {
        throw new Error('Donation record not found');
      }

      const campaign = await Campaign.findByIdAndUpdate(
        donation.campaignId,
        { $inc: { raisedAmount: donation.amount } },
        { new: true, session }
      );

      if (!campaign) {
        throw new Error('Campaign not found during update');
      }

      finalDonation = donation;
      finalCampaign = campaign;
    });

    session.endSession();

    if (finalCampaign && finalDonation) {
      await emailQueue.add('sendThankYouEmail', {
        donorName: (finalDonation as any).donorName,
        donorEmail: (finalDonation as any).donorEmail,
        amount: (finalDonation as any).amount,
        campaignTitle: (finalCampaign as any).title
      });
    }

    res.json({ 
      success: true, 
      message: 'Payment verified successfully and transaction committed.' 
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400);
      throw error;
    }
    res.status(500);
    throw new Error(error.message || 'Verification failed');
  }
};

export const getAllDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await Donation.countDocuments();
    const donations = await Donation.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('campaignId', 'title category');
      
    res.json({ 
      success: true, 
      data: donations,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
};
