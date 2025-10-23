const mongoose = require("mongoose");

const Objectivesschema = new mongoose.Schema(
  {
    mediumName:{
        type:String
    },
    Objectivesname: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("objectives", Objectivesschema);
