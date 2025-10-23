const express = require("express");
const { Authentication, Authorization } = require("../../Authentication/auth");
const router = express.Router();

const {
    addquestiontype,
    getAllQuestionType,
    deleteQuestionType,
    updatesQuestionTYpes,

} = require("../../Controller/Admin/QuestionType");



router.post("/addquestiontype",Authentication, Authorization, addquestiontype);
router.get("/getquestiontype/:authId",Authentication, Authorization,getAllQuestionType);
router.delete("/deleteQtype/:id/:authId",Authentication, Authorization,deleteQuestionType);
router.put("/updateQuestionType",Authentication, Authorization,updatesQuestionTYpes);


module.exports = router;
