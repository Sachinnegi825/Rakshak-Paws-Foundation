import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  campaignId: mongoose.Types.ObjectId;
  donorName: string;
  donorEmail: string;
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

const DonationSchema: Schema = new Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' }
}, { timestamps: true });

// Add Database Indexes for extremely fast lookups during Webhook Verifications
DonationSchema.index({ razorpayOrderId: 1 });
DonationSchema.index({ campaignId: 1, status: 1 });

export default mongoose.model<IDonation>('Donation', DonationSchema);
