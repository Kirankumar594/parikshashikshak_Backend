const express=require('express');
const { sendOtpRegisterEmail, verifyEmail, sendOtpForLogin } = require('../../Controller/Teacher/Otp');
const router=express.Router();

router.post("/sendOtpRegisterEmail",sendOtpRegisterEmail);
router.post("/verifyEmail",verifyEmail);
router.post("/sendOtpForLogin",sendOtpForLogin);
module.exports=router;