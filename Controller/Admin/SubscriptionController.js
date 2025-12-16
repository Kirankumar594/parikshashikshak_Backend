const Subscription = require("../../Module/Admin/Subscription");

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const { standard, subject, isActive } = req.query;
    
    let filter = {};
    if (standard) filter.standard = standard;
    if (subject) filter.subject = new RegExp(subject, 'i');
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const subscriptions = await Subscription.find(filter).sort({ standard: 1, subject: 1 });
    
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subscriptions",
      error: error.message
    });
  }
};

// Get subscription by ID
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subscription",
      error: error.message
    });
  }
};

// Create new subscription
const createSubscription = async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Subscription already exists for this standard and subject"
      });
    }
    
    res.status(400).json({
      success: false,
      message: "Error creating subscription",
      error: error.message
    });
  }
};

// Update subscription
const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating subscription",
      error: error.message
    });
  }
};

// Delete subscription
const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting subscription",
      error: error.message
    });
  }
};

// Get subscription pricing for specific standard and subject
const getSubscriptionPricing = async (req, res) => {
  try {
    const { standard, subject } = req.params;
    
    const subscription = await Subscription.findOne({ 
      standard: standard,
      subject: new RegExp(subject, 'i'),
      isActive: true 
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found for this standard and subject"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        standard: subscription.standard,
        subject: subscription.subject,
        pricing: subscription.pricing,
        assessmentCounts: subscription.assessmentCounts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subscription pricing",
      error: error.message
    });
  }
};

// Bulk import subscriptions from Excel data
const bulkImportSubscriptions = async (req, res) => {
  try {
    const { subscriptions } = req.body;
    
    if (!Array.isArray(subscriptions)) {
      return res.status(400).json({
        success: false,
        message: "Subscriptions must be an array"
      });
    }

    const results = {
      created: 0,
      updated: 0,
      errors: []
    };

    for (let i = 0; i < subscriptions.length; i++) {
      try {
        const subData = subscriptions[i];
        
        // Skip header rows or invalid data
        if (!subData.standard || !subData.subject || 
            subData.standard === 'Standard' || subData.subject === 'Subject') {
          continue;
        }

        const existingSubscription = await Subscription.findOne({
          standard: subData.standard,
          subject: subData.subject
        });

        if (existingSubscription) {
          // Update existing
          await Subscription.findByIdAndUpdate(existingSubscription._id, {
            assessmentCounts: subData.englishMedium || subData.assessmentCounts,
            pricing: subData.pricing
          });
          results.updated++;
        } else {
          // Create new
          const newSubscription = new Subscription({
            standard: subData.standard,
            subject: subData.subject,
            assessmentCounts: subData.englishMedium || subData.assessmentCounts,
            pricing: subData.pricing
          });
          await newSubscription.save();
          results.created++;
        }
      } catch (error) {
        results.errors.push({
          index: i,
          error: error.message,
          data: subscriptions[i]
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Bulk import completed",
      results: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during bulk import",
      error: error.message
    });
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionPricing,
  bulkImportSubscriptions
};