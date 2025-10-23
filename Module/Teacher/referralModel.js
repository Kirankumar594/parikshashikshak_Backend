const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  earnings: { type: Number, default: 0 },
  isRewarded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Referral", referralSchema);
