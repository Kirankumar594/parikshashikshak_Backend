const mongoose = require("mongoose");

const QuestAnalysisSchema = new mongoose.Schema(
  {
    selectedLanguage: {
      type: String,
    },
    QuestHeader: {
      type: String,
    },
    slno: {
      type: String,
    },
    ObjectType: {
      type: String,
    },
    Chapter: {
      type: String,
    },
    Lesson: {
      type: String,
    },
    QuestionType: {
      type: String,
    },
    OtSaLsa: {
      type: String,
    },
    Marks: {
      type: String,
    },
    Difficultlevel: {
      type: String,
    },
    Time: {
      type: String,
    },
    selectedMedium: {
      type: String,
    },
    Note: {
      type: String,
    },
    OT: {
      type: String,
    },
    VSA: {
      type: String,
    },
    SA: {
      type: String,
    },
    A: {
      type: String,
    },
    E: {
      type: String,
    },
    M: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("questAnalusisHeader", QuestAnalysisSchema);
