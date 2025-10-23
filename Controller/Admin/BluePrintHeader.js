const BluePrintHeaderModel = require("../../Module/Admin/BluePrintHeader");

class BluePrintHeader {
  async AddBluePrintHeader(req, res) {
    try {
      let {
        selectedLanguage,
        BluePrintName,
        UnitWiseMrk,
        ObjectiveMrks,
        QuestionWiseMrk,
        AccordingRigorMrk,
        SNo,
        Total,
        Questions,
        Marks,
        Percentage,
        Lessons,
        Specifics,
        TypeOfQuestion,
        LevelOfDifficult,
        Time,
        TargetUnit,
        TotalQuestion,
        TotalMarks,
        V,
        K,
        D,
        VSA,
        SA,
        LA1,
        LA2,
        LA3,
        Note,
        selectedMedium,
        Objectivequestion,
        ShortanswerQ,
        LonganswerQ,
        Easy,
        MediumQ,
        Difficult,
      } = req.body;
      
      let data = await BluePrintHeaderModel.create({
        selectedLanguage,
        BluePrintName,
        UnitWiseMrk,
        ObjectiveMrks,
        QuestionWiseMrk,
        AccordingRigorMrk,
        SNo,
        Total,
        Questions,
        Marks,
        Percentage,
        Lessons,
        Specifics,
        TypeOfQuestion,
        LevelOfDifficult,
        Time,
        TargetUnit,
        TotalQuestion,
        TotalMarks,
        V,
        K,
        D,
        VSA,
        SA,
        LA1,
        LA2,
        LA3,
        Note,
        selectedMedium,
        Objectivequestion,
        ShortanswerQ,
        LonganswerQ,
        Easy,
        MediumQ,
        Difficult,
      });
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async GetBluePrintHeader(req, res) {
    try {
      let data = await BluePrintHeaderModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }
  async GetBluePrintHeaderByMedium(req, res) {
    try {
      let id = req.params.id;
      let data = await BluePrintHeaderModel.findOne({ selectedMedium: id });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async EditBluePrintHeader(req, res) {
    try {
      let id = req.params.id;
      let obj = {};
      let {
        selectedLanguage,
        BluePrintName,
        UnitWiseMrk,
        ObjectiveMrks,
        QuestionWiseMrk,
        AccordingRigorMrk,
        SNo,
        Total,
        Questions,
        Marks,
        Percentage,
        Lessons,
        Specifics,
        TypeOfQuestion,
        LevelOfDifficult,
        Time,
        TargetUnit,
        TotalQuestion,
        TotalMarks,
        V,
        K,
        D,
        VSA,
        SA,
        LA1,
        LA2,
        LA3,
        Note,
        selectedMedium,
        Objectivequestion,
        ShortanswerQ,
        LonganswerQ,
        Easy,
        MediumQ,
        Difficult,
      } = req.body;
      if (selectedLanguage) obj.selectedLanguage = selectedLanguage;
      if (BluePrintName) obj.BluePrintName = BluePrintName;
      if (UnitWiseMrk) obj.UnitWiseMrk = UnitWiseMrk;
      if (ObjectiveMrks) obj.ObjectiveMrks = ObjectiveMrks;
      if (QuestionWiseMrk) obj.QuestionWiseMrk = QuestionWiseMrk;
      if (AccordingRigorMrk) obj.AccordingRigorMrk = AccordingRigorMrk;
      if (SNo) obj.SNo = SNo;
      if (Total) obj.Total = Total;
      if (Questions) obj.Questions = Questions;
      if (Marks) obj.Marks = Marks;
      if (Percentage) obj.Percentage = Percentage;
      if (Lessons) obj.Lessons = Lessons;
      if (Specifics) obj.Specifics = Specifics;
      if (TypeOfQuestion) obj.TypeOfQuestion = TypeOfQuestion;
      if (LevelOfDifficult) obj.LevelOfDifficult = LevelOfDifficult;
      if (Time) obj.Time = Time;
      if (TargetUnit) obj.TargetUnit = TargetUnit;
      if (TotalQuestion) obj.TotalQuestion = TotalQuestion;
      if (TotalMarks) obj.TotalMarks = TotalMarks;
      if (V) obj.V = V;
      if (K) obj.K = K;
      if (D) obj.D = D;
      if (VSA) obj.VSA = VSA;
      if (SA) obj.SA = SA;
      if (LA1) obj.LA1 = LA1;
      if (LA2) obj.LA2 = LA2;
      if (LA3) obj.LA3 = LA3;
      if (Note) obj.Note = Note;
      if (selectedMedium) obj.selectedMedium = selectedMedium;
      if (Objectivequestion) obj.Objectivequestion = Objectivequestion;
      if (ShortanswerQ) obj.ShortanswerQ = ShortanswerQ;
      if (LonganswerQ) obj.LonganswerQ = LonganswerQ;
      if (Easy) obj.Easy = Easy;
      if (MediumQ) obj.MediumQ = MediumQ;
      if (Difficult) obj.Difficult = Difficult;
      const data = await BluePrintHeaderModel.findByIdAndUpdate(
        id,
        { $set: obj },
        { new: true }
      );
      if (data) {
        return res
          .status(200)
          .json({ success: "Blue Print Header Edited Successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async DeleteBluePrintHeader(req, res) {
    try {
      let id = req.params.id;
      let data = await BluePrintHeaderModel.deleteOne({ _id: id });
      if (data) {
        return res.status(200).json({ success: "Blue Print Header Deleted" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new BluePrintHeader();
