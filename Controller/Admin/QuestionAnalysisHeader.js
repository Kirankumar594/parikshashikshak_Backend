const QuestAnalysisHeaderModel = require("../../Module/Admin/QuestionAnalysisHeader");

class QuestAnalysisHeader {
  async AddQuestAnalysisHeader(req, res) {
    try {
      let {
        selectedLanguage,
        QuestHeader,
        slno,
        ObjectType,
        Chapter,
        Lesson,
        QuestionType,
        OtSaLsa,
        Marks,
        Difficultlevel,
        Time,
        selectedMedium,
        Note,
        analysisValues,
      } = req.body;
      const { OT, VSA, SA, A, E, M } = analysisValues;

      let data = await QuestAnalysisHeaderModel.create({
        selectedLanguage,
        QuestHeader,
        slno,
        ObjectType,
        Chapter,
        Lesson,
        QuestionType,
        OtSaLsa,
        Marks,
        Difficultlevel,
        Time,
        selectedMedium,
        Note,
        OT,
        VSA,
        SA,
        A,
        E,
        M,
      });
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async GetQuestAnalysisHeader(req, res) {
    try {
      let data = await QuestAnalysisHeaderModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }
  async GetQuestAnalysisHeaderByMedium(req, res) {
    try {
      let id = req.params.id;
      let data = await QuestAnalysisHeaderModel.findOne({ selectedMedium: id });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }
  async getQuestAnalysisHeaderbyid(req, res) {
    try {
      const id = req.params.id;
      let data = await Note.findById({ _id: id });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }
  async UpdateQuestionAnalysisHeader(req, res) {
    try {
      let id = req.params.id;
      let {
        selectedLanguage,
        QuestHeader,
        slno,
        ObjectType,
        Chapter,
        Lesson,
        QuestionType,
        OtSaLsa,
        Marks,
        Difficultlevel,
        Time,
        selectedMedium,
        Note,
        OT,
        VSA,
        SA,
        A,
        E,
        M,
      } = req.body;
      let obj = {};

      if (selectedLanguage) {
        obj["selectedLanguage"] = selectedLanguage;
      }
      if (QuestHeader) {
        obj["QuestHeader"] = QuestHeader;
      }
      if (slno) {
        obj["slno"] = slno;
      }
      if (ObjectType) {
        obj["ObjectType"] = ObjectType;
      }
      if (Chapter) {
        obj["Chapter"] = Chapter;
      }
      if (Lesson) {
        obj["Lesson"] = Lesson;
      }
      if (QuestionType) {
        obj["QuestionType"] = QuestionType;
      }
      if (OtSaLsa) {
        obj["OtSaLsa"] = OtSaLsa;
      }
      if (Marks) {
        obj["Marks"] = Marks;
      }
      if (Difficultlevel) {
        obj["Difficultlevel"] = Difficultlevel;
      }
      if (Time) {
        obj["Time"] = Time;
      }

      if (selectedMedium) {
        obj["selectedMedium"] = selectedMedium;
      }
      if (Note) {
        obj["Note"] = Note;
      }
      if (OT) {
        obj["OT"] = OT;
      }
      if (VSA) {
        obj["VSA"] = VSA;
      }
      if (SA) {
        obj["SA"] = SA;
      }
      if (A) {
        obj["A"] = A;
      }
      if (E) {
        obj["E"] = E;
      }
      if (M) {
        obj["M"] = M;
      }
      let data = await QuestAnalysisHeaderModel.findOneAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteQuestionAnalysisHeader(req, res) {
    try {
      let id = req.params.id;
      let data = await QuestAnalysisHeaderModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new QuestAnalysisHeader();
