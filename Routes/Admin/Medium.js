const express=require('express');
const { addMedium, updateMedium, getAllMedium, deleteMedium } = require('../../Controller/Admin/Medium');
const { Authentication, Authorization } = require('../../Authentication/auth');
const router=express.Router();

router.post("/addMedium",Authentication,Authorization,addMedium)
router.put("/updateMedium",Authentication,Authorization,updateMedium)
router.get("/getAllMedium",getAllMedium)
router.delete("/deleteMedium/:id/:authId",Authentication,Authorization,deleteMedium)
module.exports=router;