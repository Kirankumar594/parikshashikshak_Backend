const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  mobie: {
    type: String,

  },
  email: {
    type: String,
 
  },
  otp: {
    type: String,
    required: true,
  },
  otpAttempts: {
    type: Number,
    default: 0,
  },
  otpValidUntil: {
    type: Date,
    default: null,
  },
},{timestamps:true});

otpSchema.methods.setOtpValidity = function () {
  // Set OTP validity to 3 minutes from the current time
  this.otpValidUntil = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes in milliseconds
};

otpSchema.methods.isOtpValid = function () {
  // Check if the current time is before the expiration time
  return this.otpValidUntil && this.otpValidUntil > Date.now();
};

const User = mongoose.model('otp', otpSchema);

module.exports = User;
