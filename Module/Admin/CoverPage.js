const mongoose = require("mongoose");

const Coverpage = new mongoose.Schema(
  {
    selectedLanguage: {
      type: String,
    },
    SchoolName: {
      type: String,
    },
    ExamName: {
      type: String,
    },
    Subject: {
      type: String,
    },
    Classs: {
      type: String,
    },
    SubjectTeacher: {
      type: String,
    },
    Principal: {
      type: String,
    },
    selectedMedium: {
      type: String,
    },
    questionPaper: {
      type: String,
    },
    blueprint: {
      type: String,
    },
    answersheet: {
      type: String,
    },
    questionanylys: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Coverpage", Coverpage);
