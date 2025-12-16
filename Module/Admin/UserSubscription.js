const mongoose = require("mongoose");

const userSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed from ObjectId to String for demo purposes
    required: true
  },
  subscriptionId: {
    type: String, // Changed from ObjectId to String to support both real IDs and bundle IDs
    required: true
  },
  planType: {
    type: String,
    enum: ['first_half', 'second_half', 'annual', 'lba'],
    required: true
  },
  standard: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  assessmentTypes: [{
    type: String,
    enum: ['lba', 'lba2', 'fa1', 'fa2', 'sa1', 'midTerm', 'fa3', 'fa4', 'sa2', 'finalTerm']
  }],
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    unique: true,
    sparse: true
  },
  transactionId: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
userSubscriptionSchema.index({ userId: 1, standard: 1, subject: 1 });
userSubscriptionSchema.index({ expiryDate: 1 });
userSubscriptionSchema.index({ paymentStatus: 1 });

// Method to check if subscription is valid
userSubscriptionSchema.methods.isValid = function() {
  return this.isActive && 
         this.paymentStatus === 'completed' && 
         this.expiryDate > new Date();
};

// Static method to find active subscriptions for a user
userSubscriptionSchema.statics.findActiveSubscriptions = function(userId, standard, subject) {
  return this.find({
    userId: userId,
    standard: standard,
    subject: subject,
    isActive: true,
    paymentStatus: 'completed',
    expiryDate: { $gt: new Date() }
  });
};

module.exports = mongoose.model("UserSubscription", userSubscriptionSchema);