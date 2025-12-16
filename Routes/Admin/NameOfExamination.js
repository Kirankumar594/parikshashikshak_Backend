const express=require('express');
const { addNameExamination, updateNameExamination, getAllNameExamination, deleteNameExamination } = require('../../Controller/Admin/NameOfExamination');
const { Authentication, Authorization } = require('../../Authentication/auth');
const router=express.Router();

router.post("/addNameExamination",Authentication,Authorization,addNameExamination)
router.put("/updateNameExamination",Authentication,Authorization,updateNameExamination)
router.get("/getAllNameExamination",getAllNameExamination)
router.delete("/deleteNameExamination/:id/:authId",Authentication,Authorization,deleteNameExamination)
module.exports=router;