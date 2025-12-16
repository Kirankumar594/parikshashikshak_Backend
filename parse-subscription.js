const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file
const workbook = XLSX.readFile('../Subcription details.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON with proper headers
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('Raw first few rows:');
console.log(jsonData.slice(0, 5));

// Parse the structure - it looks like a pricing table
const headers = jsonData[0]; // First row contains headers
const dataRows = jsonData.slice(1); // Skip header row

console.log('\nHeaders:', headers);
console.log('Number of data rows:', dataRows.length);

// Create structured data
const subscriptionPlans = [];

dataRows.forEach((row, index) => {
  if (row.length > 0 && row[0]) { // Skip empty rows
    const plan = {
      id: index + 1,
      standard: row[0] || '',
      subject: row[1] || '',
      englishMedium: {
        lba: row[2] || 0,
        fa1: row[3] || 0,
        fa2: row[4] || 0,
        sa1: row[5] || 0,
        midTerm: row[6] || 0,
        lba2: row[7] || 0,
        fa3: row[8] || 0,
        fa4: row[9] || 0,
        sa2: row[10] || 0,
        finalTerm: row[11] || 0
      },
      pricing: {
        lbaPrice: row[12] || 0,
        fa1Price: row[13] || 0,
        fa2Price: row[14] || 0,
        sa1Price: row[15] || 0,
        midTermCost: row[16] || 0,
        lba2Price: row[17] || 0,
        fa3Price: row[18] || 0,
        fa4Price: row[19] || 0,
        sa2Price: row[20] || 0,
        finalTermCost: row[21] || 0,
        annualCost: row[22] || 0
      }
    };
    
    subscriptionPlans.push(plan);
  }
});

console.log('\nParsed subscription plans:');
console.log(JSON.stringify(subscriptionPlans.slice(0, 3), null, 2));

// Save structured data
fs.writeFileSync('../structured-subscription-data.json', JSON.stringify(subscriptionPlans, null, 2));
console.log(`\nSaved ${subscriptionPlans.length} subscription plans to structured-subscription-data.json`);