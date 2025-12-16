const { toTitleCase } = require("../../Config/function");
const weightageofthecontentmodel = require("../../Module/Admin/Weighttageofthecontent");

class weightageofthecontent {
  async addweightage(req, res) {
    try {
      let { mediumName,Subject, Content } = req.body;
      if (!mediumName) {
        return res.status(400).json({ error: "Please Enter Content" });
      }
      if (!Subject) {
        return res.status(400).json({ error: "Please Select Subject" });
      }
      if (!Content) {
        return res.status(400).json({ error: "Please Enter Content" });
      }
      mediumName = toTitleCase(mediumName);
      Subject = toTitleCase(Subject);
      Content = toTitleCase(Content);
      let data = await weightageofthecontentmodel.findOne({
        Subject: Subject,
        Content: Content,
      });
      if (data)
        return res.status(400).json({ error: `${Content} already exists` });
      await weightageofthecontentmodel.create({ mediumName,Subject, Content });
      return res.status(200).json({ success: "Successfully Added" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Something Went Wrong" });
    }
  }
  async getallcontent(req, res) {
    try {
      let data = await weightageofthecontentmodel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Somethig Went Wrong" });
    }
  }
  async updateallcontent(req, res) {
    try {
      let { id, mediumName,Subject, Content } = req.body;
      let obj = {};
      if (mediumName) {
        mediumName = toTitleCase(mediumName);
        obj["mediumName"] = mediumName;
      }
      if (Subject) {
        Subject = toTitleCase(Subject);
        obj["Subject"] = Subject;
      }
      if (Content) {
        Content = toTitleCase(Content);
        obj["Content"] = Content;
      }
      let data = await weightageofthecontentmodel.findOneAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Succesfully Updated !!!" });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteweightage(req, res) {
    try {
      let id = req.params.id;
      let data = await weightageofthecontentmodel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data Not Found" });
      return res.status(200).json({ success: "Sucessfully Deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new weightageofthecontent();
