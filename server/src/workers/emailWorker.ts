import { Worker } from 'bullmq';
import Redis from 'ioredis';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const redisConnection = new (Redis as any)(process.env.REDIS_URL as string, { maxRetriesPerRequest: null });

// Setup Nodemailer transporter (Ethereal or real SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailWorker = new Worker('emailQueue', async job => {
  const { donorName, donorEmail, amount, campaignTitle } = job.data;

  logger.info(`Processing email job for ${donorEmail}`);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-w-xl; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #0EA5E9;">Thank You, ${donorName}!</h2>
      <p>We have successfully received your generous donation of <strong>$${amount}</strong> towards the <strong>${campaignTitle}</strong> campaign.</p>
      <p>Your contribution directly saves lives. We cannot do this without you.</p>
      <p>With gratitude,<br/>The Rakshak Paws Foundation Team</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"Rakshak Paws Foundation" <no-reply@rakshakpaws.org>',
      to: donorEmail,
      subject: `Thank you for your donation to ${campaignTitle}!`,
      html: htmlContent,
    });
    logger.info(`Email sent: ${info.messageId}`);
  } catch (error) {
    logger.error(`Failed to send email to ${donorEmail}: ${error}`);
    throw error;
  }
}, { connection: redisConnection as any });

emailWorker.on('completed', job => {
  logger.info(`Job ${job.id} has completed!`);
});

emailWorker.on('failed', (job, err) => {
  logger.error(`Job ${job?.id} has failed with ${err.message}`);
});
