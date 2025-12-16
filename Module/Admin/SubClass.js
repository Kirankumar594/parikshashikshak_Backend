const mongoose = require("mongoose");

const SubClassSchema = new mongoose.Schema(
  {
    mediumName: {
      type: String,
    },
    className: {
      type: String,
    },
    subclassName: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subClassData", SubClassSchema);
