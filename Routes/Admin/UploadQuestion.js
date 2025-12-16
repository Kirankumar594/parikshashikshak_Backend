const express = require("express");
const { Authentication, Authorization } = require("../../Authentication/auth");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/QuestionPdf");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer();
const {
  addUploadQuestions,
  updateUploadQuestions,
  getAllUploadQuestions,
  deletedUploadQuestionPdf
  // getslybusbyid,
} = require("../../Controller/Admin/UploadQuestionpdf");



router.post("/addUploadQuestions",upload.any(),Authentication, Authorization, addUploadQuestions);
router.put("/updateUploadQuestions", Authentication, Authorization, updateUploadQuestions);
router.get("/getAllpdf/:authId",Authentication, Authorization,getAllUploadQuestions);
router.delete("/deleteuploadquestion/:id/:authId", Authentication,  Authorization, deletedUploadQuestionPdf);

module.exports = router;
