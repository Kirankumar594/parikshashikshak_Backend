const express=require('express');
const { AddPaperType, updatePaperType, getAllPaperType, deletePaperType } = require('../../Controller/Admin/paperTye');
const { Authentication, Authorization } = require('../../Authentication/auth');
const router=express.Router();

router.post("/AddPaperType",Authentication,Authorization,AddPaperType)
router.put("/updatePaperType",Authentication,Authorization,updatePaperType)
router.get("/getAllPaperType",getAllPaperType)
router.delete("/deletePaperType/:id/:authId",Authentication,Authorization,deletePaperType)
module.exports=router;