// const mongoose = require("mongoose");

// const CounterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 },
// });
// const Counter = mongoose.model("TeacherCunt", CounterSchema);

// const teacherSchema = new mongoose.Schema(
//   {
//     teacherId: {
//       type: String,
//       unique: true,
//     },
//     Profile: {
//       type: String,
//     },
//     FirstName: {
//       type: String,
//     },
//     LastName: {
//       type: String,
//     },
//     Mobile: {
//       type: String,
//     },
//     whatsAppNumber: {
//       type: String,
//     },
//     Email: {
//       type: String,
//     },
//     Country: {
//       type: String,
//     },
//     State: {
//       type: String,
//     },
//     City: {
//       type: String,
//     },
//     Password: {
//       type: String,
//     },
//     CPassword:{
//       type:String
//     },
//     termndcond:{
//       type:String
//     },
//     isBlock: {
//       type: Boolean,
//       default: false,
//     },
//     isSubcription: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );
// teacherSchema.pre("save", async function (next) {
//   try {
//     if (!this.teacherId) {
//       // Find the corresponding counter document and increment the sequence
//       const counter = await Counter.findByIdAndUpdate(
//         { _id: "teacherId" },
//         { $inc: { seq: 1 } },
//         { new: true, upsert: true }
//       );

//       // Create the unique bookId based on "DHANYAH" and the incremented sequence
//       this.teacherId = `GSMT${counter.seq.toString().padStart(4, "0")}`;
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });
// module.exports = mongoose.model("Teacher", teacherSchema);
   
 
 
// const mongoose = require("mongoose");

// const CounterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 },
// });
// const Counter = mongoose.model("TeacherCunt", CounterSchema);

// const teacherSchema = new mongoose.Schema(
//   {
//     teacherId: {
//       type: String,
//       unique: true,
//     },
//     Profile: {
//       type: String,
//     },
//     FirstName: {
//       type: String,
//     },
//     LastName: {
//       type: String,
//     },
//     Mobile: {
//       type: String,
//     },
//     whatsAppNumber: {
//       type: String,
//     },
//     Email: {
//       type: String,
//     },
//     Country: {
//       type: String,
//     },
//     State: {
//       type: String,
//     },
//     City: {
//       type: String,
//     },
//     Password: {
//       type: String,
//     },
//     CPassword: {
//       type: String
//     },
//     termndcond: {
//       type: String
//     },
//     isBlock: {
//       type: Boolean,
//       default: false,
//     },
//     isSubcription: {
//       type: Boolean,
//       default: false,
//     },
//     // Referral System Fields
//     referralCode: {
//       type: String,
//       unique: true,
//       sparse: true, // Allows multiple documents with null values
//     },
//     referredBy: {
//       type: String, // Store the referral code of the person who referred this teacher
//       default: null,
//     },
//     referredByTeacher: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Teacher',
//       default: null,
//     },
//     referrals: [{
//       teacherId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Teacher',
//       },
//       referredAt: {
//         type: Date,
//         default: Date.now,
//       },
//       status: {
//         type: String,
//         enum: ['pending', 'confirmed', 'rewarded'],
//         default: 'pending',
//       }
//     }],
//     referralStats: {
//       totalReferrals: {
//         type: Number,
//         default: 0,
//       },
//       confirmedReferrals: {
//         type: Number,
//         default: 0,
//       },
//       pendingReferrals: {
//         type: Number,
//         default: 0,
//       },
//       totalRewards: {
//         type: Number,
//         default: 0,
//       }
//     },
//     referralRewards: [{
//       referredTeacher: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Teacher',
//       },
//       rewardAmount: {
//         type: Number,
//         default: 0,
//       },
//       rewardType: {
//         type: String,
//         enum: ['bonus', 'commission', 'credit'],
//         default: 'bonus',
//       },
//       rewardDate: {
//         type: Date,
//         default: Date.now,
//       },
//       status: {
//         type: String,
//         enum: ['pending', 'paid', 'cancelled'],
//         default: 'pending',
//       }
//     }],
//     isReferralActive: {
//       type: Boolean,
//       default: true,
//     }
//   },
//   { timestamps: true }
// ); 
// // Add these new routes with your existing routes

// // Track referral share
// router.post("/trackReferralShare", Authentication, async (req, res) => {
//   try {
//     const { teacherId } = req.body;
    
//     const teacher = await teacherModel.findById(teacherId);
//     if (!teacher) {
//       return res.status(400).json({ error: "Teacher not found" });
//     }
    
//     // Initialize referralStats if not exists
//     if (!teacher.referralStats) {
//       teacher.referralStats = {
//         shareCount: 0,
//         successfulShares: 0,
//         totalReferrals: 0,
//         totalRewards: 0,
//         platformShares: {}
//       };
//     }
    
//     teacher.referralStats.shareCount = (teacher.referralStats.shareCount || 0) + 1;
//     await teacher.save();
    
//     return res.status(200).json({ success: "Referral share tracked" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Track successful share
// router.post("/trackSuccessfulShare", Authentication, async (req, res) => {
//   try {
//     const { teacherId, platform } = req.body;
    
//     const teacher = await teacherModel.findById(teacherId);
//     if (!teacher) {
//       return res.status(400).json({ error: "Teacher not found" });
//     }
    
//     // Initialize referralStats if not exists
//     if (!teacher.referralStats) {
//       teacher.referralStats = {
//         shareCount: 0,
//         successfulShares: 0,
//         totalReferrals: 0,
//         totalRewards: 0,
//         platformShares: {}
//       };
//     }
    
//     teacher.referralStats.successfulShares = (teacher.referralStats.successfulShares || 0) + 1;
//     teacher.referralStats.lastSharedAt = new Date();
    
//     if (platform) {
//       teacher.referralStats.platformShares = teacher.referralStats.platformShares || {};
//       teacher.referralStats.platformShares[platform] = (teacher.referralStats.platformShares[platform] || 0) + 1;
//     }
    
//     await teacher.save();
    
//     return res.status(200).json({ success: "Share tracked successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Get referral details


// // Generate unique referral code
// function generateReferralCode(firstName, lastName, teacherId) {
//   const namePrefix = (firstName.substring(0, 2) + lastName.substring(0, 2)).toUpperCase();
//   const idSuffix = teacherId.replace('GSMT', '');
//   return `${namePrefix}${idSuffix}`;
// }

// teacherSchema.pre("save", async function (next) {
//   try {
//     if (!this.teacherId) {
//       // Find the corresponding counter document and increment the sequence
//       const counter = await Counter.findByIdAndUpdate(
//         { _id: "teacherId" },
//         { $inc: { seq: 1 } },
//         { new: true, upsert: true }
//       );

//       // Create the unique teacherId based on "GSMT" and the incremented sequence
//       this.teacherId = `GSMT${counter.seq.toString().padStart(4, "0")}`;
//     }

//     // Generate referral code if not exists
//     if (!this.referralCode && this.FirstName && this.LastName) {
//       this.referralCode = generateReferralCode(this.FirstName, this.LastName, this.teacherId);
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to add referral
// teacherSchema.methods.addReferral = async function(referredTeacherId) {
//   this.referrals.push({
//     teacherId: referredTeacherId,
//     status: 'pending'
//   });
//   this.referralStats.totalReferrals += 1;
//   this.referralStats.pendingReferrals += 1;
//   await this.save();
// };

// // Method to confirm referral
// teacherSchema.methods.confirmReferral = async function(referredTeacherId, rewardAmount = 100) {
//   const referral = this.referrals.find(ref => ref.teacherId.toString() === referredTeacherId.toString());
//   if (referral && referral.status === 'pending') {
//     referral.status = 'confirmed';
//     this.referralStats.confirmedReferrals += 1;
//     this.referralStats.pendingReferrals -= 1;
    
//     // Add reward
//     this.referralRewards.push({
//       referredTeacher: referredTeacherId,
//       rewardAmount: rewardAmount,
//       rewardType: 'bonus'
//     });
//     this.referralStats.totalRewards += rewardAmount;
    
//     await this.save();
//   }
// };

// module.exports = mongoose.model("Teacher", teacherSchema); 
 
 
// const mongoose = require("mongoose");

// const CounterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 },
// });
// const Counter = mongoose.model("TeacherCunt", CounterSchema);

// const teacherSchema = new mongoose.Schema(
//   {
//     teacherId: {
//       type: String,
//       unique: true,
//     },
//     Profile: {
//       type: String,
//     },
//     FirstName: {
//       type: String,
//     },
//     LastName: {
//       type: String,
//     },
//     Mobile: {
//       type: String,
//     },
//     whatsAppNumber: {
//       type: String,
//     },
//     Email: {
//       type: String,
//     },
//     Country: {
//       type: String,
//     },
//     State: {
//       type: String,
//     },
//     City: {
//       type: String,
//     },
//     Password: {
//       type: String,
//     },
//     CPassword: {
//       type: String
//     },
//     termndcond: {
//       type: String
//     },
//     isBlock: {
//       type: Boolean,
//       default: false,
//     },
//     isSubcription: {
//       type: Boolean,
//       default: false,
//     },
//     referralCode: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },
//     referredBy: {
//       type: String,
//       default: null,
//     },
//     referredByTeacher: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Teacher',
//       default: null,
//     },
//     referrals: [{
//       teacherId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Teacher',
//       },
//       referredAt: {
//         type: Date,
//         default: Date.now,
//       },
//       status: {
//         type: String,
//         enum: ['pending', 'confirmed', 'rewarded'],
//         default: 'pending',
//       }
//     }],
//     referralStats: {
//       shareCount: {
//         type: Number,
//         default: 0,
//       },
//       successfulShares: {
//         type: Number,
//         default: 0,
//       },
//       lastSharedAt: {
//         type: Date,
//       },
//       platformShares: {
//         type: Object,
//         default: {},
//       },
//       totalReferrals: {
//         type: Number,
//         default: 0,
//       },
//       confirmedReferrals: {
//         type: Number,
//         default: 0,
//       },
//       pendingReferrals: {
//         type: Number,
//         default: 0,
//       },
//       totalRewards: {
//         type: Number,
//         default: 0,
//       }
//     },
//     referralRewards: [{
//       referredTeacher: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Teacher',
//       },
//       rewardAmount: {
//         type: Number,
//         default: 0,
//       },
//       rewardType: {
//         type: String,
//         enum: ['bonus', 'commission', 'credit'],
//         default: 'bonus',
//       },
//       rewardDate: {
//         type: Date,
//         default: Date.now,
//       },
//       status: {
//         type: String,
//         enum: ['pending', 'paid', 'cancelled'],
//         default: 'pending',
//       }
//     }],
//     isReferralActive: {
//       type: Boolean,
//       default: true,
//     }
//   },
//   { timestamps: true }
// );
// function generateReferralCode(firstName, lastName, teacherId) {
//   const namePrefix = (firstName.substring(0, 2) + lastName.substring(0, 2)).toUpperCase();
//   const idSuffix = teacherId.replace('GSMT', '');
//   return `${namePrefix}${idSuffix}`;
// }

// teacherSchema.pre("save", async function (next) {
//   try {
//     if (!this.teacherId) {
//       const counter = await Counter.findByIdAndUpdate(
//         { _id: "teacherId" },
//         { $inc: { seq: 1 } },
//         { new: true, upsert: true }
//       );
//       this.teacherId = `GSMT${counter.seq.toString().padStart(4, "0")}`;
//     }

//     if (!this.referralCode && this.FirstName && this.LastName) {
//       this.referralCode = generateReferralCode(this.FirstName, this.LastName, this.teacherId);
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to add referral
// teacherSchema.methods.addReferral = async function(referredTeacherId) {
//   this.referrals.push({
//     teacherId: referredTeacherId,
//     status: 'pending'
//   });
//   this.referralStats.totalReferrals += 1;
//   this.referralStats.pendingReferrals += 1;
//   await this.save();
// };

// // Method to confirm referral
// teacherSchema.methods.confirmReferral = async function(referredTeacherId, rewardAmount = 100) {
//   const referral = this.referrals.find(ref => ref.teacherId.toString() === referredTeacherId.toString());
//   if (referral && referral.status === 'pending') {
//     referral.status = 'confirmed';
//     this.referralStats.confirmedReferrals += 1;
//     this.referralStats.pendingReferrals -= 1;
    
//     this.referralRewards.push({
//       referredTeacher: referredTeacherId,
//       rewardAmount: rewardAmount,
//       rewardType: 'bonus'
//     });
//     this.referralStats.totalRewards += rewardAmount;
    
//     await this.save();
//   }
// };

// module.exports = mongoose.model("Teacher", teacherSchema); 
 
const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("TeacherCunt", CounterSchema);

const bankDetailsSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: false
  },
  ifsc: {
    type: String,
    required: false
  },
  bankName: {
    type: String,
    required: false
  },
  branchName: {
    type: String,
    required: false
  },
  accountHolderName: {
    type: String,
    required: false
  }
}, { _id: false });

const teacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      unique: true,
    },
    Profile: {
      type: String,
    },
    FirstName: {
      type: String,
      required: true
    },
    LastName: {
      type: String,
      required: true
    },
    Mobile: {
      type: String,
      required: true
    },
    whatsAppNumber: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true
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
      required: true
    },
    CPassword: {
      type: String,
      required: false
    },
    termndcond: {
      type: Boolean,
      required: false
    },
    bankDetails: {
      type: bankDetailsSchema,
      required: false
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isSubcription: {
      type: Boolean,
      default: false,
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    referredBy: {
      type: String,
      default: null,
    },
    referredByTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      default: null,
    },
    referrals: [{
      teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
      },
      referredAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'rewarded'],
        default: 'pending',
      }
    }],
    referralStats: {
      shareCount: {
        type: Number,
        default: 0,
      },
      successfulShares: {
        type: Number,
        default: 0,
      },
      lastSharedAt: {
        type: Date,
      },
      platformShares: {
        type: Object,
        default: {},
      },
      totalReferrals: {
        type: Number,
        default: 0,
      },
      confirmedReferrals: {
        type: Number,
        default: 0,
      },
      pendingReferrals: {
        type: Number,
        default: 0,
      },
      totalRewards: {
        type: Number,
        default: 0,
      }
    },
    referralRewards: [{
      referredTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
      },
      rewardAmount: {
        type: Number,
        default: 0,
      },
      rewardType: {
        type: String,
        enum: ['bonus', 'commission', 'credit'],
        default: 'bonus',
      },
      rewardDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending',
      }
    }],
    isReferralActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

function generateReferralCode(firstName, lastName, teacherId) {
  const namePrefix = (firstName.substring(0, 2) + lastName.substring(0, 2)).toUpperCase();
  const idSuffix = teacherId.replace('GSMT', '');
  return `${namePrefix}${idSuffix}`;
}

teacherSchema.pre("save", async function (next) {
  try {
    if (!this.teacherId) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "teacherId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.teacherId = `GSMT${counter.seq.toString().padStart(4, "0")}`;
    }

    if (!this.referralCode && this.FirstName && this.LastName) {
      this.referralCode = generateReferralCode(this.FirstName, this.LastName, this.teacherId);
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Method to add referral
teacherSchema.methods.addReferral = async function(referredTeacherId) {
  this.referrals.push({
    teacherId: referredTeacherId,
    status: 'pending'
  });
  this.referralStats.totalReferrals += 1;
  this.referralStats.pendingReferrals += 1;
  await this.save();
};


teacherSchema.methods.confirmReferral = async function(referredTeacherId, rewardAmount) {
  const referral = this.referrals.find(ref => ref.teacherId.toString() === referredTeacherId.toString());
  if (referral && referral.status === 'pending') {
    referral.status = 'confirmed';
    this.referralStats.confirmedReferrals += 1;
    this.referralStats.pendingReferrals -= 1;
    
    this.referralRewards.push({
      referredTeacher: referredTeacherId,
      rewardAmount: rewardAmount,
      rewardType: 'bonus'
    });
    this.referralStats.totalRewards += rewardAmount;
    
    await this.save();
  }
};
  





module.exports = mongoose.model("Teacher", teacherSchema);