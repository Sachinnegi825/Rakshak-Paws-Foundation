import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  isFeatured: boolean;
  isActive: boolean;
}

const CampaignSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  imageUrl: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Add Database Indexes for fast querying
CampaignSchema.index({ isActive: 1, isFeatured: -1 });
CampaignSchema.index({ category: 1 });

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);
