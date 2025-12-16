const mongoose = require("mongoose");

// Subject Model (Corrected)
const SubjectSchema = new mongoose.Schema(
  {
    mediumName: {
      type: String,
      required: true,
    },
    boardName:{
      type:String,
      required:true
    },
    subjectName: {
      type: String,
      required: true,
    },
    subClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subClassData", // Use the correct model name here
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
