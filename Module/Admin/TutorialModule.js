const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  code: { type: String, required: true }, 
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model("Tutorial", tutorialSchema);
