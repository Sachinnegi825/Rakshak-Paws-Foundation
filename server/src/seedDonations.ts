import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Campaign from './models/Campaign.js';
import Donation from './models/Donation.js';

dotenv.config();

const firstNames = ['Sarah', 'John', 'Emily', 'Michael', 'Jessica', 'David', 'Ashley', 'James', 'Amanda', 'Robert', 'Megan', 'William', 'Hannah', 'Joseph', 'Olivia'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const getRandomName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
const getRandomEmail = (name: string) => `${name.replace(' ', '.').toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`;

const seedDonations = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected');

    await Donation.deleteMany({});
    console.log('Cleared existing Donations.');

    const campaigns = await Campaign.find({});
    
    if (campaigns.length === 0) {
      console.log('No campaigns found. Run seed.ts first.');
      process.exit();
    }

    let totalDonationsCreated = 0;

    for (const campaign of campaigns) {
      let remainingAmount = campaign.raisedAmount;
      const donationsToCreate = [];

      // Create between 10 and 25 donations per campaign to match the raised amount
      const numDonations = Math.floor(Math.random() * 15) + 10;

      for (let i = 0; i < numDonations; i++) {
        // If it's the last iteration, assign the exact remaining amount
        let amount = i === numDonations - 1 
          ? remainingAmount 
          : Math.floor(Math.random() * (remainingAmount / (numDonations - i)) * 1.5) + 10;
        
        // Prevent negative or zero amounts
        if (amount <= 0) amount = 10;
        if (amount > remainingAmount && i !== numDonations - 1) amount = remainingAmount - 10;

        remainingAmount -= amount;
        
        // Sometimes the math gets weird, ensure we don't go negative
        if (remainingAmount < 0) {
          amount += remainingAmount; // reduce amount
          remainingAmount = 0;
        }

        if (amount > 0) {
          const donorName = getRandomName();
          
          // Generate a random date within the last 6 months
          const pastDate = new Date();
          pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 180));

          donationsToCreate.push({
            campaignId: campaign._id,
            donorName: donorName,
            donorEmail: getRandomEmail(donorName),
            amount: amount,
            message: Math.random() > 0.5 ? 'Keep up the great work!' : undefined,
            razorpayOrderId: `fake_order_${Math.floor(Math.random() * 10000000)}`,
            razorpayPaymentId: `fake_pay_${Math.floor(Math.random() * 10000000)}`,
            status: 'COMPLETED',
            createdAt: pastDate, // Mocking historical data for graphs
          });
        }
      }

      if (donationsToCreate.length > 0) {
        await Donation.insertMany(donationsToCreate);
        totalDonationsCreated += donationsToCreate.length;
        console.log(`Created ${donationsToCreate.length} donations for campaign: ${campaign.title}`);
      }
    }

    console.log(`✅ Successfully seeded ${totalDonationsCreated} historical donations across all campaigns!`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDonations();
