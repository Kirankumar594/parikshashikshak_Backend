const QuestionTypeModel = require("../../Module/Admin/QuestionType");
class QuestionTYpe {
  async addquestiontype (req, res) {
    try {
      let {typeOfquestion,Qformat,QFormatMedium,translatelang } = req.body;
      if(!QFormatMedium) return  res.status(400).json({ error: "Please enter medium" });
      if(!Qformat) return res.status(400).json({ error: "Please enter format" });
      if(!typeOfquestion) return  res.status(400).json({ error: "Please enter type of question" });
          let check = await QuestionTypeModel.findOne({
            typeOfquestion,Qformat,QFormatMedium,translatelang 
      });
      if (check) return res.status(400).json({ error: "Already exits " });
      let obj = {
        typeOfquestion,Qformat,QFormatMedium,translatelang 
      };
      let data = await QuestionTypeModel.create(obj);
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ succes: "Successfully added" });
    } catch (error) {
      return res.status(400).json({ error: "API Error" });
    }
  }

  async updatesQuestionTYpes(req, res) {
    try {
      let {
        id,
        // translatelang,
        QFormatMedium,
        typeOfquestion,
        Qformat
      } = req.body;
      let obj = {};
      if (typeOfquestion) {
        obj["typeOfquestion"] = typeOfquestion;
      }
      if (Qformat) {
        obj["Qformat"] = Qformat;
      }
      if (QFormatMedium) {
        obj["QFormatMedium"] = QFormatMedium;
      }
      // if (translatelang) {
      //   obj["translatelang"] = translatelang;
      // }

      let data = await QuestionTypeModel.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllQuestionType(req, res) {
    try {
      let data = await QuestionTypeModel.find().sort({ _id: -1 });
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

  async deleteQuestionType(req, res) {
    try {
      let id = req.params.id;
      let data = await QuestionTypeModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      console.log("data", data);
      return res.status(200).json({ success: "Successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new QuestionTYpe();
