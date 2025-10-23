const { toTitleCase } = require("../../Config/function");
const ExamLevelModel = require("../../Module/Admin/AdminExamLevel");

class ExamLevel {
  async addExamLevel(req, res) {
    try {
      let { Examlevel } = req.body;
      Examlevel = toTitleCase(Examlevel);
      let data = await ExamLevelModel.findOne({ Examlevel: Examlevel });
      if (data)
        return res.status(400).json({ error: `${Examlevel} already exists` });
      await ExamLevelModel.create({ Examlevel });
      return res.status(200).json({ success: "Successfuly Added" });
    } catch (error) {
      console.log(error);
    }
  }

  async updateExamLevel(req, res) {
    try {
      let { id, Examlevel } = req.body;
      let obj = {};
      if (Examlevel) {
        Examlevel = toTitleCase(Examlevel);
        let data = await ExamLevelModel.findOne({ Examlevel: Examlevel });
        if (data)
          return res.status(400).json({ error: `${Examlevel} already exists` });
        obj["Examlevel"] = Examlevel;
      }
      let data = await ExamLevelModel.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfuly Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllExamLevel(req, res) {
    try {
      let { Examlevel } = req.body;
      Examlevel = toTitleCase(Examlevel);
      let data = await ExamLevelModel.findOne({ Examlevel: Examlevel });
      if (data)
        return res.status(400).json({ error: `${Examlevel} already exists` });
      await ExamLevelModel.create({ Examlevel });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {}
  }

  async updateExamLevel(req, res) {
    try {
      let { id, Examlevel } = req.body;
      let obj = {};
      if (Examlevel) {
        Examlevel = toTitleCase(Examlevel);
        let data = await ExamLevelModel.findOne({ Examlevel: Examlevel });
        if (data)
          return res.status(400).json({ error: `${Examlevel} already exists` });
        obj["Examlevel"] = Examlevel;
      }
      let data = await ExamLevelModel.findOneAndUpdate(
        { _id: id },
        { $set: obj }
      );
      if (!data) return res.status(400).json({ error: `Data not found` });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllExamLevel(req, res) {
    try {
      let data = await ExamLevelModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteExamLevel(req, res) {
    try {
      let id = req.params.id;
      let data = await ExamLevelModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully Deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new ExamLevel();
