// routes/result.routes.js
const express = require("express");
const controller = require("../../Controller/Admin/resultSheetManagementController");

const router = express.Router();

router.post("/addResultManagement", controller.addResult);
router.get("/getAllResultManagement", controller.fetchAllResults);
router.get("/:id", controller.fetchResultById);
router.patch("/:id", controller.modifyResultById);
router.delete("/:id", controller.removeResultById);

module.exports = router;
