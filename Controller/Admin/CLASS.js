const { toTitleCase } = require("../../Config/function");
const ClassModel = require("../../Module/Admin/CLASS");

class ClassM {
  async addClass(req, res) {
    try {
      let { mediumName, className, subclassName } = req.body;
      if (!className)
        return res.status(400).json({ error: "Please enter class name" });
      if (!mediumName)
        return res.status(400).json({ error: "Please Select Medium Name" });
      if (!subclassName)
        return res.status(400).json({ error: "Please enter sub class name" });
      className = toTitleCase(className);
      let data = await ClassModel.findOne({
        className: className,
        mediumName: mediumName,
        subclassName: subclassName,
      });
      if (data)
        return res.status(400).json({ error: `${className} already exits` });
      await ClassModel.create({ className, mediumName, subclassName });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something Went Wrong !!!" });
    }
  }

  async updateClass(req, res) {
    try {
      let { id, className, mediumName, subclassName } = req.body;
      let obj = {};
      if (className) {
        className = toTitleCase(className);
        let data = await ClassModel.findOne({
          className: className,
          mediumName: mediumName,
          subclassName: subclassName,
        });
        if (data)
          return res.status(400).json({ error: `${className} already exits` });
        obj["className"] = className;
        obj["mediumName"] = mediumName;
        obj["subclassName"] = subclassName;
      }
      let data = await ClassModel.findOneAndUpdate({ _id: id }, { $set: obj });
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllClass(req, res) {
    try {
      let data = await ClassModel.find({});
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async deleteClass(req, res) {
    try {
      let id = req.params.id;
      let data = await ClassModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new ClassM();
