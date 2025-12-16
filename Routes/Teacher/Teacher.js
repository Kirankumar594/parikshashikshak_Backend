// const express=require('express');
// const router=express.Router();
// const multer = require("multer");
// const { 
//   registerTeacher, 
//   loginTeacher, 
//   getAllTeachers,
//   getAllUserById, 
//   updateTeacher, 
//   makeBlockAndUnblockTeachers, 
//   deleteTeacher,
//   updatepassword
//  } = require('../../Controller/Teacher/Teacher');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "Public/Teacher");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });
// const { Authentication, Authorization } = require('../../Authentication/auth');

// const upload = multer();
// router.post("/registerTeacher",registerTeacher);
// router.post("/loginTeacher",loginTeacher);
// router.get("/getAllTeachers/:authId",Authentication, Authorization,getAllTeachers);
// router.get("/getUserById/:id",getAllUserById);
// router.put("/updateTeacher",upload.any(),Authentication, Authorization,updateTeacher)
// router.put("/makeBlockAndUnblockTeachers",Authentication, Authorization,makeBlockAndUnblockTeachers);
// router.delete("/deleteTeacher/:id/:authId",Authentication, Authorization,deleteTeacher);
// router.put("/updatepassword",updatepassword);
// module.exports=router;  
 
 
 
 

const express = require('express');
const router = express.Router();
const multer = require("multer");
const {
  registerTeacher,
  loginTeacher,
  getAllTeachers,
  getAllUserById,
  updateTeacher,
  makeBlockAndUnblockTeachers,
  deleteTeacher,
  updatepassword,
  // New referral methods
  getReferralDetails,
  validateReferralCode,
  confirmReferral,
  getReferralLeaderboard,
  updateReferralStatus,
  getReferralStatistics, 
   setReferralPricing,  // Add this
  getCurrentPricing
} = require('../../Controller/Teacher/Teacher');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Teacher");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const { Authentication, Authorization } = require('../../Authentication/auth');

const upload = multer();

// Existing routes
router.post("/registerTeacher", registerTeacher);
router.post("/loginTeacher", loginTeacher);
router.get("/getAllTeachers/:authId", Authentication, Authorization, getAllTeachers);
router.get("/getUserById/:id", getAllUserById);
router.put("/updateTeacher", upload.any(),updateTeacher);
router.put("/makeBlockAndUnblockTeachers", Authentication, Authorization, makeBlockAndUnblockTeachers);
router.delete("/deleteTeacher/:id/:authId", Authentication, Authorization, deleteTeacher);
router.put("/updatepassword", updatepassword);

// New referral routes



// Validate referral code (public route for registration)
router.post("/validateReferralCode", validateReferralCode);

// Confirm a referral (admin only)
router.post("/confirmReferral", Authentication, Authorization, confirmReferral);

// Get referral leaderboard
router.get("/getReferralLeaderboard", Authentication, Authorization, getReferralLeaderboard);

// Update referral status (activate/deactivate)
router.put("/updateReferralStatus", Authentication, Authorization, updateReferralStatus);

// Get overall referral statistics (admin only)
router.get("/getReferralStatistics/:authId", Authentication, Authorization, getReferralStatistics);

// Get teachers by referral code (for admin to see who referred whom)
router.get("/getTeachersByReferrer/:referralCode", Authentication, Authorization, async (req, res) => {
  try {
    const { referralCode } = req.params;
    
    const referrer = await require('../../Module/Teacher/Teacher').findOne({ referralCode });
    if (!referrer) {
      return res.status(400).json({ error: "Invalid referral code" });
    }

    const referredTeachers = await require('../../Module/Teacher/Teacher')
      .find({ referredBy: referralCode })
      .select('FirstName LastName teacherId Email Mobile createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      success: {
        referrer: {
          name: `${referrer.FirstName} ${referrer.LastName}`,
          teacherId: referrer.teacherId,
          referralCode: referrer.referralCode
        },
        referredTeachers: referredTeachers
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get referral history with pagination
router.get("/getReferralHistory/:teacherId", Authentication, Authorization, async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const teacher = await require('../../Module/Teacher/Teacher')
      .findById(teacherId)
      .populate({
        path: 'referrals.teacherId',
        select: 'FirstName LastName teacherId Email Mobile createdAt'
      })
      .populate({
        path: 'referralRewards.referredTeacher',
        select: 'FirstName LastName teacherId'
      });

    if (!teacher) {
      return res.status(400).json({ error: "Teacher not found" });
    }

    // Paginate referrals
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedReferrals = teacher.referrals.slice(startIndex, endIndex);
    const paginatedRewards = teacher.referralRewards.slice(startIndex, endIndex);

    const response = {
      referrals: paginatedReferrals,
      rewards: paginatedRewards,
      stats: teacher.referralStats,
      pagination: {
        currentPage: parseInt(page),
        totalReferrals: teacher.referrals.length,
        totalPages: Math.ceil(teacher.referrals.length / limit),
        hasNextPage: endIndex < teacher.referrals.length,
        hasPreviousPage: startIndex > 0
      }
    };

    return res.status(200).json({ success: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Bulk update referral rewards
router.put("/bulkUpdateReferralRewards", Authentication, Authorization, async (req, res) => {
  try {
    const { updates } = req.body; // Array of {teacherId, referralId, status, rewardAmount}
    
    const results = [];
    
    for (const update of updates) {
      const teacher = await require('../../Module/Teacher/Teacher').findById(update.teacherId);
      if (!teacher) continue;

      const reward = teacher.referralRewards.id(update.referralId);
      if (!reward) continue;

      if (update.status) reward.status = update.status;
      if (update.rewardAmount) reward.rewardAmount = update.rewardAmount;

      await teacher.save();
      results.push({
        teacherId: update.teacherId,
        referralId: update.referralId,
        updated: true
      });
    }

    return res.status(200).json({ 
      success: "Bulk update completed",
      results: results
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Search teachers by referral code or name
router.get("/searchTeachers", Authentication, Authorization, async (req, res) => {
  try {
    const { query, type = 'all' } = req.query; // type: 'referrer', 'referred', 'all'
    
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    let searchCriteria = {
      $or: [
        { FirstName: { $regex: query, $options: 'i' } },
        { LastName: { $regex: query, $options: 'i' } },
        { teacherId: { $regex: query, $options: 'i' } },
        { referralCode: { $regex: query, $options: 'i' } },
        { Email: { $regex: query, $options: 'i' } }
      ]
    };

    // Filter by type
    if (type === 'referrer') {
      searchCriteria['referralStats.totalReferrals'] = { $gt: 0 };
    } else if (type === 'referred') {
      searchCriteria.referredBy = { $ne: null };
    }

    const teachers = await require('../../Module/Teacher/Teacher')
      .find(searchCriteria)
      .populate('referredByTeacher', 'FirstName LastName teacherId referralCode')
      .select('FirstName LastName teacherId referralCode referralStats referredBy Email Mobile')
      .limit(20)
      .sort({ 'referralStats.totalReferrals': -1 });

    return res.status(200).json({ success: teachers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Generate referral report
router.get("/generateReferralReport", Authentication, Authorization, async (req, res) => {
  try {
    const { startDate, endDate, format = 'json' } = req.query;
    
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Get referral data
    const referralData = await require('../../Module/Teacher/Teacher').aggregate([
      { $match: dateFilter },
      {
        $project: {
          FirstName: 1,
          LastName: 1,
          teacherId: 1,
          referralCode: 1,
          referralStats: 1,
          referrals: 1,
          referralRewards: 1,
          referredBy: 1,
          createdAt: 1
        }
      },
      {
        $addFields: {
          totalEarnings: { $sum: '$referralRewards.rewardAmount' },
          referralCount: { $size: '$referrals' }
        }
      },
      { $sort: { 'referralStats.totalReferrals': -1 } }
    ]);

    // Calculate summary statistics
    const summary = {
      totalTeachers: referralData.length,
      totalReferrals: referralData.reduce((sum, teacher) => sum + teacher.referralCount, 0),
      totalRewards: referralData.reduce((sum, teacher) => sum + teacher.totalEarnings, 0),
      averageReferralsPerTeacher: referralData.length > 0 ? 
        (referralData.reduce((sum, teacher) => sum + teacher.referralCount, 0) / referralData.length).toFixed(2) : 0,
      topReferrers: referralData.slice(0, 10)
    };

    const report = {
      summary,
      data: referralData,
      generatedAt: new Date(),
      dateRange: { startDate, endDate }
    };

    return res.status(200).json({ success: report });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get referral analytics
router.get("/getReferralAnalytics/:teacherId", Authentication, Authorization, async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { period = '30' } = req.query; // days
    
    const teacher = await require('../../Module/Teacher/Teacher')
      .findById(teacherId)
      .populate('referrals.teacherId', 'FirstName LastName createdAt');
    
    if (!teacher) {
      return res.status(400).json({ error: "Teacher not found" });
    }

    const periodDate = new Date();
    periodDate.setDate(periodDate.getDate() - parseInt(period));

    // Filter referrals by period
    const recentReferrals = teacher.referrals.filter(ref => 
      ref.referredAt >= periodDate
    );

    // Group referrals by date
    const referralsByDate = {};
    recentReferrals.forEach(ref => {
      const date = ref.referredAt.toISOString().split('T')[0];
      referralsByDate[date] = (referralsByDate[date] || 0) + 1;
    });

    // Calculate conversion rate (confirmed / total)
    const conversionRate = teacher.referralStats.totalReferrals > 0 ? 
      ((teacher.referralStats.confirmedReferrals / teacher.referralStats.totalReferrals) * 100).toFixed(2) : 0;

    const analytics = {
      overview: {
        totalReferrals: teacher.referralStats.totalReferrals,
        confirmedReferrals: teacher.referralStats.confirmedReferrals,
        pendingReferrals: teacher.referralStats.pendingReferrals,
        totalRewards: teacher.referralStats.totalRewards,
        conversionRate: `${conversionRate}%`
      },
      periodStats: {
        period: `${period} days`,
        recentReferrals: recentReferrals.length,
        referralsByDate: referralsByDate
      },
      recentActivity: recentReferrals.slice(0, 10),
      performance: {
        averageReferralsPerMonth: teacher.referralStats.totalReferrals > 0 ? 
          (teacher.referralStats.totalReferrals / Math.max(1, Math.ceil((new Date() - teacher.createdAt) / (1000 * 60 * 60 * 24 * 30)))).toFixed(2) : 0,
        status: teacher.isReferralActive ? 'Active' : 'Inactive'
      }
    };

    return res.status(200).json({ success: analytics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});  
// In Teacher routes
// In your routes file
router.post("/setReferralPricing",setReferralPricing);
router.get("/getCurrentPricing", getCurrentPricing);
// Remove the duplicate route and keep this one:
router.get("/getReferralDetails/:id", Authentication, async (req, res) => {
  try { 
    const teacherId = req.params.id;
    let teacher = await require('../../Module/Teacher/Teacher').findById(teacherId)
      .populate('referrals.teacherId', 'FirstName LastName teacherId Email Mobile createdAt')
      .populate('referralRewards.referredTeacher', 'FirstName LastName teacherId');
    if (!teacher) {
      return res.status(400).json({ error: "Teacher not found" });
    }

    
    const referralStats = teacher.referralStats || {
      shareCount: 0,
      successfulShares: 0,
      totalReferrals: 0,
      totalRewards: 0,
      confirmedReferrals: 0,
      pendingReferrals: 0
    };

    const referralData = {
      referralCode: teacher.referralCode,
      referralStats: referralStats,
      referrals: teacher.referrals || [],
      referralRewards: teacher.referralRewards || [],
      isReferralActive: teacher.isReferralActive,
      referredBy: teacher.referredBy,
      referredByTeacher: teacher.referredByTeacher
    }; 

    return res.status(200).json({ 
      success: {
        referralStats: referralStats,
        ...referralData
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}); 
module.exports = router;