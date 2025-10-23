const MediumModel = require("../../Module/Admin/Medium");
const { toTitleCase } = require("../../Config/function");

class MEDIUM {
  async addMedium(req, res) {
    try {
      let { mediumName } = req.body;
      if (!mediumName)
        return res.status(400).json({ error: "Please enter Medium name" });
      mediumName = toTitleCase(mediumName);
      let data = await MediumModel.findOne({ mediumName: mediumName });
      console.log("object", data);
      if (data)
        return res.status(400).json({ error: `${mediumName} already exits` });
      await MediumModel.create({ mediumName });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMedium(req, res) {
    try {
      let { id, mediumName } = req.body;
      let obj = {};
      if (mediumName) {
        mediumName = toTitleCase(mediumName);
        let data = await MediumModel.findOne({ mediumName: mediumName });
        if (data)
          return res.status(400).json({ error: `${mediumName} already exits` });
        obj["mediumName"] = mediumName;
      }
      let data = await MediumModel.findOneAndUpdate({ _id: id }, { $set: obj });
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllMedium(req, res) {
    try {
      let { mediumName } = req.body;
      if (!mediumName)
        return res.status(400).json({ error: "Please enter Medium name" });
      mediumName = toTitleCase(mediumName);
      let data = await MediumModel.findOne({ mediumName: mediumName });
      if (data)
        return res.status(400).json({ error: `${mediumName} already exits` });
      await MediumModel.create({ mediumName });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMedium(req, res) {
    try {
      let { id, mediumName } = req.body;
      let obj = {};
      if (mediumName) {
        mediumName = toTitleCase(mediumName);
        let data = await MediumModel.findOne({ mediumName: mediumName });
        if (data)
          return res.status(400).json({ error: `${mediumName} already exits` });
        obj["mediumName"] = mediumName;
      }
      let data = await MediumModel.findOneAndUpdate({ _id: id }, { $set: obj });
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllMedium(req, res) {
    try {
      let data = await MediumModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMedium(req, res) {
    try {
      let id = req.params.id;
      let data = await MediumModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new MEDIUM();
