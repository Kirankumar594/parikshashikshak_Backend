const express = require("express");
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Questions");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const { Authentication, Authorization } = require("../../Authentication/auth");
const {
  AddQuestionPaper,
  UpdateQuestionPaper,
  getAllQuestionUser,
  getAllQuestionAdmin,
  deleteQuestionPaper,
  uploadMultipleQuestion,
  uploadImagesOuestion,
  makeBlockAndUnBlockQuestions,
  getQuestionpaperadminbyid,
  getQuestionByClasswise,
  getAllQuestionByClassAdmin,
  getQuestionByBluePrint,
  getAllQuestionAdminwithpagination,
  getFilterOptions,
} = require("../../Controller/Admin/QuestionPaper");

const upload = multer();
router.post(
  "/AddQuestionPaper",
  upload.any(),
  Authentication,
  Authorization,
  AddQuestionPaper  
); 
router.put(
  "/UpdateQuestionPaper",
  upload.any(),
  Authentication,
  Authorization,
  UpdateQuestionPaper
);
router.get(
  "/getAllQuestionUser/:authId",
  Authentication,
  Authorization,
  getAllQuestionUser
);
router.get(
  "/getAllQuestionAdmin/:authId",
  Authentication,
  Authorization,
  getAllQuestionAdmin
);

router.get(
  "/getAllQuestionAdminwithpagination/:authId",
  Authentication,
  Authorization,
  getAllQuestionAdminwithpagination
);

router.get("/getFilterOptions",getFilterOptions)
router.delete(
  "/deleteQuestionPaper/:id/:authId",
  Authentication,
  Authorization,
  deleteQuestionPaper
);
router.post(
  "/uploadMultipleQuestion/:authId",
  Authentication,
  Authorization,
  uploadMultipleQuestion
);
router.post(
  "/uploadImagesOuestion/:authId",
  upload.any(),
  Authentication,
  Authorization,
  uploadImagesOuestion
);
router.put(
  "/makeBlockAndUnBlockQuestions",
  Authentication,
  Authorization,
  makeBlockAndUnBlockQuestions
);
router.get("/getQuestionpaperadminbyid/:id", getQuestionpaperadminbyid);
router.put("/getQuestionByClasswise/:authId", getQuestionByClasswise);
router.get(
  "/getAllQuestionByClassAdmin/:class/:authId",
  Authentication,
  Authorization,
  getAllQuestionByClassAdmin
);
router.put("/getQuestionByBluePrint",getQuestionByBluePrint)
module.exports = router;
