const express = require("express");
const {
  addDiffLevel,
  updateDiffLevel,
  getAllDiffLevel,
  deleteDiffLevel,
} = require("../../Controller/Admin/DifficultyLevel");
const { Authentication, Authorization } = require("../../Authentication/auth");
const router = express.Router();

router.post("/addDiffLevel", Authentication, Authorization, addDiffLevel);
router.put("/updateDiffLevel", Authentication, Authorization, updateDiffLevel);
router.get("/getAllDiffLevel", getAllDiffLevel);
router.delete(
  "/deleteDiffLevel/:id/:authId",
  Authentication,
  Authorization,
  deleteDiffLevel
);
module.exports = router;
