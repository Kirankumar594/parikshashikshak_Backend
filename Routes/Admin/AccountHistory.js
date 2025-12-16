const express=require('express');
const { Authentication, Authorization} = require('../../Authentication/auth');
const { AddAccount, getAllAcountHistory, getAllAcountHistoryByTeacherId,EditAccount,DeleteAccount } = require('../../Controller/Admin/AccountHistory');
const router=express.Router();

router.post("/AddAccount",Authentication,Authorization,AddAccount);
router.put("/EditAccount/:id",Authentication,Authorization, EditAccount)
router.delete("/DeleteAccount/:id",Authentication,Authorization, DeleteAccount)
router.get("/getAllAcountHistory/:authId",Authentication,Authorization,getAllAcountHistory);
router.get("/getAllAcountHistoryByTeacherId/:id/:authId",Authentication,Authorization,getAllAcountHistoryByTeacherId);
module.exports=router;