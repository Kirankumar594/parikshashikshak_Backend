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

async function importAllSubjects() {
  try {
    console.log("Starting import of ALL subjects...\n");

    // Read the Excel file
    const workbook = XLSX.readFile('../Subcription details.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON with proper headers
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Skip the first two rows (headers)
    const dataRows = jsonData.slice(2);
    
    let imported = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    console.log(`Processing ${dataRows.length} rows...\n`);

    let currentStandard = '';
    
    for (const [index, row] of dataRows.entries()) {
      try {
        // Skip completely empty rows
        if (!row || row.length === 0 || !row[1]) {
          skipped++;
          continue;
        }

        // Skip header rows
        if (row[0] === 'Standard' || row[1] === 'Subject') {
          skipped++;
          continue;
        }

        // Update current standard if we have a new one
        if (row[0] && row[0].toString().trim() !== '') {
          currentStandard = row[0].toString().trim();
        }

        const subject = row[1] ? row[1].toString().trim() : '';

        // Skip if we don't have valid subject or current standard
        if (!subject || !currentStandard || subject === '') {
          skipped++;
          continue;
        }

        // Skip if we don't have valid standard or subject
        if (!standard || !subject) {
          skipped++;
          continue;
        }

        const subscriptionData = {
          standard: currentStandard,
          subject: subject,
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
          standard: currentStandard,
          subject: subject
        });

        if (existingSubscription) {
          // Update existing subscription
          await Subscription.findByIdAndUpdate(existingSubscription._id, subscriptionData);
          console.log(`Updated: ${currentStandard} - ${subject}`);
          updated++;
        } else {
          // Create new subscription
          const newSubscription = new Subscription(subscriptionData);
          await newSubscription.save();
          console.log(`Created: ${currentStandard} - ${subject}`);
          imported++;
        }
        
      } catch (error) {
        console.error(`Error processing row ${index + 3}:`, error.message);
        console.error(`Row data:`, row);
        errors++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("=== Import Summary ===");
    console.log(`Created: ${imported}`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
    console.log("=".repeat(50));

    // Show final statistics
    const allSubs = await Subscription.find({}).sort({ standard: 1, subject: 1 });
    const byStandard = {};
    const bySubject = {};

    allSubs.forEach(sub => {
      if (!byStandard[sub.standard]) byStandard[sub.standard] = [];
      byStandard[sub.standard].push(sub.subject);
      
      if (!bySubject[sub.subject]) bySubject[sub.subject] = [];
      bySubject[sub.subject].push(sub.standard);
    });

    console.log("\nFinal Database Contents:");
    console.log("Standards:", Object.keys(byStandard).join(', '));
    console.log("Subjects:", Object.keys(bySubject).join(', '));
    console.log(`Total subscriptions: ${allSubs.length}`);

    console.log("\nImport completed successfully!");

  } catch (error) {
    console.error("Import failed:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the import
importAllSubjects();