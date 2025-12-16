const express=require('express');
const router=express.Router();

const adminController=require('../../Controller/Admin/Admin');

router.post("/RegisterAdmin",adminController.registerAdmin);
router.post("/login",adminController.login);

module.exports=router;