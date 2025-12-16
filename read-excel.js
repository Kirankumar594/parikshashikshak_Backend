const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file (one level up from backend folder)
const workbook = XLSX.readFile('../Subcription details.xlsx');

// Get the first sheet name
const sheetName = workbook.SheetNames[0];
console.log('Sheet name:', sheetName);

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);

console.log('Number of rows:', jsonData.length);
console.log('\nFirst few rows:');
console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));

console.log('\nColumn headers:');
if (jsonData.length > 0) {
  console.log(Object.keys(jsonData[0]));
}

// Save as JSON file for easier processing
fs.writeFileSync('../subscription-data.json', JSON.stringify(jsonData, null, 2));
console.log('\nData saved to subscription-data.json');