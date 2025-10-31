const uploadQuestionModel = require("../../Module/Admin/UploadQuestionPdf");  
const { uploadFile2 } = require("../../Authentication/Aws");

//questionPdf answerPdf
class UPLOADQESTION {
  async addUploadQuestions(req, res) {
    try {
      let { year, Class, SubClass, subject, medium, Title, questionPdf,answerPdf } = req.body;
          let check = await uploadQuestionModel.findOne({
        year,
        Class,
        SubClass,
        subject,
        medium,
        Title,
        questionPdf,
        answerPdf,
      });
      if (check) return res.status(400).json({ error: "Already exits " });
      let obj = {
        year,
        Class,
        SubClass,
        subject,
        medium,
        Title,
        questionPdf,
        answerPdf,
      };

      if (req.files.length != 0) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].fieldname == "questionPdf") {
            obj["questionPdf"] = await uploadFile2(arr[i],"QuestionPdf");
          }

          if (arr[i].fieldname == "answerPdf") {
            obj["answerPdf"] =await uploadFile2(arr[i],"QuestionPdf");
          }
        }
      }
      let data = await uploadQuestionModel.create(obj);
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ succes: "Successfully added" });
    } catch (error) {
      return res.status(400).json({ error: "Api Error" });
    }
  }

  async updateUploadQuestions(req, res) {
    try {
      let {
        id,
        year,
        Class,
        SubClass,
        subject,
        medium,
        Title,
        Examinationname,
      } = req.body;
      let obj = {};
      if (Title) {
        obj["Title"] = Title;
      }
      if (Examinationname) {
        obj["Examinationname"] = Examinationname;
      }
      if (year) {
        obj["year"] = year;
      }
      if (Class) {
        obj["Class"] = Class;
      }
      if (subject) {
        obj["subject"] = subject;
      }
      if (SubClass) {
        obj["SubClass"] = SubClass;
      }
      if (medium) {
        obj["medium"] = medium;
      }

      if (req.files.length != 0) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].fieldname == "questionPdf") {
            obj["questionPdf"] = await uploadFile2(arr[i],"QuestionPdf");
          }

          if (arr[i].fieldname == "answerPdf") {
            obj["answerPdf"] = await uploadFile2(arr[i],"QuestionPdf");
          }
        }
      }
      let data = await uploadQuestionModel.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUploadQuestions(req, res) {
    try {
      let data = await uploadQuestionModel.find().sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getUploadPdfQuestionbyid(req, res) {
    try {
      let id = req.params.id;
      let data = await uploadQuestionModel.findById({ _id: id });
      if (data) return res.status(200).json({ succes: data });
    } catch (error) {
      console.log(error);
    }
  }

  async deletedUploadQuestionPdf(req, res) {
    try {
      let id = req.params.id;
      let data = await uploadQuestionModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      console.log("data", data);
      return res.status(200).json({ success: "Successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UPLOADQESTION();
