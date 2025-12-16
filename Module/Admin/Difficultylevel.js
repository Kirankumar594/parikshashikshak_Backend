const mongoose = require("mongoose");

const DiffLevelSchema = new mongoose.Schema(
  {
    mediumName: {
      type: String,
    },
    DiffLevelName: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("DifficultyLevel", DiffLevelSchema);
