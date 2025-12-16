const mongoose = require("mongoose");

const weightageofcontentschema = new mongoose.Schema(
  {
    mediumName:{
      type:String
    },
    Subject: {
      type: String,
    },
    Content: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "weightageofthecontent",
  weightageofcontentschema
);
