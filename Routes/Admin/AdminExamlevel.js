const express=require('express');
const {addExamLevel,updateExamLevel,getAllExamLevel,deleteExamLevel} = require('../../Controller/Admin/AdminExamlevel');
const { Authentication, Authorization } = require("../../Authentication/auth");
const router=express.Router();

router.post("/addExamLevel",Authentication, Authorization,addExamLevel);
router.put("/updateExamLevel",Authentication, Authorization,updateExamLevel);
router.get("/getExamLevel",getAllExamLevel);
router.delete("/deleteExamLevel/:id/:authId",Authentication, Authorization,deleteExamLevel);
module.exports=router;