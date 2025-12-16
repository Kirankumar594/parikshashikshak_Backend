const mongoose = require("mongoose");

const ExamanationSchema = new mongoose.Schema(
  {
    mediumName:{
        type:String
    },
    NameExamination: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("NameOfExamination", ExamanationSchema);
