const express=require('express');
const { addSubjects, updateSubjects, getAllSujects, deleteSubjects } = require('../../Controller/Admin/Subject');
const { Authentication, Authorization } = require('../../Authentication/auth');
const router=express.Router();

router.post("/addSubjects",Authentication,Authorization,addSubjects)
router.put("/updateSubjects",Authentication,Authorization,updateSubjects)
router.get("/getAllSujects",getAllSujects)
router.delete("/deleteSubjects/:id/:authId",Authentication,Authorization,deleteSubjects)
module.exports=router;