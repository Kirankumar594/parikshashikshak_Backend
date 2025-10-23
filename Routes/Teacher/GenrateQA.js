const express = require("express");
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Teacher");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const { Authentication, Authorization } = require("../../Authentication/auth");
const {
  registerGuestionGenrate,
  upadeteQuestionPaper,
  getAllGenQuestionPaper,
  getAllGenQuestionPaperById,
  deleteGenQuestionPaper,
  getAllGenQuestionByUserId,
  pdfsendtomail,
  getGenQuestionById,
  getAllGenQuestionPaperfilter,
} = require("../../Controller/Teacher/GenrateQA");

const upload = multer();

router.post(
  "/registerGuestionGenrate",
  Authentication,
  Authorization,
  registerGuestionGenrate
);
router.put(
  "/upadeteQuestionPaper",
  upload.any(),

  upadeteQuestionPaper
);
router.get(
  "/getGenQuestionById/:id/:authId",

  getGenQuestionById
);

router.get(
  "/getAllGenQuestionPaper/:authId",
  Authentication,
  Authorization,
  getAllGenQuestionPaper
);

router.get(
  "/getAllGenQuestionPaperfilter/:authId",
  Authentication,
  Authorization,
  getAllGenQuestionPaperfilter
);


router.get(
  "/getAllGenQuestionPaperById/:id",
  
  getAllGenQuestionPaperById
);

router.get(
  "/getAllGenQuestionByUserId/:id/:authId",

  getAllGenQuestionByUserId
);
router.delete(
  "/deleteGenQuestionPaper/:id/:authId",
  Authentication,
  Authorization,
  deleteGenQuestionPaper
);

router.post("/sendmail",pdfsendtomail)
module.exports = router;
