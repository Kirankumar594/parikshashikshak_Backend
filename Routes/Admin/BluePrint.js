// const express = require("express");
// const router = express.Router();

// const {
//   registerBLUEPRINT,
//   getAllBLUEPRINTs,
//   updateBLUEPRINT,
//   makeBlockAndUnblockBLUEPRINTs,
//   deleteBLUEPRINT,
//   getblueprintsbyid,
//   updateweigtage,
//   updatemarksdetails,
//   getAllBluePrintByClass,
//   getBluePrintGetByTeacherRequired,
// } = require("../../Controller/Admin/BluePrint");

// const { Authentication, Authorization } = require("../../Authentication/auth");

// router.post("/registerBLUEPRINT", registerBLUEPRINT);

// router.get(
//   "/getAllBLUEPRINTs/:authId",
//   Authentication,
//   Authorization,
//   getAllBLUEPRINTs,
// );

// router.get(
//   "/blueprintall",

//   getAllBLUEPRINTs,
// );

// router.get("/getblueprintsbyid/:id", getblueprintsbyid);

// router.put("/updateBLUEPRINT", Authentication, Authorization, updateBLUEPRINT);

// router.put(
//   "/makeBlockAndUnblockBLUEPRINTs",
//   Authentication,
//   Authorization,
//   makeBlockAndUnblockBLUEPRINTs
// );
// router.delete(
//   "/deleteBLUEPRINT/:id/:authId",
//   Authentication,
//   Authorization,
//   deleteBLUEPRINT
// );

// router.put("/updateweatge/:id",updateweigtage);
// router.put("/updatemarksdetails/:id",updatemarksdetails)
// router.get("/getAllBluePrintByClass/:class/:authId",Authentication,Authorization,getAllBluePrintByClass);
// router.put("/getBluePrintGetByTeacherRequired",Authentication,Authorization,getBluePrintGetByTeacherRequired)
// module.exports = router;
 
 
// const express = require("express");
// const router = express.Router();

// const {
//   registerBLUEPRINT,
//   getAllBLUEPRINTs,
//   updateBLUEPRINT,
//   makeBlockAndUnblockBLUEPRINTs,
//   deleteBLUEPRINT,
//   getblueprintsbyid,
//   updateweigtage,
//   updatemarksdetails,
//   getAllBluePrintByClass,
//   getBluePrintGetByTeacherRequired,
//   getFilteredBlueprints,
//   getFilteredBlueprintsQuery,
// } = require("../../Controller/Admin/BluePrint");

// const { Authentication, Authorization } = require("../../Authentication/auth");

// // Existing routes
// router.post("/registerBLUEPRINT", registerBLUEPRINT);

// router.get(
//   "/getAllBLUEPRINTs/:authId",
//   Authentication,
//   Authorization,
//   getAllBLUEPRINTs,
// );

// router.get(
//   "/blueprintall",
//   getAllBLUEPRINTs,
// );

// router.get("/getblueprintsbyid/:id", getblueprintsbyid);

// router.put("/updateBLUEPRINT", Authentication, Authorization, updateBLUEPRINT);

// router.put(
//   "/makeBlockAndUnblockBLUEPRINTs",
//   Authentication,
//   Authorization,
//   makeBlockAndUnblockBLUEPRINTs
// );

// router.delete(
//   "/deleteBLUEPRINT/:id/:authId",
//   Authentication,
//   Authorization,
//   deleteBLUEPRINT
// );

// router.put("/updateweatge/:id", updateweigtage);

// router.put("/updatemarksdetails/:id", updatemarksdetails);

// router.get("/getAllBluePrintByClass/:class/:authId", Authentication, Authorization, getAllBluePrintByClass);

// router.put("/getBluePrintGetByTeacherRequired", Authentication, Authorization, getBluePrintGetByTeacherRequired);

// // NEW OPTIMIZED ROUTES
// // Option 1: Using URL parameters
// router.get(
//   "/getFilteredBlueprints/:board/:medium/:className/:subClassName/:subjects/:exameName",
//   getFilteredBlueprints
// );

// // Option 2: Using query parameters (more flexible)
// router.get("/filteredBlueprints", getFilteredBlueprintsQuery);

// module.exports = router; 


const express = require("express");
const router = express.Router();

const {
  registerBLUEPRINT,
  getAllBLUEPRINTs,
  updateBLUEPRINT,
  makeBlockAndUnblockBLUEPRINTs,
  deleteBLUEPRINT,
  getblueprintsbyid,
  updateweigtage,
  updatemarksdetails,
  getAllBluePrintByClass,
  getBluePrintGetByTeacherRequired,
  getFilteredBlueprints,
  getFilteredBlueprintsQuery,
  getBlueprintsPaginated,
} = require("../../Controller/Admin/BluePrint");

const { Authentication, Authorization } = require("../../Authentication/auth");

// Existing routes
router.post("/registerBLUEPRINT", registerBLUEPRINT);

router.get(
  "/getAllBLUEPRINTs/:authId",
  Authentication,
  Authorization,
  getAllBLUEPRINTs,
);

router.get(
  "/blueprintall",
  getAllBLUEPRINTs,
);

router.get("/getblueprintsbyid/:id", getblueprintsbyid);

router.put("/updateBLUEPRINT", Authentication, Authorization, updateBLUEPRINT);

router.put(
  "/makeBlockAndUnblockBLUEPRINTs",
  Authentication,
  Authorization,
  makeBlockAndUnblockBLUEPRINTs
);

router.delete(
  "/deleteBLUEPRINT/:id/:authId",
  Authentication,
  Authorization,
  deleteBLUEPRINT
);

router.put("/updateweatge/:id", updateweigtage);

router.put("/updatemarksdetails/:id", updatemarksdetails);

router.get("/getAllBluePrintByClass/:class/:authId", Authentication, Authorization, getAllBluePrintByClass);

router.put("/getBluePrintGetByTeacherRequired", Authentication, Authorization, getBluePrintGetByTeacherRequired);

// NEW OPTIMIZED ROUTES
// Option 1: Using URL parameters
router.get(
  "/getFilteredBlueprints/:board/:medium/:className/:subClassName/:subjects/:exameName",
  getFilteredBlueprints
);

// Option 2: Using query parameters (more flexible)
router.get("/filteredBlueprints", getFilteredBlueprintsQuery);

// Server-side pagination + filtering
router.get("/blueprints", getBlueprintsPaginated);

module.exports = router;