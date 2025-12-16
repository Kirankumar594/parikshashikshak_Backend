const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
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
module.exports = mongoose.model("classData", classSchema);

// const mongoose = require("mongoose");

// const classSchema = new mongoose.Schema(
//   {
//     mediumName: {
//       type: String,
//     },
//     className: {
//       type: String,
//     },
//     subclassName:{
//         type:String
//     },
//   },
//   { timestamps: true }
// );
// module.exports = mongoose.model("classData", classSchema);
