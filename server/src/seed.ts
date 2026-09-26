import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cloudinary from './config/cloudinary.js';
import Admin from './models/Admin.js';
import Campaign from './models/Campaign.js';
import Gallery from './models/Gallery.js';

dotenv.config();

const uploadToCloudinary = async (imageUrl: string) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'rakshak-paws',
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Failed to upload image to Cloudinary: ${imageUrl}`, error);
    return imageUrl; // Fallback to original URL
  }
};

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected');

    // 1. Clear existing data
    await Campaign.deleteMany({});
    await Gallery.deleteMany({});
    console.log('Cleared existing Campaigns and Gallery items.');

    // 2. Campaigns Data
    const campaigns = [
      {
        title: "Emergency Food & Shelter Drive",
        description: "Help us provide immediate food and safe shelter for over 200 stray dogs this winter.",
        longDescription: "As temperatures drop, stray animals face life-threatening conditions. Your donation will directly fund heavy blankets, insulated shelters, and high-calorie nutritional food required for their survival.",
        imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
        goalAmount: 15000,
        raisedAmount: 12450,
        category: "Food & Shelter",
        isFeatured: true,
      },
      {
        title: "Critical Medical Care Fund",
        description: "Funding emergency surgeries, vaccinations, and life-saving treatments for injured rescues.",
        longDescription: "Our medical wing is currently at capacity. We urgently need funds to purchase surgical supplies, antibiotics, and specialized equipment to save animals rescued from severe accidents.",
        imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
        goalAmount: 25000,
        raisedAmount: 8900,
        category: "Emergency Medical",
        isFeatured: true,
      },
      {
        title: "Senior Dog Sanctuary",
        description: "Building a comfortable, specialized hospice facility for elderly dogs to live their final years.",
        longDescription: "Older dogs are often overlooked in shelters. We are building a dedicated sanctuary with orthopedic beds, gentle heating, and specialized care to ensure they spend their final years in absolute comfort.",
        imageUrl: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=800&auto=format&fit=crop",
        goalAmount: 40000,
        raisedAmount: 31000,
        category: "Sanctuary",
        isFeatured: false,
      },
      {
        title: "Feline Spay & Neuter Initiative",
        description: "Controlling the street cat population safely and humanely through our mass TNR program.",
        longDescription: "Trap-Neuter-Return (TNR) is the most humane way to control feral cat populations. This fund covers the veterinary costs of spaying/neutering and vaccinating 500 street cats this month.",
        imageUrl: "https://images.unsplash.com/photo-1537151608804-ea2d15a8378a?q=80&w=800&auto=format&fit=crop",
        goalAmount: 10000,
        raisedAmount: 4500,
        category: "Community Initiative",
        isFeatured: false,
      },
      {
        title: "Puppy Socialization Playroom",
        description: "Funding the construction of a safe, interactive indoor playroom for orphaned puppies.",
        longDescription: "Orphaned puppies need critical socialization to become adoptable. We are building an indoor facility filled with enriching toys and safe surfaces to help them learn and grow.",
        imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
        goalAmount: 8000,
        raisedAmount: 7200,
        category: "Rehabilitation",
        isFeatured: false,
      }
    ];

    console.log('Uploading Campaign images to Cloudinary and saving to DB...');
    for (const c of campaigns) {
      console.log(`Processing: ${c.title}...`);
      const secureUrl = await uploadToCloudinary(c.imageUrl);
      const slug = generateSlug(c.title);
      await Campaign.create({ ...c, imageUrl: secureUrl, slug });
    }

    // 3. Gallery Data
    const galleryItems = [
      {
        title: "Luna's Arrival",
        description: "Scared but safe. Luna's first day at the shelter.",
        category: "Arrival & Intake",
        imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "First Checkup",
        description: "Our head vet Dr. Sarah performing an initial exam.",
        category: "Arrival & Intake",
        imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Midnight Rescue",
        description: "Bringing in a trapped feral kitten from the storm.",
        category: "Arrival & Intake",
        imageUrl: "https://images.unsplash.com/photo-1537151608804-ea2d15a8378a?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Learning to Trust",
        description: "A beautiful moment captured between a foster volunteer and her newly rescued golden retriever.",
        category: "Rehabilitation & Foster",
        imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Puppy Socialization",
        description: "Orphaned puppies learning critical social skills in our safe indoor playroom.",
        category: "Rehabilitation & Foster",
        imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "First Walk Home",
        description: "The very first walk in their new neighborhood.",
        category: "Forever Homes",
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Happy Tails Adoption",
        description: "That exact moment when a family realizes they've found the perfect addition to their home.",
        category: "Forever Homes",
        imageUrl: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Cat Naps",
        description: "Settling into the new couch perfectly.",
        category: "Forever Homes",
        imageUrl: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Street Rescue",
        description: "Our volunteer team found this little guy hiding under a car during the storm.",
        category: "Arrival & Intake",
        imageUrl: "https://images.unsplash.com/photo-1548802673-38020fb237e1?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Physical Therapy",
        description: "Max learning to use his hind legs again on the underwater treadmill.",
        category: "Rehabilitation & Foster",
        imageUrl: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "First Bath",
        description: "Getting rid of the street dirt and fleas! Surprisingly calm.",
        category: "Rehabilitation & Foster",
        imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Siblings Together",
        description: "These two brothers were adopted together by a wonderful family.",
        category: "Forever Homes",
        imageUrl: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Snow Day Play",
        description: "Experiencing snow for the first time after recovering from frostbite.",
        category: "Rehabilitation & Foster",
        imageUrl: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "The Perfect Match",
        description: "A match made in heaven. She knew he was the one the moment they locked eyes.",
        category: "Forever Homes",
        imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=800&auto=format&fit=crop",
      }
    ];

    console.log('Uploading Gallery images to Cloudinary and saving to DB...');
    for (const item of galleryItems) {
      console.log(`Processing: ${item.title}...`);
      const secureUrl = await uploadToCloudinary(item.imageUrl);
      await Gallery.create({ ...item, imageUrl: secureUrl });
    }

    console.log('✅ All fake data and images successfully uploaded to Cloudinary and MongoDB!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
