import type { Request, Response } from 'express';
import Report from '../models/Report.js';
import { pdfQueue } from '../workers/pdfWorker.js';

export const generateReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await Report.create({
      title: `Donations Report - ${new Date().toLocaleDateString()}`
    });

    await pdfQueue.add('generate-pdf', { reportId: report._id });

    res.status(202).json({ success: true, data: report });
  } catch (error: any) {
    res.status(500);
    throw new Error('Failed to queue report generation');
  }
};

export const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reports });
  } catch (error: any) {
    res.status(500);
    throw new Error('Failed to fetch reports');
  }
};
