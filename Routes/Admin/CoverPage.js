const express = require("express");
const router = express.Router();

const {
  AddCoverPage,
  GetCoverPage,
  getCoverPageBYMedium,
  EdiCoverPageHeader,
  DeleteCoverPageHeader
} = require("../../Controller/Admin/CoverPage");

router.post("/addcoverpage", AddCoverPage);
router.get("/getcoverpagedetails", GetCoverPage);
router.get("/getCoverPageBYMedium/:medium",getCoverPageBYMedium);
router.put("/EditCoverPageHeader/:id", EdiCoverPageHeader);
router.delete("/DeleteCoverPageHeader/:id", DeleteCoverPageHeader)
module.exports = router;
