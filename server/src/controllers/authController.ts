import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { loginSchema } from '../dtos/auth.dto.js';

const generateToken = (id: string, username: string) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const loginAdmin = async (req: Request, res: Response): Promise<any> => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { username, password } = validatedData;

    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id.toString(), admin.username);
      
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        success: true,
        data: {
          _id: admin._id,
          username: admin.username,
        }
      });
    } else {
      res.status(401);
      throw new Error('Invalid username or password');
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(401).json({ success: false, error: error.message });
  }
};

export const registerAdmin = async (req: Request, res: Response): Promise<any> => {
  // Only for setup purposes, usually you'd remove this or secure it heavily
  try {
    const { username, password } = req.body;
    const adminExists = await Admin.findOne({ username });

    if (adminExists) {
      res.status(400);
      throw new Error('Admin already exists');
    }

    const admin = await Admin.create({ username, passwordHash: password });
    const token = generateToken(admin._id.toString(), admin.username);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: admin._id,
        username: admin.username,
      }
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
