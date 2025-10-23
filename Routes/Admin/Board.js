const express = require("express");
const {
  addBoard,
  updateBoard,
  getAllBoard,
  deleteBoard,
} = require("../../Controller/Admin/Board");
const { Authentication, Authorization } = require("../../Authentication/auth");
const router = express.Router();

router.post("/addBoard", Authentication, Authorization, addBoard);
router.put("/updateBoard", Authentication, Authorization, updateBoard);
router.get("/getAllBoard", getAllBoard);
router.delete(
  "/deleteBoard/:id/:authId",
  Authentication,
  Authorization,
  deleteBoard
);
module.exports = router;
