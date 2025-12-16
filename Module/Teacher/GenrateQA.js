const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("QuestionGnCount", CounterSchema);

const questionGenSchema = new mongoose.Schema(
  {
    paperId: {
      type: String,
      unique: true,
    },
    teacheName: {
      type: String,
    },
    teacherId: {
      type: ObjectId,
      ref: "Teacher",
    },
    Board: {
      type: String,
    },
    Medium: {
      type: String,
    },
    Class: {
      type: String,
    },
    Sub_Class: {
      type: String,
    },
    Exam_Name: {
      type: String,
    },
    Exam_Lavel: {
      type: String,
    },
    Tell_Us: {
      type: String,
    },
    Pay_Amount: {
      type: Number,
      default: 0,
    },
    Pay_Id: {
      type: String,
    },
    School_Logo: {
      type: String,
    },
    Institute_Name: {
      type: String,
    },
    SchoolAddress:{
      type:String
    },
    Subject: {
      type: String,
    },
    Paper_Name: {
      type: String,
    },
    Test_Date: {
      type: String,
    },
    Size_ofthe_Question: {
      type: String,
      default: "A4",
    },
    QuestionPdf: {
      type: String,
    },
    SyllbusPdf: {
      type: String,
    },
    bluePrintId: {
      type: ObjectId,
      ref: "BluePrint",
    },
    BlueprintPdf: {
      type: String,
    },
    AnswerKeyPdf: {
      type: String,
    },
    Individual: {
      type: String,
    },
    status: {
      type: String,
      default: "Not Complete Staps",
    },
    genrateStatus: {
      type: String,
    },
    userType:{
        type:String
    },
    numberOfPaper: {
      type: Number,
      default: 1,
    },
    ExamTime:{
      type:String
    },
    Questions:[],
    isEmail:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);
questionGenSchema.pre("save", async function (next) {
  try {
    if (!this.paperId) {
      // Find the corresponding counter document and increment the sequence
      const counter = await Counter.findByIdAndUpdate(
        { _id: "paperId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Create the unique bookId based on "DHANYAH" and the incremented sequence
      this.paperId = `GSMQA${counter.seq.toString().padStart(4, "0")}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("GenrateQA", questionGenSchema);
