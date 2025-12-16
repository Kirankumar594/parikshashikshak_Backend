const express=require('express');
const { addSubClass, updateSubClass, getAllSubClass, deleteSubClass } = require('../../Controller/Admin/SubClass');
const { Authentication, Authorization } = require('../../Authentication/auth');
const router=express.Router();

router.post("/addSubClass",Authentication,Authorization,addSubClass)
router.put("/updateSubClass",Authentication,Authorization,updateSubClass)
router.get("/getAllSubClass",getAllSubClass)
router.delete("/deleteSubClass/:id/:authId",Authentication,Authorization,deleteSubClass)
module.exports=router;