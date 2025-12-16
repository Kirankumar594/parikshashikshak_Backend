const mongoose = require("mongoose");
const Subscription = require("./Module/Admin/Subscription");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB using the same connection as the main app
mongoose.connect(process.env.DB);

async function updateTestPricing() {
  try {
    console.log("🔄 Updating subscription pricing for testing...");

    // Update all subscriptions to have ₹1 for First Half-Year (midTermCost)
    const result = await Subscription.updateMany(
      {}, // Update all subscriptions
      {
        $set: {
          "pricing.midTermCost": 1, // Set First Half-Year to ₹1
          updatedAt: new Date()
        }
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} subscription records`);

    // Also update the bundle calculation in the controller
    console.log("📋 Current subscription plans:");
    const subscriptions = await Subscription.find({}).select('standard subject pricing');
    
    subscriptions.forEach(sub => {
      console.log(`${sub.standard} - ${sub.subject}: First Half = ₹${sub.pricing.midTermCost}`);
    });

    console.log("\n🎯 Test pricing update complete!");
    console.log("First Half-Year plans are now ₹1 for all subjects");
    
  } catch (error) {
    console.error("❌ Error updating pricing:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the update
updateTestPricing();