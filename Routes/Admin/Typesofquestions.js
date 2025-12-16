const express = require("express");
const {
  addtypesofquestion,
  updateTypesofquestions,
  getAllTypesofquestion,
  deleteAllTypesofquestions,
} = require("../../Controller/Admin/Typesofquestions");
const { Authentication, Authorization } = require("../../Authentication/auth");
const router = express.Router();

router.post(
  "/addtypesofquestion",
  Authentication,
  Authorization,
  addtypesofquestion
);
router.put(
  "/updateTypesofquestions",
  Authentication,
  Authorization,
  updateTypesofquestions
);
router.get("/getAllTypesofquestion", getAllTypesofquestion);
router.delete(
  "/deleteAllTypesofquestions/:id/:authId",
  Authentication,
  Authorization,
  deleteAllTypesofquestions
);
module.exports = router;
