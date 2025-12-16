const { toTitleCase } = require("../../Config/function");
const DiffLevelModel = require("../../Module/Admin/Difficultylevel");

class DiffLevel {
  async addDiffLevel(req, res) {
    try {
      let { mediumName,DiffLevelName } = req.body;
      console.log("rdywq",mediumName,DiffLevelName );
      if (!DiffLevelName)
        return res.status(400).json({ error: "Please enter DiffLevel name" });
        if (!mediumName)
        return res.status(400).json({ error: "Please Select Medium Name" });
    
      let data = await DiffLevelModel.findOne({ DiffLevelName: DiffLevelName });
      // console.log(data);
      if (data)
        return res.status(400).json({ error: `${DiffLevelName} already exits` });
      await DiffLevelModel.create({ DiffLevelName,mediumName });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something Went Wrong !!!" });
    }
  }

  async updateDiffLevel(req, res) {
    try {
      let { id, mediumName,DiffLevelName } = req.body;
      let obj = {};
      if (DiffLevelName) {
      
        let data = await DiffLevelModel.findOne({ DiffLevelName: DiffLevelName,mediumName:mediumName });
        if (data)
          return res.status(400).json({ error: `${DiffLevelName} already exits` });
        obj["DiffLevelName"] = DiffLevelName;
        obj["mediumName"] = mediumName;
      }
      let data = await DiffLevelModel.findOneAndUpdate({ _id: id }, { $set: obj });
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllDiffLevel(req, res) {
    try {
      let data = await DiffLevelModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something Went Wrong" });
    }
  }

  async deleteDiffLevel(req, res) {
    try {
      let id = req.params.id;
      let data = await DiffLevelModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new DiffLevel();
