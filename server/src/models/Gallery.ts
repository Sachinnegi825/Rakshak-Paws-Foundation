import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description: string;
  imageUrl: string;
  category: string; // e.g., 'Arrival & Intake', 'Rehabilitation & Foster', 'Forever Homes'
}

const GallerySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

GallerySchema.index({ category: 1 });

export default mongoose.model<IGallery>('Gallery', GallerySchema);
