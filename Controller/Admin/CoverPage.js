const CoverpageModel = require("../../Module/Admin/CoverPage");

class BluePrintHeader {
  async AddCoverPage(req, res) {
    try {
      let {
        selectedLanguage,
        SchoolName,
        ExamName,
        Subject,
        Classs,
        SubjectTeacher,
        Principal,
        selectedMedium,
        questionPaper,
        blueprint,
        answersheet,
        questionanylys,
      } = req.body;

      let data = await CoverpageModel.create({
        selectedLanguage,
        SchoolName,
        ExamName,
        Subject,
        Classs,
        SubjectTeacher,
        Principal,
        selectedMedium,
        questionPaper,
        blueprint,
        answersheet,
        questionanylys,
      });
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async GetCoverPage(req, res) {
    try {
      let data = await CoverpageModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getCoverPageBYMedium(req, res) {
    try {
      let medium = req.params.medium;
      let data = await CoverpageModel.findOne({ selectedMedium: medium });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async EdiCoverPageHeader(req, res) {
    try {
      let id = req.params.id;
      let obj = {};
      let {
        selectedLanguage,
        SchoolName,
        ExamName,
        Subject,
        Classs,
        SubjectTeacher,
        Principal,
        selectedMedium,
        questionPaper,
        blueprint,
        answersheet,
        questionanylys,
      } = req.body;
      if (selectedLanguage) obj.selectedLanguage = selectedLanguage;
      if (SchoolName) obj.SchoolName = SchoolName;
      if (ExamName) obj.ExamName = ExamName;
      if (Subject) obj.Subject = Subject;
      if (Classs) obj.Classs = Classs;
      if (SubjectTeacher) obj.SubjectTeacher = SubjectTeacher;
      if (Principal) obj.Principal = Principal;
      if (questionPaper) obj.questionPaper = questionPaper;
      if (blueprint) obj.blueprint = blueprint;
      if (answersheet) obj.answersheet = answersheet;
      if (questionanylys) obj.questionanylys = questionanylys;
      if (selectedMedium) obj.selectedMedium = selectedMedium;

      const data = await CoverpageModel.findByIdAndUpdate(
        id,
        { $set: obj },
        { new: true }
      );
      if (data) {
        return res
          .status(200)
          .json({ success: "Cover Page Header Edited Successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async DeleteCoverPageHeader(req, res) {
    try {
      let id = req.params.id;
      let data = await CoverpageModel.deleteOne({ _id: id });
      if (data) {
        return res.status(200).json({ success: "Cover Page Header Deleted Successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new BluePrintHeader();
