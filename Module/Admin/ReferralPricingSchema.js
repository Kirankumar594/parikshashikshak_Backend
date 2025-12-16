const mongoose = require("mongoose");

const referralPricingSchema = new mongoose.Schema({
  baseReward: { type: Number, default: 100 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const ReferralPricing = mongoose.model("ReferralPricing", referralPricingSchema);

    
module.exports = ReferralPricing;
