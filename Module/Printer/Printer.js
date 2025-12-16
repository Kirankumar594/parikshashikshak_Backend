const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("printerCount", CounterSchema);

const printerSchema = new mongoose.Schema(
  {
    printerId: {
      type: String,
      unique: true,
    },
    Profile: {
      type: String,
    },
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    whatsAppNumber: {
      type: String,
    },
    Email: {
      type: String,
    },
    Country: {
      type: String,
    },
    State: {
      type: String,
    },
    City: {
      type: String,
    },
    Password: {
      type: String,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isSubcription: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
printerSchema.pre("save", async function (next) {
  try {
    if (!this.printerId) {
      // Find the corresponding counter document and increment the sequence
      const counter = await Counter.findByIdAndUpdate(
        { _id: "printerId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Create the unique bookId based on "DHANYAH" and the incremented sequence
      this.printerId = `GSMP${counter.seq.toString().padStart(4, "0")}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Printer", printerSchema);
