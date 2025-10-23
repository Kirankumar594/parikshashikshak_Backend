const { toTitleCase } = require("../../Config/function");
const ClassModel = require("../../Module/Admin/SubClass");

class SUBClassM {
  async addSubClass(req, res) {
    try {
      let { mediumName,className, subclassName } = req.body;
      if (!mediumName)
      return res.status(400).json({ error: "Please select Medium name" });
      if (!className)
        return res.status(400).json({ error: "Please select class name" });
      if (!subclassName)
        return res.status(400).json({ error: "Please enter sub-class name" });
        mediumName = toTitleCase(mediumName);
      className = toTitleCase(className);
      subclassName = toTitleCase(subclassName);
      let data = await ClassModel.findOne({
        mediumName:mediumName,
        className: className,
        subclassName: subclassName,
      });
      if (data)
        return res.status(400).json({ error: `${subclassName} already exits` });
      await ClassModel.create({ className, subclassName ,mediumName});
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Something Went Wrong !!!" });
    }
  }

  async updateSubClass(req, res) {
    try {
      let { id, mediumName,className, subclassName } = req.body;
      let obj = {};
      if (mediumName) {
        mediumName = toTitleCase(mediumName);
        obj["mediumName"] = mediumName;
      }
      if (subclassName) {
        subclassName = toTitleCase(subclassName);
        obj["subclassName"] = subclassName;
      }
      if (className) {
        className = toTitleCase(className);
        obj["className"] = className;
      }
      let data = await ClassModel.findOneAndUpdate({ _id: id }, { $set: obj });
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllSubClass(req, res) {
    try {
      let data = await ClassModel.find({});
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSubClass(req, res) {
    try {
      let id = req.params.id;
      let data = await ClassModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
      return res.state(500).json({ error: "Something Went Wrong !!!" });
    }
  }
}
module.exports = new SUBClassM();
