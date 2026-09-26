import type { Request, Response } from 'express';
import Campaign from '../models/Campaign.js';
import { createCampaignSchema, updateCampaignSchema } from '../dtos/campaign.dto.js';

export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await Campaign.countDocuments();
    const campaigns = await Campaign.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    
    res.json({ 
      success: true, 
      data: campaigns,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500);
    throw new Error('Failed to fetch campaigns');
  }
};

export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createCampaignSchema.parse(req.body);
    const campaign = await Campaign.create(validatedData);
    res.status(201).json({ success: true, data: campaign });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400);
      throw error;
    }
    res.status(400);
    throw new Error(error.message);
  }
};

export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    let campaign;
    
    // Check if the id parameter is a valid MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      campaign = await Campaign.findById(id);
    } else {
      // Otherwise search by slug
      campaign = await Campaign.findOne({ slug: id });
    }

    if (!campaign) {
      res.status(404);
      throw new Error('Campaign not found');
    }
    res.json({ success: true, data: campaign });
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = updateCampaignSchema.parse(req.body);
    
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }
    
    const campaign = await Campaign.findOneAndUpdate(query, validatedData, { new: true, runValidators: true });
    
    if (!campaign) {
      res.status(404);
      throw new Error('Campaign not found');
    }
    
    res.json({ success: true, data: campaign });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400);
      throw error;
    }
    res.status(400);
    throw new Error(error.message);
  }
};

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }

    const campaign = await Campaign.findOneAndDelete(query);
    
    if (!campaign) {
      res.status(404);
      throw new Error('Campaign not found');
    }
    
    res.json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
};
