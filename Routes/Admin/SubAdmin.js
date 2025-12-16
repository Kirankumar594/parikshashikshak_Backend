const express=require('express');
const router=express.Router();

const SubAdminController=require('../../Controller/Admin/SubAdmin');
const { Authentication, Authorization } = require('../../Authentication/auth');

router.post("/registerSubAdmin",Authentication,Authorization,SubAdminController.registerSubAdmin);
router.put("/EditSubAdmin",Authentication,Authorization,SubAdminController.EditSubAdmin);
router.get("/getAllSubAdmin/:authId",Authentication,Authorization,SubAdminController.getAllSubAdmin);

router.delete("/deleteSubadmin/:id/:authId",Authentication,Authorization,SubAdminController.deleteSubadmin);

module.exports=router;