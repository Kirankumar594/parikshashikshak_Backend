const mongoose = require('mongoose');
require('dotenv').config();
const Subscription = require('./Module/Admin/Subscription');

async function checkCurrentData() {
  try {
    await mongoose.connect(process.env.DB);
    console.log('Connected to database...\n');
    
    const subs = await Subscription.find({}).sort({ standard: 1, subject: 1 });
    
    console.log('Current subscriptions in database:');
    console.log('='.repeat(50));
    
    subs.forEach(sub => {
      console.log(`${sub.standard} - ${sub.subject}`);
      console.log(`  Annual: ₹${sub.pricing.annualCost}`);
      console.log(`  First Half: ₹${sub.pricing.midTermCost}`);
      console.log(`  Second Half: ₹${sub.pricing.finalTermCost}`);
      console.log(`  LBA: ₹${sub.pricing.lbaPrice + sub.pricing.lba2Price}`);
      console.log('');
    });
    
    console.log(`Total: ${subs.length} subscriptions`);
    
    // Check which standards are missing
    const existingStandards = [...new Set(subs.map(s => s.standard))];
    const allStandards = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
    const missingStandards = allStandards.filter(std => !existingStandards.includes(std));
    
    console.log('\nExisting standards:', existingStandards.join(', '));
    console.log('Missing standards:', missingStandards.join(', '));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkCurrentData();