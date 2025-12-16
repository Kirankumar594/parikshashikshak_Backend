const express = require("express");
const router = express.Router();
const {
  getSubscriptionPlans,
  purchaseSubscription,
  confirmPayment,
  activateSubscription,
  getUserSubscriptions,
  checkAccess
} = require("../../Controller/Admin/PurchaseController");

// GET /api/admin/purchase/plans/:standard - Get subscription plans for a class
router.get("/plans/:standard", getSubscriptionPlans);

// POST /api/admin/purchase/subscribe - Purchase a subscription
router.post("/subscribe", purchaseSubscription);

// POST /api/admin/purchase/confirm-payment - Confirm payment (webhook)
router.post("/confirm-payment", confirmPayment);

// GET /api/admin/purchase/activate/:transactionId/:userId - Activate subscription after PhonePe payment
router.get("/activate/:transactionId/:userId", activateSubscription);

// GET /api/admin/purchase/user/:userId - Get user's subscriptions
router.get("/user/:userId", getUserSubscriptions);

// GET /api/admin/purchase/check-access - Check if user has access to content
router.get("/check-access", checkAccess);

module.exports = router;