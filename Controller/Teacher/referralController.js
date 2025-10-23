const Referral = require("../../Module/Teacher/referralModel");
const User = require("../../Module/Teacher/Teacher");

const generateReferralCode = (firstName) => {
  const code = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${firstName?.toLowerCase()}_${code}`;
};

const createReferral = async (req, res) => {
  try {
    const { referredUserId, usedReferralCode } = req.body;

    const referredUser = await User.findById(referredUserId);
    if (!referredUser) return res.status(404).json({ message: "User not found" });

    if (!referredUser.referralCode) {
      referredUser.referralCode = generateReferralCode(referredUser.FirstName);
      await referredUser.save();
    }

    const referrer = await User.findOne({ referralCode: usedReferralCode });
    if (referrer) {
      const newReferral = new Referral({
        referrer: referrer._id,
        referredUser: referredUser._id,
        earnings: 50,
        isRewarded: false,
      });
      await newReferral.save();

      referrer.referralCount = (referrer.referralCount || 0) + 1;
      referrer.referralEarnings = (referrer.referralEarnings || 0) + 50;
      await referrer.save();

      referredUser.usedReferralCode = usedReferralCode;
      await referredUser.save();
    }

    res.status(200).json({ message: "Referral saved successfully" });
  } catch (err) {
    console.error("Referral error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getReferralSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const referrals = await Referral.find({ referrer: userId }).populate("referredUser", "FirstName LastName Email createdAt");
    const totalEarnings = referrals.reduce((acc, curr) => acc + curr.earnings, 0);

    res.status(200).json({
      count: referrals.length,
      totalEarnings,
      referrals,
    });
  } catch (err) {
    console.error("Referral summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getReferralsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const referrals = await Referral.find({ referrer: userId }).populate("referredUser", "FirstName LastName Email createdAt");

    res.status(200).json(referrals);
  } catch (err) {
    console.error("Referral list error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReferral,
  getReferralSummary,
  getReferralsByUser,
};
