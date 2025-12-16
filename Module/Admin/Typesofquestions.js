const mongoose = require("mongoose");

const typesofquestionschema = new mongoose.Schema(
  {
    Typesofquestion: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("typesofquestion", typesofquestionschema);
