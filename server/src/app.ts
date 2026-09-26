import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { connectDB } from './config/database.js';

import './workers/emailWorker.js';
import './workers/pdfWorker.js';

dotenv.config();

const app: Application = express();

// Connect to MongoDB in serverless environments
connectDB();

// Trust proxy is required for express-rate-limit when deploying to Vercel/Heroku/Render
app.set('trust proxy', 1);

// Security & Utility Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10kb' })); // Prevent large payloads
app.use(cookieParser());
// Removed mongoSanitize() due to IncomingMessage query getter conflict. Zod handles validation.

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reports', reportRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', workerStatus: 'active' });
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
