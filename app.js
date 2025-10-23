const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path")

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected !!!"));

const PORT = process.env.PORT || 8774;

const Admin = require("./Routes/Admin/Admin");
const Teacher = require("./Routes/Teacher/Teacher");
const Board = require("./Routes/Admin/Board");
const Medium = require("./Routes/Admin/Medium");
const ExamanationOfName = require("./Routes/Admin/NameOfExamination");
const CLASS = require("./Routes/Admin/CLASS");
const SubCLASS = require("./Routes/Admin/SubClass");
const Subject = require("./Routes/Admin/Subject");
const PaperType = require("./Routes/Admin/PaperType");
const BluePrint = require("./Routes/Admin/BluePrint");
const Question = require("./Routes/Admin/QuestionPaper");
const OTP = require("./Routes/Teacher/Otp");
const ExamLevel = require("./Routes/Admin/AdminExamlevel");
const TypesofQuestions = require("./Routes/Admin/Typesofquestions");

const weightageofcongtent=require('./Routes/Admin/Weighttageofthecontent')
const Chapter = require("./Routes/Admin/Chapter");
const AccountHistory = require("./Routes/Admin/AccountHistory");
const QuestionGen = require("./Routes/Teacher/GenrateQA");
const SubAdmin = require("./Routes/Admin/SubAdmin");
const Syllabus=require("./Routes/Admin/Syllabus");
const Objectives = require("./Routes/Admin/Objectives")
const Printer=require("./Routes/Printer/Printer");
const UploadQuestionPDF = require("./Routes/Admin/UploadQuestion")
const TypeOfQuestion = require("./Routes/Admin/QuestionType")
const BluePrintHeader = require("./Routes/Admin/BluePrintHeader");
const QuestionAnalysisHeader = require("./Routes/Admin/QuestionAnalysisHeader");
const QuestionHeader = require("./Routes/Admin/QuestionHeader")
const DifficultyLevel = require("./Routes/Admin/DifficultyLevel")
const CoverPage = require("./Routes/Admin/CoverPage") 
const phonepe = require('./Routes/Teacher/phonepeRoutes'); 
const ResultSheet = require("./Routes/Admin/ResultSheetRoutes");   
const PaymentReceiptRoute = require("./Routes/Admin/Email/paymentReceipt"); 
const ResultSheetmanagementRoutes = require("./Routes/Admin/ResultSheetmanagementRoutes"); 
const RefferAndEarn = require("./Routes/Teacher/referralRoutes")  
const Tutorial = require("./Routes/Admin/TutorialRoutes");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

app.use("/api/admin",RefferAndEarn)
app.use("/api/admin",Syllabus);
app.use("/api/admin", SubAdmin);
app.use("/api/admin", AccountHistory);
app.use("/api/teacher", QuestionGen);
app.use("/api/otp", OTP);
app.use("/api/admin", Question);
app.use("/api/admin", BluePrint);
app.use("/api/admin", PaperType);
app.use("/api/admin", Subject);
app.use("/api/admin", CLASS);
app.use("/api/admin", Admin);
app.use("/api/admin", Teacher);
app.use("/api/admin", Board);
app.use("/api/admin", Medium);
app.use("/api/admin", ExamanationOfName);
app.use("/api/admin", SubCLASS);
app.use("/api/admin", ExamLevel);
app.use("/api/admin",TypesofQuestions);
// app.use("/api/admin",Chapters);
app.use("/api/printer",Printer);

app.use("/api/admin", weightageofcongtent);
app.use("/api/admin", Chapter);
app.use("/api/admin", Syllabus);
app.use("/api/admin",Objectives);
app.use("/api/admin",UploadQuestionPDF);
app.use("/api/admin",TypeOfQuestion);
app.use("/api/admin",BluePrintHeader);
app.use("/api/admin",QuestionAnalysisHeader);
app.use("/api/admin",QuestionHeader)
app.use("/api/admin",DifficultyLevel);
app.use("/api/admin",CoverPage); 
app.use("/api/Teacher", phonepe);   
app.use("/api/ResultSheet",ResultSheet)
app.use("/api/admin",PaymentReceiptRoute);   
app.use("/api/admin",ResultSheetmanagementRoutes);   
// app.use("/api/admin",Tutorial)
app.use("/api/admin/tut",Tutorial)



// app.use(express.static(path.join(__dirname, 'build'))); // Change 'build' to your frontend folder if needed

// // Redirect all requests to the index.html file

// app.get("*", (req, res) => {
//   return  res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(
  cors()
);
app.get("/", (req, res) => {
  res.send("Welcome to Guru Resource Management!");
});

// app.all("*", function (req, res) {
//   throw new Error("Bad request");
// });

// app.use(function (e, req, res, next) {
//   if (e.message === "Bad request") {
//     res.status(400).send({ status: false, error: e.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


