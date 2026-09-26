import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest, AdminPayload } from '../types/index.js';
import logger from '../utils/logger.js';

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      const secret = process.env.JWT_SECRET || 'secret';
      const decoded = jwt.verify(token, secret) as unknown as AdminPayload;
      
      req.admin = decoded;
      next();
    } catch (error) {
      logger.error(`Auth Middleware Error: ${error}`);
      res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};
