const express=require('express');
const router=express.Router();
const multer = require("multer");
const { registerPrinter, loginPrinter, getAllPrinters,getByPrinterId, updatePrinter, makeBlockAndUnblockPrinters, deletePrinter } = require('../../Controller/Printer/Printer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Printer");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const { Authentication, Authorization } = require('../../Authentication/auth');

const upload = multer();
router.post("/registerPrinter",registerPrinter);
router.post("/loginPrinter",loginPrinter);
router.get("/getAllPrinters/:authId",Authentication, Authorization,getAllPrinters);
router.get("/getUserById/:id",getByPrinterId);
router.put("/updatePrinter",upload.any(),Authentication, Authorization,updatePrinter)
router.put("/makeBlockAndUnblockPrinters",Authentication, Authorization,makeBlockAndUnblockPrinters);
router.delete("/deletePrinter/:id/:authId",Authentication, Authorization,deletePrinter);
module.exports=router;