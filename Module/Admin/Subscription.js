const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  standard: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  assessmentCounts: {
    lba: { type: Number, default: 0 },
    fa1: { type: Number, default: 0 },
    fa2: { type: Number, default: 0 },
    sa1: { type: Number, default: 0 },
    midTerm: { type: Number, default: 0 },
    lba2: { type: Number, default: 0 },
    fa3: { type: Number, default: 0 },
    fa4: { type: Number, default: 0 },
    sa2: { type: Number, default: 0 },
    finalTerm: { type: Number, default: 0 }
  },
  pricing: {
    lbaPrice: { type: Number, default: 0 },
    fa1Price: { type: Number, default: 0 },
    fa2Price: { type: Number, default: 0 },
    sa1Price: { type: Number, default: 0 },
    midTermCost: { type: Number, default: 0 },
    lba2Price: { type: Number, default: 0 },
    fa3Price: { type: Number, default: 0 },
    fa4Price: { type: Number, default: 0 },
    sa2Price: { type: Number, default: 0 },
    finalTermCost: { type: Number, default: 0 },
    annualCost: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for standard and subject
subscriptionSchema.index({ standard: 1, subject: 1 }, { unique: true });

// Update the updatedAt field before saving
subscriptionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Subscription", subscriptionSchema);