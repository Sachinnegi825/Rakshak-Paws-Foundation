import type { Request, Response } from 'express';
import Gallery from '../models/Gallery.js';

export const getGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await Gallery.countDocuments();
    const items = await Gallery.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    
    res.json({ 
      success: true, 
      data: items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, imageUrl, category } = req.body;
    if (!title || !imageUrl || !category) {
      res.status(400);
      throw new Error('Title, imageUrl, and category are required');
    }
    
    const item = await Gallery.create({ title, description, imageUrl, category });
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await Gallery.findByIdAndDelete(id);
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
};
