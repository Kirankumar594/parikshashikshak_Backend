const express = require("express");
const {
  createReferral,
  getReferralSummary,
  getReferralsByUser,
} = require("../../Controller/Teacher/referralController");

const router = express.Router();

router.post("/use", createReferral);
router.get("/summary/:userId", getReferralSummary);
router.get("/list/:userId", getReferralsByUser);

module.exports = router;
