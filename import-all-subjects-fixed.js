const mongoose = require("mongoose");
const XLSX = require('xlsx');
require("dotenv").config();

const Subscription = require("./Module/Admin/Subscription");

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
    
    console.log("Processing Excel data...\n");

    let imported = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    let currentStandard = '';

    for (let i = 2; i < jsonData.length; i++) { // Start from row 2 (skip headers)
      const row = jsonData[i];
      
      try {
        // Skip empty rows
        if (!row || row.length < 2) {
          skipped++;
          continue;
        }

        // Check if this row has a standard (first column)
        if (row[0] && row[0].toString().trim() !== '') {
          currentStandard = row[0].toString().trim();
        }

        // Get subject from second column
        const subject = row[1] ? row[1].toString().trim() : '';

        // Skip if no subject or no current standard
        if (!subject || !currentStandard || subject === 'Subject') {
          skipped++;
          continue;
        }

        // Skip summary rows (rows with only numbers, no text)
        if (!isNaN(subject) || subject.length < 2) {
          skipped++;
          continue;
        }

        console.log(`Processing: ${currentStandard} - ${subject}`);

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
          console.log(`✅ Updated: ${currentStandard} - ${subject}`);
          updated++;
        } else {
          // Create new subscription
          const newSubscription = new Subscription(subscriptionData);
          await newSubscription.save();
          console.log(`✅ Created: ${currentStandard} - ${subject}`);
          imported++;
        }
        
      } catch (error) {
        console.error(`❌ Error processing row ${i + 1}:`, error.message);
        errors++;
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("=== IMPORT SUMMARY ===");
    console.log(`Created: ${imported}`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
    console.log("=".repeat(60));

    // Show final statistics
    const allSubs = await Subscription.find({}).sort({ standard: 1, subject: 1 });
    
    console.log("\n📊 FINAL DATABASE CONTENTS:");
    console.log("=".repeat(60));
    
    const byStandard = {};
    const allSubjects = new Set();

    allSubs.forEach(sub => {
      if (!byStandard[sub.standard]) byStandard[sub.standard] = [];
      byStandard[sub.standard].push(sub.subject);
      allSubjects.add(sub.subject);
    });

    Object.keys(byStandard).sort().forEach(std => {
      console.log(`${std}: ${byStandard[std].join(', ')}`);
    });

    console.log("\n📚 All Subjects:", [...allSubjects].join(', '));
    console.log(`📈 Total subscriptions: ${allSubs.length}`);
    console.log("\n🎉 Import completed successfully!");

  } catch (error) {
    console.error("❌ Import failed:", error);
  } finally {
    mongoose.connection.close();
  }
}

importAllSubjects();