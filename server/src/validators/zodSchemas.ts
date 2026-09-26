import { z } from 'zod';

export const createOrderSchema = z.object({
  campaignId: z.string().min(1, "Campaign ID is required"),
  amount: z.number().min(5, "Minimum donation amount is $5"),
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  donorEmail: z.string().email("Invalid email address")
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string()
});
