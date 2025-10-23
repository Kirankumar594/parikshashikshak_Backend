const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    SubAdmin: {
      type: Boolean,
      default: false,
    },
    Board: {
      type: Boolean,
      default: false,
    },
    Class: {
      type: Boolean,
      default: false,
    },
    Subclass: {
      type: Boolean,
      default: false,
    },
    Medium: {
      type: Boolean,
      default: false,
    },
    Name_Of_Examination: {
      type: Boolean,
      default: false,
    },
    Subject: {
      type: Boolean,
      default: false,
    },
    SubAdmin: {
      type: Boolean,
      default: false,
    },
    Chapters: {
      type: Boolean,
      default: false,
    },
    Blue_Print: {
      type: Boolean,
      default: false,
    },
    Questions: {
      type: Boolean,
      default: false,
    },
    Type_Of_Questions: {
      type: Boolean,
      default: false,
    },
    Exam_Level: {
      type: Boolean,
      default: false,
    },
    Weightage: {
      type: Boolean,
      default: false,
    },
    User_List: {
      type: Boolean,
      default: false,
    },
    Account_History: {
      type: Boolean,
      default: false,
    },
    AdminType: {
      type: String,
      default: "SubAdmin",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", adminSchema);
