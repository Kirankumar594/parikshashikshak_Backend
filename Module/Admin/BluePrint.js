const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("BluePrintCount", CounterSchema);

const BlueprintSchema = new mongoose.Schema(
  {
    blueprintId: {
      type: String,
      unique: true,
    },
    //first page
    blName: {
      type: String,
    },

    board: {
      type: String,
    },
    ExameName: {
      type: String,
    },
    medium: {
      type: String,
    },
    className: {
      type: String,
    },
    SubClassName: {
      type: String,
    },
    subjects: {
      type: String,
    },
    Instructions: {
      type: String,
    },
    EasyParcentage: {
      type: String,
    },
    AverageParcentage: {
      type: String,
    },
    DifficultParcentage: {
      type: String,
    },

   
    objectives: [
      {
        Objective: {
          type: String,
        },
        NoofQues: {
          type: String,
        },
        NoofQuestion: {
          type: String,
        },
        Marks: {
          type: String,
        },
      },
    ],
    Weightageofthecontent: [
      {
        labels: {
          type: String,
        },
        Marks: {
          type: Number,
          default: 0,
        },
      },
    ],
    //Third page
    TypesofQuestions: [
      {
        QAType: {
          type: String,
        },
        QAInstruction: {
          type: String,
        },
        NQA: {
          type: Number,
          default: 0,
        },
        Mask: {
          type: Number,
          default: 0,
        },
      },
    ],

    DurationOfExam: {
      type: String,
    },
    TotalMask: {
      type: Number,
      default: 0,
    },
    //Dificulty Level
    Easy: {
      type: Number,
    },
    EasyMask: {
      type: Number,
    },
    Average: {
      type: Number,
    },
    AverageMask: {
      type: Number,
    },
    Difficult: {
      type: Number,
    },
    DifficultMask: {
      type: Number,
    },
    TotalDifficultMask: {
      type: Number,
    },
    Objective: [],
    AllChapter: [],
    isDeleted: {
      type: Boolean,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    studentPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
BlueprintSchema.pre("save", async function (next) {
  try {
    if (!this.blueprintId) {
      // Find the corresponding counter document and increment the sequence
      const counter = await Counter.findByIdAndUpdate(
        { _id: "blueprintId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Create the unique bookId based on "DHANYAH" and the incremented sequence
      this.blueprintId = `GSMT${counter.seq.toString().padStart(4, "0")}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("BluePrint", BlueprintSchema);
