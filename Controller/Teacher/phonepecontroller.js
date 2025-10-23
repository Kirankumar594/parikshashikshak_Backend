// const transactionModel = require("../../Modal/User/phonepayModel");
const axios = require("axios");
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
require("dotenv").config();
 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  },
});

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
const transactionModel = require("../../Module/Teacher/PhonepeModal");

const {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest,
  MetaInfo,
  CreateSdkOrderRequest
} = require("pg-sdk-node");

// const clientId = "M22IJ7E10A8LQ";
const clientId = "SU2504081902438340731784";
const clientSecret = "61e1f611-8ad3-49d9-b449-4ec645bc5fc6";
const clientVersion = 1;
const env = Env.PRODUCTION;
// const env = Env.SANDBOX;
// const CALLBACK_URL = "https://valueproservice.com/update/paymentstatus/:id";

const client = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

class Transaction {

  async addPaymentPhone(req, res) {

    try {
      const { userId, username, Mobile, orderId, amount, config,successUrl,failedUrl,email } = req.body;

      // Save transaction details in DB
      const data = await transactionModel.create({
        userId,
        username, 
         email,
        Mobile,
        orderId,
        amount,
        config,
        successUrl,failedUrl
      });

      if (!data)
        return res.status(400).json({ error: "Something went wrong" });

      const merchantOrderId = data._id.toString(); // Use DB _id as unique order ID

      const redirectUrl = `https://parikshashikshak.com/paymentsuccess?transactionId=${data._id}&userID=${userId}`;
      // const redirectUrl = `https://valueproservice.com/`;

      // Build the payment request
      const paymentRequest = CreateSdkOrderRequest.StandardCheckoutBuilder()
        .merchantOrderId(merchantOrderId)
        .amount(amount * 100) // Convert to paise
        .redirectUrl(redirectUrl)
        .build();

      // Send payment request to PhonePe
      const response = await client.pay(paymentRequest);
      console.log("response", response)
      const checkoutUrl = response.redirectUrl;


      if (!checkoutUrl) {
        console.error("Invalid PhonePe response:", response);
        return res.status(500).json({ error: "PhonePe did not return a URL" });
      }

      return res.status(200).json({
        orderId: response.orderId,
        merchantID: merchantOrderId,
        url: checkoutUrl,
      });
    } catch (error) {
      console.error("Payment Error:", error);
      return res.status(500).json({ error: "Payment processing failed" });
    }
  }

  async addPaymentMobile(req, res) {
    let transaction; // Declare transaction here to fix the ReferenceError

    try {
      // Validate input
      const { userId, username, Mobile, orderId, amount } = req.body;
      if (!userId || !username || !Mobile || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create transaction record
      transaction = await transactionModel.create({
        userId,
        username,
        Mobile,
        orderId: orderId || `ORD_${Date.now()}`,
        amount,
        status: 'INITIATED'
      })

      // Prepare payment payload
      const paymentPayload = {
        merchantId: "M22IJ7E10A8LQ",
        merchantTransactionId: transaction._id.toString(),
        merchantUserId: userId,
        amount: amount * 100, // Convert to paise
        redirectUrl: `https://parikshashikshak.com/paymentsuccess?transactionId=${transaction._id}&userID=${userId}`,


        callbackUrl: "https://coorgtour.in/api/Teacher/checkPayment/" + transaction._id + "/" + userId,

        mobileNumber: Mobile,
        paymentInstrument: {
          type: "PAY_PAGE"
        }
      }; 
      
      // Generate signature
      const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
      const stringToHash = base64Payload + '/pg/v1/pay' + clientSecret;
      const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex')+'###' + 1;
      const signature = sha256Hash + '###' + clientSecret;

      res.status(200).json({
        success: true,
        data: {
          transactionBody: base64Payload,
          checksum: sha256Hash,
          transactionId: transaction._id,
        },
      });

    } catch (error) {
      console.error("Payment Error:", error.message);

      // Update transaction status if it was created
      if (transaction) {
        await transactionModel.findByIdAndUpdate(transaction._id, {
          status: 'FAILED',
          error: error.response?.data?.message || error.message
        });
      }

      return res.status(500).json({
        error: "Payment processing error",
        details: error.response?.data || error.message
      });
    }
  }

  async updateStatuspayment(req, res) {
    try {
      let id = req.params.id;
      let data = await transactionModel.findById(id);
      if (!data) return res.status(400).json({ error: "Data not found" });
      data.status = "Completed";
      data.save();
      return res.status(200).json({ success: "Successfully Completed" });
    } catch (error) {
      console.log(error);
    }
  }

  async checkPayment(req, res) {
    try {

      let id = req.params.id;
      let userId = req.params.userId
      let data = await transactionModel.findById(id);
      if (!data) return res.status(400).json({ error: "Payment Id not found!" })
      client.getOrderStatus(id).then(async (response) => {
        const state = response.state;
        if (state == "COMPLETED") {
          sendReceipt(data.username,data.email,data.amount,data._id)
          if (data.config) {
            await axios(JSON.parse(data.config))
            data.config = null
          }
        }
        data.status = state;
        data = await data.save()
        return res.status(200).json({ success: data })
      }).catch((error) => {
        return res.status(400).json({ error: error })
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error.message })
    }
  }

  async paymentcallback(req, res) {
    const { response } = req.body;

    const decodedStr = Buffer.from(response, 'base64').toString('utf-8');

    // Parse JSON
    const responseJson = JSON.parse(decodedStr);
    console.log(responseJson?.data);
    const { merchantTransactionId, state } = responseJson?.data;

    // Log the callback data for debugging
    console.log(`Callback received: Transaction ${merchantTransactionId}, Status: ${state}`);
    let data = await transactionModel.findById(merchantTransactionId);
    if (data) {
      data.status = state;
      if (state === 'COMPLETED') {
 sendReceipt(data.username,data.email,data.amount,data._id)
        await axios(JSON.parse(data.config))
      }
      await data.save()
    }
    // Update transaction status in your database
    if (state === 'COMPLETED') {


      // Mark the transaction as successful
      // Update relevant database records
      console.log(`Transaction ${merchantTransactionId} was successful.`);
    } else {
      // Handle failure or pending status
      console.log(`Transaction ${merchantTransactionId} failed or is pending.`);
    }

    // Send a response back to the payment gateway
    res.status(200).send('Callback processed');
  }

  async getallpayment(req, res) {
    try {
      let data = await transactionModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error)
    }
  }

  async makepayment(req, res) {
    let {
      amount,
      merchantTransactionId,
      merchantUserId,
      redirectUrl,
      callbackUrl,
      mobileNumber,
    } = req.body;

    function generateSignature(payload, saltKey, saltIndex) {
      const encodedPayload = Buffer.from(payload).toString("base64");
      const concatenatedString = encodedPayload + "/pg/v1/pay" + saltKey;
      const hashedValue = crypto
        .createHash("sha256")
        .update(concatenatedString)
        .digest("hex");

      const signature = hashedValue + "###" + saltIndex;
      return signature;
    }

    const paymentDetails = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: amount,
      redirectUrl: CALLBACK_URL,
      redirectMode: "POST",
      callbackUrl: callbackUrl,
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(paymentDetails);
    let objJsonB64 = Buffer.from(payload).toString("base64");
    const saltKey = SECRET_KEY; //test key
    const saltIndex = 1;
    const signature = generateSignature(payload, saltKey, saltIndex);

    try {
      const response = await axios.post(
        "https://api.phonepe.com/apis/hermes/pg/v1/pay",

        // "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
        {
          request: objJsonB64,
        },
        {
          headers: {
            "X-VERIFY": signature,
          },
        }
      );

      //   console.log(
      //     "Payment Response:",
      //     response.data,
      //     response.data?.data.instrumentResponse?.redirectInfo?.url
      //   );
      return res.status(200).json({
        url: response.data?.data.instrumentResponse?.redirectInfo,
      });
    } catch (error) {
      console.error("Payment Error:", error);
    }
  }

}

module.exports = new Transaction();


