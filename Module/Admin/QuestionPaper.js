const { default: mongoose } = require("mongoose");

const QuestionPaperSchema = new mongoose.Schema(
  {
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
    Subject: {
      type: String,
    },
    Chapter_Name: {
      type: String,
    },
    Difficulty_level: {
      type: String,
    },
    Types_Question: {
      type: String,
    },
    Lesson: {
      type: String,
    },
    Section: {
      type: String,
    },
    //MCQ Field and it is head of questions
    Question: {
      type: String,
    },

    Option_1: {
      type: String,
    },
    Option_2: {
      type: String,
    },
    Option_3: {
      type: String,
    },
    Option_4: {
      type: String,
    },
    Option_5: {
      type: String,
    },
    Option_6: {
      type: String,
    },
    Option_7: {
      type: String,
    },
    // Passage  Question
    PassiveQuesion: [
      {
        question: {
          type: String,
        },
        Option_1: {
          type: String,
        },
        Option_2: {
          type: String,
        },
        Option_3: {
          type: String,
        },
        Option_4: {
          type: String,
        },
        Option_5: {
          type: String,
        },
        Option_6: {
          type: String,
        },
      },
    ],
    Grammer: [],
    //Match the following question head of question is one
    Part_A1: {
      type: String,
    },
    Part_A2: {
      type: String,
    },
    Part_A3: {
      type: String,
    },
    Part_A4: {
      type: String,
    },
    Part_A5: {
      type: String,
    },
    Part_A6: {
      type: String,
    },
    //Parts B group
    Part_B1: {
      type: String,
    },
    Part_B2: {
      type: String,
    },
    Part_B3: {
      type: String,
    },
    Part_B4: {
      type: String,
    },
    Part_B5: {
      type: String,
    },
    Part_B6: {
      type: String,
    },
    Part_B7: {
      type: String,
    },
    // Part C Group
    Part_C1: {
      type: String,
    },
    Part_C2: {
      type: String,
    },
    Part_C3: {
      type: String,
    },
    Part_C4: {
      type: String,
    },
    Part_C5: {
      type: String,
    },
    Part_C6: {
      type: String,
    },
    Part_C7: {
      type: String,
    },

    Part_A1_A: {
      type: String,
    },
    Part_A2_A: {
      type: String,
    },
    Part_A3_A: {
      type: String,
    },
    Part_A4_A: {
      type: String,
    },
    Part_A5_A: {
      type: String,
    },
    Part_A6_A: {
      type: String,
    },
    //Parts B group
    Part_B1_A: {
      type: String,
    },
    Part_B2_A: {
      type: String,
    },
    Part_B3_A: {
      type: String,
    },
    Part_B4_A: {
      type: String,
    },
    Part_B5_A: {
      type: String,
    },
    Part_B6_A: {
      type: String,
    },
    Part_B7_A: {
      type: String,
    },
    // Part C Group
    Part_C1_A: {
      type: String,
    },
    Part_C2_A: {
      type: String,
    },
    Part_C3_A: {
      type: String,
    },
    Part_C4_A: {
      type: String,
    },
    Part_C5_A: {
      type: String,
    },
    Part_C6_A: {
      type: String,
    },
    Part_C7_A: {
      type: String,
    },

    //Relational Questions
    RealetionA: {
      type: String,
    },
    RealetionB: {
      type: String,
    },
    RealetionC: {
      type: String,
    }, //other is answer
    //And 6 option is Alreday decleared

    //choose odd and out who is diffrent
    //And 4 option is Alreday decleared
    Image_1: {
      type: String,
    },
    Image_2: {
      type: String,
    },
    Image_3: {
      type: String,
    },
    Image_4: {
      type: String,
    },
    Image_5: {
      type: String,
    },
    Image_6: {
      type: String,
    },
    Image_Ans: {
      type: String,
    },
    //five and six sentences questions
    Question1: {
      type: String,
    },
    Answer1: {
      type: String,
    },
    GrammerArrQ: [],
    GrammerArrAns: [],

    orQuestion: {
      type: String,
    },
    orAnswer: {
      type: String,
    },
    ImageQ: {
      type: String,
    },
    orImageQ: {
      type: String,
    },
    orNumberOfLine: {
      type: String
    },
    OrPoemSat: {
      type: String
    },
    OrPoemEnd: {
      type: String
    },

    //head of question uper
    NumberOfLine: {
      type: String,
    },
    //Our type Question
    ourImage: {
      type: String,
    },
    ourQuestion: {
      type: String,
    },
    ourAnswer: {
      type: String,
    },
    Questiontype: {
      type: String
    },
    Types_QuestionTranslate:{
      type:String
    },

    //grammer questions
    Text_1: {
      type: String,
    },
    Text_2: {
      type: String,
    },
    Text_3: {
      type: String,
    },
    //complete the poem
    PoemSt: {
      type: String,
    },
    PoemEnd: {
      type: String,
    },
    Name_of_examination: [{
      NameExamination: { type: String },
    }],
    Objectives: {
      type: String,
    },
    Instruction: {
      type: String,
    },
    // Graph and figer out question and alerady head of question in topup and answer image also top defined

    Image: {
      type: String,
    },

    Marks: {
      type: String,
    },
    Answer_Time: {
      type: String,
    },
    Answer: {
      type: String,
    },
    viewPath: {
      type: String,
    },
    editPath: {
      type: String,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0
    },
    //Fill in the blanks
    input1: {
      type: String,
    },
    input2: {
      type: String,
    },
    input3: {
      type: String,
    },
    //Recorrect the following
    orImage_Ans: {
      type: String
    },
  },
  { timestamps: true }
);

// Performance indexes for frequent filters/searches
QuestionPaperSchema.index({ createdAt: -1 });
QuestionPaperSchema.index({ Board: 1 });
QuestionPaperSchema.index({ Medium: 1 });
QuestionPaperSchema.index({ Class: 1 });
QuestionPaperSchema.index({ Sub_Class: 1 });
QuestionPaperSchema.index({ Subject: 1 });
QuestionPaperSchema.index({ Chapter_Name: 1 });
QuestionPaperSchema.index({ Types_Question: 1 });
QuestionPaperSchema.index({ Section: 1 });
QuestionPaperSchema.index({ "Name_of_examination.NameExamination": 1 });
// Compound index to speed up common queries
QuestionPaperSchema.index({ Board: 1, Medium: 1, Class: 1, Sub_Class: 1, Subject: 1 });

module.exports = mongoose.model("Questions", QuestionPaperSchema);
