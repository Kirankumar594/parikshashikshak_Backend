const express = require("express");
const router = express.Router();

const {
  AddQuestAnalysisHeader,
  GetQuestAnalysisHeader,
  GetQuestAnalysisHeaderByMedium,
  getQuestAnalysisHeaderbyid,
  UpdateQuestionAnalysisHeader,
  deleteQuestionAnalysisHeader
} = require("../../Controller/Admin/QuestionAnalysisHeader");

router.post("/addQuestAnalysisheader", AddQuestAnalysisHeader);
router.get("/getQuestAnalysisheader", GetQuestAnalysisHeader);
router.get("/getQuestAnalysisheaderbymedium/:id", GetQuestAnalysisHeaderByMedium);
router.get("/getquestionanalysisbyid/:id",getQuestAnalysisHeaderbyid);
router.put("/updateQuestionAnalysisHeader/:id",UpdateQuestionAnalysisHeader);
router.delete("/deleteQuestionAnalysisHeader/:id",deleteQuestionAnalysisHeader)

module.exports = router;
