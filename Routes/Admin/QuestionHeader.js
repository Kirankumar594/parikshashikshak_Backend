const express = require("express");
const { Authentication, Authorization } = require("../../Authentication/auth");
const router = express.Router();

const {
    addquestionheader,
    getAllQuestionHeader,
    getQuestionHeaderByMedium,
    updatesQuestionHeader,
    deleteQuestionHeader,
} = require("../../Controller/Admin/QuestionHeader");



router.post("/addquestionheader",Authentication, Authorization, addquestionheader);
router.get("/getquestiontheader/:authId",Authentication, Authorization,getAllQuestionHeader);
router.get("/questiontheadergetbymedium/:id/:authId",getQuestionHeaderByMedium);
router.delete("/deleteQuestionHeader/:id/:authId",Authentication, Authorization,deleteQuestionHeader);
router.put("/editquestionheader",Authentication, Authorization,updatesQuestionHeader);


module.exports = router;
