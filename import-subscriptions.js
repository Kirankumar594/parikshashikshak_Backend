const mongoose = require("mongoose");
const XLSX = require('xlsx');
require("dotenv").config();

// Import the Subscription model
const Subscription = require("./Module/Admin/Subscription");

// Connect to MongoDB
mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database Connected for import..."))
  .catch((err) => console.log("Database Not Connected !!!", err));

async function importSubscriptions() {
  try {
    console.log("Starting subscription import...");

    // Read the Excel file
    const workbook = XLSX.readFile('../Subcription details.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON with proper headers
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Skip the first two rows (headers)
    const dataRows = jsonData.slice(2);
    
    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const row of dataRows) {
      try {
        // Skip empty rows
        if (!row[0] || !row[1] || row[0] === 'Standard' || row[1] === 'Subject') {
          skipped++;
          continue;
        }

        const subscriptionData = {
          standard: row[0].toString().trim(),
          subject: row[1].toString().trim(),
          assessmentCounts: {
            lba: parseInt(row[2]) || 0,
            fa1: parseInt(row[3]) || 0,
            fa2: parseInt(row[4]) || 0,
            sa1: parseInt(row[5]) || 0,
            midTerm: parseInt(row[6]) || 0,
            lba2: parseInt(row[7]) || 0,
            fa3: parseInt(row[8]) || 0,
            fa4: parseInt(row[9]) || 0,
            sa2: parseInt(row[10]) || 0,
            finalTerm: parseInt(row[11]) || 0
          },
          pricing: {
            lbaPrice: parseInt(row[12]) || 0,
            fa1Price: parseInt(row[13]) || 0,
            fa2Price: parseInt(row[14]) || 0,
            sa1Price: parseInt(row[15]) || 0,
            midTermCost: parseInt(row[16]) || 0,
            lba2Price: parseInt(row[17]) || 0,
            fa3Price: parseInt(row[18]) || 0,
            fa4Price: parseInt(row[19]) || 0,
            sa2Price: parseInt(row[20]) || 0,
            finalTermCost: parseInt(row[21]) || 0,
            annualCost: parseInt(row[22]) || 0
          }
        };

        // Check if subscription already exists
        const existingSubscription = await Subscription.findOne({
          standard: subscriptionData.standard,
          subject: subscriptionData.subject
        });

        if (existingSubscription) {
          // Update existing subscription
          await Subscription.findByIdAndUpdate(existingSubscription._id, subscriptionData);
          console.log(`Updated: ${subscriptionData.standard} - ${subscriptionData.subject}`);
        } else {
          // Create new subscription
          const newSubscription = new Subscription(subscriptionData);
          await newSubscription.save();
          console.log(`Created: ${subscriptionData.standard} - ${subscriptionData.subject}`);
        }
        
        imported++;
      } catch (error) {
        console.error(`Error processing row:`, error.message);
        console.error(`Row data:`, row);
        errors++;
      }
    }

    console.log("\n=== Import Summary ===");
    console.log(`Total processed: ${imported}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
    console.log("Import completed!");

  } catch (error) {
    console.error("Import failed:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the import
importSubscriptions();