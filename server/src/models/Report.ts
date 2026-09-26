import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  url: { type: String },
  error: { type: String }
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
