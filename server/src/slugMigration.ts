import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Campaign from './models/Campaign.js';

dotenv.config();

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .replace(/[\s_-]+/g, '-') // Swap spaces for hyphens
    .replace(/^-+|-+$/g, ''); // Trim hyphens
};

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected for Slug Migration');

    const campaigns = await Campaign.find({});
    for (const c of campaigns) {
      if (!c.slug) {
        const newSlug = generateSlug(c.title);
        c.slug = newSlug;
        await c.save();
        console.log(`Updated campaign: ${c.title} -> ${newSlug}`);
      }
    }
    console.log('✅ Slug Migration Complete!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMigration();
