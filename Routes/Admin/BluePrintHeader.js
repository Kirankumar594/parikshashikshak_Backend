const express = require("express");
const router = express.Router();

const {
  AddBluePrintHeader,
  GetBluePrintHeader,
  GetBluePrintHeaderByMedium,
  EditBluePrintHeader,
  DeleteBluePrintHeader
} = require("../../Controller/Admin/BluePrintHeader");

router.post("/addblueprintheader", AddBluePrintHeader);
router.get("/getblueprintheader", GetBluePrintHeader);
router.get("/getblueprintheaderbymedium/:id", GetBluePrintHeaderByMedium);
router.put("/EditBluePrintHeader/:id", EditBluePrintHeader)
router.delete("/DeleteBluePrintHeader/:id", DeleteBluePrintHeader)
module.exports = router;
