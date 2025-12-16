const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const accountHistory = new mongoose.Schema(
  {
    Pay_id: {
      type: String,
    },
    title: {
      type: String,
    },
    teacherId: {
      type: ObjectId,
      ref: "Teacher",
    },
    Pay_Amount: {
      type: String,
    },
    Pay_mode: {
      type: String,
    },
    date: {
      type: String,
    },
    status: {
      type: String,
      default: "Cr",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("AccountHistory", accountHistory);
