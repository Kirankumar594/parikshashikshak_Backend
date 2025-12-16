const express = require("express");
const router = express.Router();
const {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionPricing,
  bulkImportSubscriptions
} = require("../../Controller/Admin/SubscriptionController");

// GET /api/subscriptions - Get all subscriptions with optional filters
router.get("/", getAllSubscriptions);

// GET /api/subscriptions/:id - Get subscription by ID
router.get("/:id", getSubscriptionById);

// GET /api/subscriptions/pricing/:standard/:subject - Get pricing for specific standard and subject
router.get("/pricing/:standard/:subject", getSubscriptionPricing);

// POST /api/subscriptions - Create new subscription
router.post("/", createSubscription);

// POST /api/subscriptions/bulk-import - Bulk import subscriptions
router.post("/bulk-import", bulkImportSubscriptions);

// PUT /api/subscriptions/:id - Update subscription
router.put("/:id", updateSubscription);

// DELETE /api/subscriptions/:id - Delete subscription
router.delete("/:id", deleteSubscription);

module.exports = router;