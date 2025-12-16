const express = require("express");
const {addobjectives,updateObjectives,getobjective,deleteobjectives}=require("../../Controller/Admin/Objectives");
const {Authentication,Authorization}= require("../../Authentication/auth")
const router= express.Router();

router.post("/addobjectives",Authentication,Authorization,addobjectives);
router.get("/getobjective",getobjective);
router.put("/updateObjectives",Authentication,Authorization,updateObjectives);
router.delete("/deleteobjectives/:id/:authId",Authentication,Authorization,deleteobjectives);

module.exports = router;