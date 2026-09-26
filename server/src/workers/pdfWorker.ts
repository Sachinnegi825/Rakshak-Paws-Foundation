import { Queue, Worker } from 'bullmq';
import PDFDocument from 'pdfkit';
import { v2 as cloudinary } from 'cloudinary';
import Report from '../models/Report.js';
import Donation from '../models/Donation.js';

const connection = {
  url: process.env.REDIS_URL || 'redis://localhost:6379'
};

export const pdfQueue = new Queue('pdfQueue', { connection });

const worker = new Worker('pdfQueue', async job => {
  const { reportId } = job.data;
  
  try {
    console.log(`Starting PDF generation for report ${reportId}`);
    const report = await Report.findById(reportId);
    if (!report) throw new Error('Report not found');

    const donations = await Donation.find().sort({ createdAt: -1 });

    const doc = new PDFDocument({ margin: 50 });
    
    // Generate PDF to buffer
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    
    // Build PDF content
    doc.fontSize(24).text('Rakshak Paws Foundation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text('Complete Donations Report', { align: 'center' });
    doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(12);
    let totalAmount = 0;
    
    donations.forEach((d, i) => {
      if (d.status === 'COMPLETED') totalAmount += d.amount;
      doc.text(`${i + 1}. ${d.donorName} (${d.donorEmail}) - $${d.amount} - ${d.status}`);
      doc.text(`   Date: ${new Date(d.createdAt).toLocaleString()} | Campaign: ${d.campaignId || 'General'}`);
      doc.moveDown(0.5);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Completed Donations: $${totalAmount.toLocaleString()}`, { font: 'Helvetica-Bold' });

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    // Upload to Cloudinary as raw file
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', format: 'pdf', folder: 'reports' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(pdfBuffer);
    });

    const secureUrl = (uploadResult as any).secure_url;

    // Update report in DB
    await Report.findByIdAndUpdate(reportId, { status: 'COMPLETED', url: secureUrl });
    console.log(`PDF generation completed for report ${reportId}`);
    
  } catch (error: any) {
    console.error(`PDF generation failed for report ${reportId}:`, error);
    await Report.findByIdAndUpdate(reportId, { status: 'FAILED', error: error.message });
  }
}, { connection });

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error ${err.message}`);
});
