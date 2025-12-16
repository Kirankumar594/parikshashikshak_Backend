// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");
// const PDFKit = require("pdfkit");
// require("dotenv").config();
// // Configure nodemailer with YOUR credentials
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Uses amitparnets@gmail.com
//     pass: process.env.EMAIL_PASS  // Uses your app password
//   },
// });
// const sendReceipt = async (username, email, amount, transactionId) => {
//   try {
//     // Initialize PDF document
//     const doc = new PDFKit({ margin: 50 });
//     let buffers = [];
    
//     doc.on('data', buffers.push.bind(buffers));
    
//     // Header Section
//     // Assuming logo.png is in your project directory
//     try {
//       doc.image('logo.png', 50, 30, { width: 100 });
//     } catch (imgErr) {
//       console.warn('Logo image not found, skipping logo.');
//     }
    
//     doc.font('Helvetica-Bold')
//        .fontSize(20)
//        .fillColor('#1E3A8A')
//        .text('ParikshaShikshak', 200, 50, { align: 'center' })
//        .fontSize(14)
//        .fillColor('#4B5563')
//        .text('Payment Receipt', 200, 75, { align: 'center' });
    
//     doc.moveDown(2);
    
//     // Website Link
//     doc.font('Helvetica')
//        .fontSize(12)
//        .fillColor('#2563EB')
//        .text('Visit us at: https://parikshashikshak.com', { align: 'center', link: 'https://parikshashikshak.com' });
    
//     // Separator Line
//     doc.moveDown(1)
//        .lineWidth(1)
//        .strokeColor('#D1D5DB')
//        .moveTo(50, 120)
//        .lineTo(550, 120)
//        .stroke();
    
//     // Receipt Details
//     doc.moveDown(2)
//        .font('Helvetica-Bold')
//        .fontSize(12)
//        .fillColor('#111827')
//        .text('Receipt Details', 50, 140);
    
//     doc.font('Helvetica')
//        .fontSize(12)
//        .fillColor('#4B5563')
//        .text(`Name: ${username}`, 50, 160)
//        .text(`Email: ${email}`, 50, 180)
//        .text(`Amount: ₹${amount}`, 50, 200)
//        .text(`Transaction ID: ${transactionId}`, 50, 220)
//        .text(`Date: ${new Date().toLocaleString()}`, 50, 240);
    
//     // Footer
//     doc.moveDown(4)
//        .font('Helvetica-Oblique')
//        .fontSize(10)
//        .fillColor('#6B7280')
//        .text('Thank you for choosing ParikshaShikshak!', { align: 'center' })
//        .text('For support, contact us at support@parikshashikshak.com', { align: 'center' });
    
//     // Finalize PDF
//     doc.end();
    
//     // Email sending
//     doc.on('end', async () => {
//       try {
//         const pdfBuffer = Buffer.concat(buffers);
        
//         // Email transporter (configure with your credentials)
//         const transporter = nodemailer.createTransport({
//           service: 'gmail', // or your email service
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//           }
//         });
        
//         // Email content
//         await transporter.sendMail({
//           from: `"ParikshaShikshak" <${process.env.EMAIL_USER}>`,
//           to: email,
//           subject: 'Payment Receipt Confirmation',
//           html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//               <h2 style="color: #1E3A8A; text-align: center;">ParikshaShikshak</h2>
//               <h3 style="color: #4B5563; text-align: center;">Payment Successful!</h3>
//               <p>Dear ${username},</p>
//               <p>Thank you for your payment of ₹${amount}.</p>
//               <p><strong>Transaction ID:</strong> ${transactionId}</p>
//               <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
//               <p>Please find your receipt attached. Visit us at <a href="https://parikshashikshak.com">parikshashikshak.com</a> for more details.</p>
//               <p style="color: #6B7280; text-align: center;">For support, contact us at support@parikshashikshak.com</p>
//             </div>
//           `,
//           attachments: [{
//             filename: `Receipt-${transactionId}.pdf`,
//             content: pdfBuffer
//           }]
//         });
        
//         // res.json({ success: true, message: 'Receipt sent successfully' });
//       } catch (emailErr) {
//         console.error('Email failed:', emailErr);
       
//       }
//     });
    
//   } catch (error) {
//     console.error('Error generating receipt:', error);
 
//   }
// };

// router.post("/send-receipt", express.json(), async (req, res) => {
//   try {
//     const { username, email, amount, transactionId } = req.body;

//     // Validation 
//     if (!email || !username || !amount || !transactionId) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields"
//       });
//     }

//    sendReceipt(username,email,amount,transactionId)


//     // PDF Content
//    return res.status(200).json({success:"Successfully send recipt"})

//   } catch (err) {
//     console.error("Server error:", err);
//     res.status(500).json({ 
//       success: false, 
//       error: "Internal server error" 
//     });
//   }
// });

// module.exports = router;  
 
 
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// const sendReceipt = async (username, email, amount, transactionId) => {
//   try {
//     const doc = new PDFDocument({ margin: 40, size: "A4" });
//     const buffers = [];

//     doc.on("data", buffers.push.bind(buffers));

//     const primaryColor = "#1E3A8A";     // Indigo
//     const secondaryColor = "#F3F4F6";   // Gray background
//     const textColor = "#111827";        // Dark text
//     const highlightColor = "#2563EB";   // Accent blue
//     const lightGray = "#9CA3AF";

//     // HEADER SECTION
//     try {
//       doc.image("logo.png", 40, 40, { width: 60 });
//     } catch {
//       console.warn("Logo not found. Skipping image.");
//     }

//     doc
//       .font("Helvetica-Bold")
//       .fontSize(24)
//       .fillColor(primaryColor)
//       .text("ParikshaShikshak", 110, 45);

//     doc
//       .fontSize(12)
//       .fillColor(lightGray)
//       .text("Online Education Platform", 110, 72);

//     doc
//       .fontSize(10)
//       .fillColor(highlightColor)
//       .text("https://parikshashikshak.com", 40, 100);

//     // Receipt Box
//     doc
//       .moveTo(40, 130)
//       .lineTo(555, 130)
//       .strokeColor(secondaryColor)
//       .stroke();

//     doc
//       .fontSize(18)
//       .fillColor(primaryColor)
//       .text("Payment Receipt", 40, 145);

//     doc
//       .fontSize(10)
//       .fillColor(textColor)
//       .text(`Receipt Date: ${new Date().toLocaleString()}`, 40, 165);

//     // USER DETAILS SECTION
//     doc
//       .rect(40, 190, 515, 80)
//       .fill(secondaryColor);

//     doc
//       .fillColor(textColor)
//       .font("Helvetica-Bold")
//       .fontSize(12)
//       .text("Student Information", 50, 200);

//     doc
//       .font("Helvetica")
//       .fontSize(11)
//       .fillColor("#374151")
//       .text(`Name: ${username}`, 50, 220)
//       .text(`Email: ${email}`, 50, 240);

//     // TRANSACTION DETAILS SECTION
//     doc
//       .fillColor(primaryColor)
//       .font("Helvetica-Bold")
//       .fontSize(13)
//       .text("Transaction Summary", 40, 290);

//     doc
//       .font("Helvetica")
//       .fontSize(11)
//       .fillColor(textColor)
//       .text(`Transaction ID: ${transactionId}`, 50, 315)
//       .text(`Status: Successful`, 50, 335)
//       .text(`Mode: UPI / Card / Netbanking`, 50, 355);

//     // AMOUNT BOX
//     doc
//       .roundedRect(360, 310, 180, 60, 8)
//       .fill(highlightColor);

//     doc
//       .fillColor("#FFFFFF")
//       .font("Helvetica-Bold")
//       .fontSize(14)
//       .text("Amount Paid", 370, 320);

//     doc
//       .fontSize(18)
//       .text(`₹${amount}`, 370, 340);

//     // FOOTER
//     doc
//       .moveTo(40, 430)
//       .lineTo(555, 430)
//       .strokeColor(secondaryColor)
//       .stroke();

//     doc
//       .font("Helvetica-Oblique")
//       .fontSize(10)
//       .fillColor("#6B7280")
//       .text("Thank you for your payment!", 50, 450)
//       .text("For support, contact support@parikshashikshak.com", 50, 465);

//     doc.end();

//     doc.on("end", async () => {
//       const pdfBuffer = Buffer.concat(buffers);

//       await transporter.sendMail({
//         from: `"ParikshaShikshak" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Your ParikshaShikshak Payment Receipt",
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
//             <h2 style="color: #1E3A8A; text-align: center;">ParikshaShikshak</h2>
//             <p>Hello <strong>${username}</strong>,</p>
//             <p>Thank you for your payment of ₹${amount}.</p>
//             <p><strong>Transaction ID:</strong> ${transactionId}</p>
//             <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
//             <p>Your receipt is attached as a PDF. For any issues, reach out to our support.</p>
//             <p style="text-align: center; color: #6B7280;">support@parikshashikshak.com</p>
//           </div>
//         `,
//         attachments: [
//           {
//             filename: `Receipt-${transactionId}.pdf`,
//             content: pdfBuffer,
//           },
//         ],
//       });
//     });
//   } catch (error) {
//     console.error("Error generating receipt:", error);
//   }
// };
  




// const sendReceipt = async (username, email, amount, transactionId) => {
//   try {
//     const doc = new PDFDocument({ margin: 40, size: "A4" });
//     const buffers = [];

//     doc.on("data", buffers.push.bind(buffers));

//     // COLORS
//     const primaryColor = "#1E3A8A";
//     const textColor = "#111827";
//     const lightGray = "#6B7280";
//     const highlightColor = "#16a34a";

//     // HEADER
//     try {
//       doc.image("logo.png", 40, 30, { width: 60 });
//     } catch {
//       console.warn("Logo not found");
//     }

//     doc
//       .font("Helvetica-Bold")
//       .fontSize(18)
//       .fillColor(primaryColor)
//       .text("PAID INVOICE", 400, 40, { align: "right" });

//     doc
//       .fontSize(10)
//       .fillColor(textColor)
//       .text(`Invoice#: ${transactionId}`, 400, 60, { align: "right" })
//       .text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 400, 75, {
//         align: "right",
//       });

//     // INVOICE TO BOX
//     doc.rect(40, 110, 515, 90).fill("#F3F4F6");

//     // Left Section: User Info
//     doc
//       .fillColor(textColor)
//       .font("Helvetica-Bold")
//       .fontSize(11)
//       .text("Invoice To:", 50, 120);

//     doc
//       .font("Helvetica")
//       .fontSize(10)
//       .text(username, 50, 135)
//       .text(email, 50, 150);

//     // Right Section: Static Address
//     doc
//       .font("Helvetica-Bold")
//       .fontSize(10)
//       .text("ARIVUBODHI", 320, 120, { align: "left" })
//       .text("SHIKSHAK TALENTS LLP.", 320, 133)
//       .font("Helvetica")
//       .text("138,1st Floor, 20th Main Road,", 320, 146)
//       .text("53rd Cross, 8th Block, Rajajinagar,", 320, 159)
//       .text("Bengaluru, 560010", 320, 172)
//       .text("info@shikshakworld.com", 320, 185);

//     doc
//       .font("Helvetica-Bold")
//       .text("GSTIN : 29ACGFA8346M1ZS", 40, 205);

//     // TABLE HEADERS
//     const tableTop = 230;
//     const columnWidths = [100, 200, 60, 60, 80];
//     const headers = ["Item Type", "Remark", "Price", "Quantity", "Amount"];
//     let x = 40;
//     doc.font("Helvetica-Bold").fontSize(10).fillColor(textColor);
//     headers.forEach((text, i) => {
//       doc.text(text, x, tableTop, { width: columnWidths[i] });
//       x += columnWidths[i];
//     });
//     doc.moveTo(40, tableTop + 15).lineTo(555, tableTop + 15).stroke();

//     // TABLE ROW
//     const rowY = tableTop + 25;
//     const row = ["Question Paper", "", `₹${amount}`, `₹${amount}`];
//     x = 40;
//     doc.font("Helvetica").fontSize(10).fillColor("#374151");
//     row.forEach((text, i) => {
//       doc.text(text, x, rowY, { width: columnWidths[i] });
//       x += columnWidths[i];
//     });

//     // AMOUNT SECTION
//     const amountY = rowY + 50;
//     doc
//       .font("Helvetica-Bold")
//       .fontSize(10)
//       .fillColor(textColor)
//       .text("Sub Total", 400, amountY)
//       .text(`₹${amount}`, 500, amountY, { align: "right" });

//     doc
//       .text("Grand Total", 400, amountY + 40)
//       .text(`₹${amount}`, 500, amountY + 40, { align: "right" });

//     // TRANSACTION SUMMARY TABLE
//     const boxY = amountY + 90;
//     doc
//       .moveTo(40, boxY)
//       .lineTo(555, boxY)
//       .stroke();

//     doc
//       .font("Helvetica-Bold")
//       .fontSize(10)
//       .fillColor(textColor)
//       .text("Transaction Date", 45, boxY + 10)
//       .text("Transaction ID", 160, boxY + 10)
//       .text("Gateway", 300, boxY + 10)
//       .text("Total Paid", 420, boxY + 10);

//     doc
//       .font("Helvetica")
//       .fillColor("#374151")
//       .text(new Date().toLocaleDateString("en-GB"), 45, boxY + 30)
//       .text(transactionId, 160, boxY + 30)
//       .text("PhonePe", 300, boxY + 30)
//       .text(`₹${amount}`, 420, boxY + 30);

//     doc
//       .moveTo(40, boxY + 50)
//       .lineTo(555, boxY + 50)
//       .stroke();

//     // FOOTER
//     doc
//       .moveTo(40, 750)
//       .lineTo(555, 750)
//       .strokeColor("#e5e7eb")
//       .stroke();

//     doc
//       .font("Helvetica-Oblique")
//       .fontSize(10)
//       .fillColor("#6B7280")
//       .text("Thank you for your payment!", 50, 760)
//       .text("For support, contact support@parikshashikshak.com", 50, 775);

//     doc.end();

//     doc.on("end", async () => {
//       const pdfBuffer = Buffer.concat(buffers);

//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       await transporter.sendMail({
//         from: `"Pariksha Shikshak" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Your ParikshaShikshak Payment Receipt",
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
//             <h2 style="color: #1E3A8A; text-align: center;">ParikshaShikshak</h2>
//             <p>Hello <strong>${username}</strong>,</p>
//             <p>Thank you for your payment of ₹${amount}.</p>
//             <p><strong>Transaction ID:</strong> ${transactionId}</p>
//             <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
//             <p>Your receipt is attached as a PDF. For any issues, reach out to our support.</p>
//             <p style="text-align: center; color: #6B7280;">support@parikshashikshak.com</p>
//           </div>
//         `,
//         attachments: [
//           {
//             filename: `Receipt-${transactionId}.pdf`,
//             content: pdfBuffer,
//           },
//         ],
//       });
//     });
//   } catch (err) {
//     console.error("Receipt error:", err);
//   }
// };




const sendReceipt = async (username, email, amount, transactionId) => {
  try {
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    // COLORS
    const primaryColor = "#1E3A8A";
    const textColor = "#111827";
    const lightGray = "#6B7280";
    const highlightColor = "#16a34a";

    // AMOUNT CALCULATION
    const grandTotal = parseFloat(amount);
    const subTotal = parseFloat((grandTotal / 1.204).toFixed(2));
    const igst = parseFloat((subTotal * 0.18).toFixed(2));
    const txnCharge = parseFloat((subTotal * 0.024).toFixed(2));

    // HEADER
    try {
      doc.image("logo.png", 40, 30, { width: 60 });
    } catch {
      console.warn("Logo not found");
    }

    // Define right-aligned content position with more space for long IDs
    const rightX = 350; // Moved further left to accommodate long IDs
    const rightWidth = 200; // Increased width
    const lineHeight = 15; // Standard line height

    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor(primaryColor)
      .text("PAID INVOICE", rightX, 40, { 
        width: rightWidth,
        align: "right" 
      });

    // Handle long invoice numbers by adjusting position dynamically
    const invoiceText = `Invoice#: ${transactionId}`;
    const dateText = `Date: ${new Date().toLocaleDateString("en-GB")}`;
    
    // Calculate if invoice number is too long
    const invoiceWidth = doc.widthOfString(invoiceText);
    const dateWidth = doc.widthOfString(dateText);
    
    // If invoice number is too wide, make it multiline
    if (invoiceWidth > rightWidth) {
      doc
        .fontSize(10)
        .fillColor(textColor)
        .text(invoiceText, rightX, 60, {
          width: rightWidth,
          align: "right",
          lineBreak: true
        });
      // Position date below if invoice was wrapped
      doc.text(dateText, rightX, 80, {
        width: rightWidth,
        align: "right"
      });
    } else {
      // Normal layout if invoice number fits
      doc
        .fontSize(10)
        .fillColor(textColor)
        .text(invoiceText, rightX, 60, {
          width: rightWidth,
          align: "right",
        })
        .text(dateText, rightX, 75, {
          width: rightWidth,
          align: "right",
        });
    }

    // INVOICE TO BOX
    doc.rect(40, 110, 515, 90).fill("#F3F4F6");

    // Left Section: User Info
    doc
      .fillColor(textColor)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Invoice To:", 50, 120);

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(username, 50, 135)
      .text(email, 50, 150);

    // Right Section: Static Address
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("ARIVUBODHI", 320, 120)
      .text("SHIKSHAK TALENTS LLP.", 320, 133)
      .font("Helvetica")
      .text("138,1st Floor, 20th Main Road,", 320, 146)
      .text("53rd Cross, 8th Block, Rajajinagar,", 320, 159)
      .text("Bengaluru, 560010", 320, 172)
      .text("parikshashikshak@gmail.com", 320, 185);

    doc
      .font("Helvetica-Bold")
      .text("GSTIN : 29ACGFA8346M1ZS", 320, 205);

    // TABLE HEADERS
    const tableTop = 230;
    const columnWidths = [100, 200, 60, 60, 80];
    const headers = ["Item Type", "Description", "Price", "Quantity", "Amount"];
    let x = 40;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(textColor);
    headers.forEach((text, i) => {
      doc.text(text, x, tableTop, { width: columnWidths[i] });
      x += columnWidths[i];
    });
    doc.moveTo(40, tableTop + 15).lineTo(555, tableTop + 15).stroke();

    // TABLE ROW
    const rowY = tableTop + 25;
    const row = ["DTP Service Charge", "", `₹${subTotal}`, "1", `₹${subTotal}`];
    x = 40;
    doc.font("Helvetica").fontSize(10).fillColor("#374151");
    row.forEach((text, i) => {
      doc.text(text, x, rowY, { width: columnWidths[i] });
      x += columnWidths[i];
    });

    // AMOUNT SECTION
    const amountY = rowY + 50;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(textColor)
      .text("Sub Total", 400, amountY)
      .text(`₹${subTotal}`, 500, amountY, { align: "right" });

    doc
      .text("IGST (18%)", 400, amountY + 15)
      .text(`₹${igst}`, 500, amountY + 15, { align: "right" });

    doc
      .text("Transaction Charge (2.4%)", 400, amountY + 30)
      .text(`₹${txnCharge}`, 500, amountY + 30, { align: "right" });

    doc
      .font("Helvetica-Bold")
      .text("Grand Total", 400, amountY + 50)
      .text(`₹${grandTotal}`, 500, amountY + 50, { align: "right" });

    // TRANSACTION SUMMARY
    const boxY = amountY + 100;
    doc.moveTo(40, boxY).lineTo(555, boxY).stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(textColor)
      .text("Transaction Date", 45, boxY + 10)
      .text("Transaction ID", 160, boxY + 10)
      .text("Gateway", 300, boxY + 10)
      .text("Total Paid", 420, boxY + 10);

    // Handle long transaction IDs in the summary section
    const summaryTxIdY = boxY + 30;
    const maxTxIdWidth = 120; // Maximum width before wrapping
    
    if (doc.widthOfString(transactionId) > maxTxIdWidth) {
      doc
        .font("Helvetica")
        .fillColor("#374151")
        .text(new Date().toLocaleDateString("en-GB"), 45, summaryTxIdY)
        .text(transactionId, 160, summaryTxIdY, {
          width: maxTxIdWidth,
          lineBreak: true
        })
        .text("PhonePe / Razorpay", 300, summaryTxIdY)
        .text(`₹${grandTotal}`, 420, summaryTxIdY);
    } else {
      doc
        .font("Helvetica")
        .fillColor("#374151")
        .text(new Date().toLocaleDateString("en-GB"), 45, summaryTxIdY)
        .text(transactionId, 160, summaryTxIdY)
        .text("PhonePe / Razorpay", 300, summaryTxIdY)
        .text(`₹${grandTotal}`, 420, summaryTxIdY);
    }

    doc.moveTo(40, boxY + 50).lineTo(555, boxY + 50).stroke();

    // FOOTER
    doc
      .moveTo(40, 750)
      .lineTo(555, 750)
      .strokeColor("#e5e7eb")
      .stroke();

    doc
      .font("Helvetica-Oblique")
      .fontSize(10)
      .fillColor("#6B7280")
      .text("Thank you for your payment!", 50, 760)
      .text("For support, contact support@parikshashikshak.com", 50, 775);

    doc.end();

    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Pariksha Shikshak" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your ParikshaShikshak Payment Receipt",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #1E3A8A; text-align: center;">ParikshaShikshak</h2>
            <p>Hello <strong>${username}</strong>,</p>
            <p>Thank you for your payment of ₹${grandTotal}.</p>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p>Your receipt is attached as a PDF. For any issues, reach out to our support.</p>
            <p style="text-align: center; color: #6B7280;">support@parikshashikshak.com</p>
          </div>
        `,
        attachments: [
          {
            filename: `Receipt-${transactionId}.pdf`,
            content: pdfBuffer,
          },
        ],
      });
    });
  } catch (err) {
    console.error("Receipt error:", err);
  }
};

module.exports = sendReceipt;

module.exports = sendReceipt;


router.post("/send-receipt", express.json(), async (req, res) => {
  try {
    const { username, email, amount, transactionId } = req.body;

    if (!email || !username || !amount || !transactionId) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    await sendReceipt(username, email, amount, transactionId);

    return res.status(200).json({ success: true, message: "Receipt sent successfully" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;

