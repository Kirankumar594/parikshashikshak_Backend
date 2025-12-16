const express = require("express");
const { Authentication, Authorization } = require("../../Authentication/auth");
const {
  addSyllabus,
  updateSyllabus,
  getAllSyllabus,
  deletedSyllaus,
  getslybusbyid,
} = require("../../Controller/Admin/Syllabus");
const router = express.Router();

router.post("/addSyllabus", Authentication, Authorization, addSyllabus);
router.put("/updateSyllabus", Authentication, Authorization, updateSyllabus);
router.get(
  "/getAllSyllabus/:authId",
  Authentication,
  Authorization,
  getAllSyllabus
);
router.delete(
  "/deletedSyllaus/:id/:authId",
  Authentication,
  Authorization,
  deletedSyllaus
);
router.get("/getslybusbyid/:id", getslybusbyid);

module.exports = router;
