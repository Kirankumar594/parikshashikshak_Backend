const Subscription = require("../../Module/Admin/Subscription");
const UserSubscription = require("../../Module/Admin/UserSubscription");

// Generate payment gateway URL (customize based on your payment provider)
const generatePaymentUrl = (paymentId, amount, metadata) => {
  // For Razorpay integration
  const baseUrl = process.env.FRONTEND_URL || 'https://parikshashikshak.com';
  
  // In production, you would create a Razorpay order and return the checkout URL
  // For now, return a demo payment page URL
  const params = new URLSearchParams({
    paymentId: paymentId,
    amount: amount,
    subject: metadata.subject,
    standard: metadata.standard,
    planType: metadata.planType,
    userId: metadata.userId
  });
  
  return `${baseUrl}/add-payment?${params.toString()}`;
};

// Get subscription plans for a specific class
const getSubscriptionPlans = async (req, res) => {
  try {
    const { standard } = req.params;
    
    const subscriptions = await Subscription.find({ 
      standard: standard,
      isActive: true 
    }).sort({ subject: 1 });

    if (!subscriptions.length) {
      return res.status(404).json({
        success: false,
        message: `No subscription plans found for standard ${standard}`
      });
    }

    // Format data for frontend table
    const formattedPlans = subscriptions.map(sub => ({
      id: sub._id,
      standard: sub.standard,
      subject: sub.subject,
      plans: {
        firstHalf: {
          assessments: ['LBA', 'FA1', 'FA2', 'SA1'],
          count: sub.assessmentCounts.lba + sub.assessmentCounts.fa1 + 
                 sub.assessmentCounts.fa2 + sub.assessmentCounts.sa1,
          price: sub.pricing.lbaPrice + sub.pricing.fa1Price + 
                 sub.pricing.fa2Price + sub.pricing.sa1Price,
          totalCost: sub.pricing.midTermCost
        },
        secondHalf: {
          assessments: ['LBA', 'FA3', 'FA4', 'SA2'],
          count: sub.assessmentCounts.lba2 + sub.assessmentCounts.fa3 + 
                 sub.assessmentCounts.fa4 + sub.assessmentCounts.sa2,
          price: sub.pricing.lba2Price + sub.pricing.fa3Price + 
                 sub.pricing.fa4Price + sub.pricing.sa2Price,
          totalCost: sub.pricing.finalTermCost
        },
        annual: {
          assessments: ['All Assessments'],
          count: Object.values(sub.assessmentCounts).reduce((a, b) => a + b, 0),
          price: sub.pricing.annualCost,
          totalCost: sub.pricing.annualCost
        },
        lba: {
          assessments: ['LBA Only'],
          count: sub.assessmentCounts.lba + sub.assessmentCounts.lba2,
          price: sub.pricing.lbaPrice + sub.pricing.lba2Price,
          totalCost: sub.pricing.lbaPrice + sub.pricing.lba2Price
        }
      }
    }));

    // Calculate total bundle pricing for all subjects (actual total, no discount)
    const totalBundle = {
      id: `${standard}_ALL_SUBJECTS`,
      standard: standard,
      subject: 'All Subjects Bundle',
      isBundle: true,
      subjectCount: subscriptions.length,
      subjectList: subscriptions.map(s => s.subject),
      plans: {
        firstHalf: {
          assessments: ['All Subjects - First Half'],
          count: subscriptions.reduce((total, sub) => 
            total + sub.assessmentCounts.lba + sub.assessmentCounts.fa1 + 
            sub.assessmentCounts.fa2 + sub.assessmentCounts.sa1, 0),
          totalCost: subscriptions.reduce((total, sub) => 
            total + sub.pricing.midTermCost, 0)
        },
        secondHalf: {
          assessments: ['All Subjects - Second Half'],
          count: subscriptions.reduce((total, sub) => 
            total + sub.assessmentCounts.lba2 + sub.assessmentCounts.fa3 + 
            sub.assessmentCounts.fa4 + sub.assessmentCounts.sa2, 0),
          totalCost: subscriptions.reduce((total, sub) => 
            total + sub.pricing.finalTermCost, 0)
        },
        annual: {
          assessments: ['All Subjects - Complete Year'],
          count: subscriptions.reduce((total, sub) => 
            total + Object.values(sub.assessmentCounts).reduce((a, b) => a + b, 0), 0),
          totalCost: subscriptions.reduce((total, sub) => 
            total + sub.pricing.annualCost, 0)
        },
        lba: {
          assessments: ['All Subjects - LBA Only'],
          count: subscriptions.reduce((total, sub) => 
            total + sub.assessmentCounts.lba + sub.assessmentCounts.lba2, 0),
          totalCost: subscriptions.reduce((total, sub) => 
            total + sub.pricing.lbaPrice + sub.pricing.lba2Price, 0)
        }
      }
    };

    // Add bundle as first item
    const allPlans = [totalBundle, ...formattedPlans];

    res.status(200).json({
      success: true,
      data: allPlans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subscription plans",
      error: error.message
    });
  }
};

// Purchase a subscription plan
const purchaseSubscription = async (req, res) => {
  try {
    const { 
      userId, 
      subscriptionId, 
      planType, 
      standard, 
      subject,
      isBundle,
      username,
      email,
      mobile
    } = req.body;

    // Validate required fields
    if (!userId || !subscriptionId || !planType || !standard || !subject) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    let amount, assessmentTypes, expiryMonths;

    // Handle bundle purchase
    if (isBundle) {
      // Get all subscriptions for this standard to calculate bundle pricing
      const allSubscriptions = await Subscription.find({ 
        standard: standard,
        isActive: true 
      });

      if (!allSubscriptions.length) {
        return res.status(404).json({
          success: false,
          message: "No subscriptions found for bundle"
        });
      }

      // Calculate bundle pricing (actual total, no discount)
      switch (planType) {
        case 'first_half':
          amount = allSubscriptions.reduce((total, sub) => 
            total + sub.pricing.midTermCost, 0);
          assessmentTypes = ['lba', 'fa1', 'fa2', 'sa1'];
          expiryMonths = 6;
          break;
        case 'second_half':
          amount = allSubscriptions.reduce((total, sub) => 
            total + sub.pricing.finalTermCost, 0);
          assessmentTypes = ['lba2', 'fa3', 'fa4', 'sa2'];
          expiryMonths = 6;
          break;
        case 'annual':
          amount = allSubscriptions.reduce((total, sub) => 
            total + sub.pricing.annualCost, 0);
          assessmentTypes = ['lba', 'fa1', 'fa2', 'sa1', 'midTerm', 'lba2', 'fa3', 'fa4', 'sa2', 'finalTerm'];
          expiryMonths = 12;
          break;
        case 'lba':
          amount = allSubscriptions.reduce((total, sub) => 
            total + sub.pricing.lbaPrice + sub.pricing.lba2Price, 0);
          assessmentTypes = ['lba', 'lba2'];
          expiryMonths = 12;
          break;
        default:
          return res.status(400).json({
            success: false,
            message: "Invalid plan type"
          });
      }
    } else {
      // Handle individual subject purchase
      // Check if subscriptionId is a bundle ID (custom string) or real MongoDB ObjectId
      let subscription;
      
      if (subscriptionId.includes('_ALL_SUBJECTS')) {
        // This shouldn't happen for individual purchases, but handle gracefully
        return res.status(400).json({
          success: false,
          message: "Invalid subscription ID for individual purchase"
        });
      }
      
      try {
        subscription = await Subscription.findById(subscriptionId);
      } catch (error) {
        // If findById fails, try finding by other criteria
        subscription = await Subscription.findOne({ 
          standard: standard,
          subject: subject,
          isActive: true 
        });
      }
      
      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription plan not found"
        });
      }

      // Calculate amount and expiry based on plan type for individual subject
      switch (planType) {
        case 'first_half':
          amount = subscription.pricing.midTermCost;
          assessmentTypes = ['lba', 'fa1', 'fa2', 'sa1'];
          expiryMonths = 6;
          break;
        case 'second_half':
          amount = subscription.pricing.finalTermCost;
          assessmentTypes = ['lba2', 'fa3', 'fa4', 'sa2'];
          expiryMonths = 6;
          break;
        case 'annual':
          amount = subscription.pricing.annualCost;
          assessmentTypes = ['lba', 'fa1', 'fa2', 'sa1', 'midTerm', 'lba2', 'fa3', 'fa4', 'sa2', 'finalTerm'];
          expiryMonths = 12;
          break;
        case 'lba':
          amount = subscription.pricing.lbaPrice + subscription.pricing.lba2Price;
          assessmentTypes = ['lba', 'lba2'];
          expiryMonths = 12;
          break;
        default:
          return res.status(400).json({
            success: false,
            message: "Invalid plan type"
          });
      }
    }

    // Check if user already has active subscription for this standard/subject (skip for bundles)
    if (!isBundle) {
      const existingSubscription = await UserSubscription.findActiveSubscriptions(
        userId, standard, subject
      );

      if (existingSubscription.length > 0) {
        return res.status(400).json({
          success: false,
          message: "You already have an active subscription for this subject"
        });
      }
    }

    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + expiryMonths);

    // Create user subscription record
    const userSubscription = new UserSubscription({
      userId,
      subscriptionId,
      planType,
      standard,
      subject,
      assessmentTypes,
      amount,
      expiryDate,
      paymentId: `PAY_${Date.now()}_${userId}`, // Generate unique payment ID
      paymentStatus: 'pending'
    });

    await userSubscription.save();

    // Return subscription details for frontend to handle PhonePe payment
    res.status(201).json({
      success: true,
      message: "Subscription record created successfully",
      data: {
        subscriptionId: userSubscription._id,
        paymentId: userSubscription.paymentId,
        amount: amount,
        planType: planType,
        standard: standard,
        subject: subject,
        isBundle: isBundle,
        expiryDate: expiryDate,
        userDetails: {
          userId: userId,
          username: username || 'Subscription User',
          email: email || 'user@example.com',
          mobile: mobile || '9999999999'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing subscription purchase",
      error: error.message
    });
  }
};

// Confirm payment (webhook from payment gateway)
const confirmPayment = async (req, res) => {
  try {
    const { paymentId, transactionId, status } = req.body;

    const userSubscription = await UserSubscription.findOne({ paymentId });
    
    if (!userSubscription) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found"
      });
    }

    // Update payment status
    userSubscription.paymentStatus = status === 'success' ? 'completed' : 'failed';
    userSubscription.transactionId = transactionId;
    
    if (status === 'success') {
      userSubscription.isActive = true;
    }

    await userSubscription.save();

    res.status(200).json({
      success: true,
      message: `Payment ${status === 'success' ? 'completed' : 'failed'} successfully`,
      data: userSubscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error confirming payment",
      error: error.message
    });
  }
};

// Activate subscription after PhonePe payment verification
const activateSubscription = async (req, res) => {
  try {
    const { transactionId, userId } = req.params;

    // Find the subscription by transaction ID (which is the subscription _id from PhonePe)
    const userSubscription = await UserSubscription.findById(transactionId);
    
    if (!userSubscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }

    // Verify this subscription belongs to the user
    if (userSubscription.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to subscription"
      });
    }

    // Activate the subscription
    userSubscription.paymentStatus = 'completed';
    userSubscription.isActive = true;
    userSubscription.transactionId = transactionId;

    await userSubscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription activated successfully",
      data: {
        subscriptionId: userSubscription._id,
        userId: userSubscription.userId,
        subject: userSubscription.subject,
        standard: userSubscription.standard,
        planType: userSubscription.planType,
        amount: userSubscription.amount,
        expiryDate: userSubscription.expiryDate,
        status: 'COMPLETED',
        username: 'Subscription User', // You can enhance this by storing username in subscription
        email: 'user@example.com', // You can enhance this by storing email in subscription
        transactionId: transactionId
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error activating subscription",
      error: error.message
    });
  }
};

// Get user's active subscriptions
const getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscriptions = await UserSubscription.find({
      userId: userId,
      isActive: true,
      paymentStatus: 'completed'
    }).populate('subscriptionId').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user subscriptions",
      error: error.message
    });
  }
};

// Check if user has access to specific content
const checkAccess = async (req, res) => {
  try {
    const { userId, standard, subject, assessmentType } = req.query;

    const activeSubscriptions = await UserSubscription.find({
      userId: userId,
      standard: standard,
      subject: subject,
      isActive: true,
      paymentStatus: 'completed',
      expiryDate: { $gt: new Date() },
      assessmentTypes: { $in: [assessmentType] }
    });

    const hasAccess = activeSubscriptions.length > 0;

    res.status(200).json({
      success: true,
      hasAccess: hasAccess,
      subscriptions: activeSubscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking access",
      error: error.message
    });
  }
};

module.exports = {
  getSubscriptionPlans,
  purchaseSubscription,
  confirmPayment,
  activateSubscription,
  getUserSubscriptions,
  checkAccess
};