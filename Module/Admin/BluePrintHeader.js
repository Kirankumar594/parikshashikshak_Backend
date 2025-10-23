const mongoose = require("mongoose");

const BluePrintHeader = new mongoose.Schema(
  {
    selectedLanguage: {
      type: String,
    },
    BluePrintName: {
      type: String,
    },
    UnitWiseMrk: {
      type: String,
    },
    ObjectiveMrks: {
      type: String,
    },
    QuestionWiseMrk: {
      type: String,
    },
    AccordingRigorMrk: {
      type: String,
    },
    SNo: {
      type: String,
    },
    Total: {
      type: String,
    },
    Questions: {
      type: String,
    },
    Marks: {
      type: String,
    },
    Percentage: {
      type: String,
    },
    Lessons: {
      type: String,
    },
    Specifics: {
      type: String,
    },
    TypeOfQuestion: {
      type: String,
    },
    LevelOfDifficult: {
      type: String,
    },
    Time: {
      type: String,
    },
    TargetUnit: {
      type: String,
    },
    TotalQuestion: {
      type: String,
    },
    TotalMarks: {
      type: String,
    },
    V: {
      type: String,
    },
    K: {
      type: String,
    },
    D: {
      type: String,
    },
    VSA: {
      type: String,
    },
    SA: {
      type: String,
    },
    LA1: {
      type: String,
    },
    LA2: {
      type: String,
    },
    LA3: {
      type: String,
    },
    Note: {
      type: String,
    },
    selectedMedium: {
      type: String,
    },
    Objectivequestion: {
      type: String,
    },
    ShortanswerQ: {
      type: String,
    },
    LonganswerQ: {
      type: String,
    },
    Easy: {
      type: String,
    },
    MediumQ: {
      type: String,
    },
    Difficult: {
      type: String,
    },
    name:{
      type:String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("BluePrintHeader", BluePrintHeader);
