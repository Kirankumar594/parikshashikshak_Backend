const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    mediumName: {
      type: String,
      required: true,
    },
    boardName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("board", boardSchema);
