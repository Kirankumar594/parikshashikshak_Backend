const { toTitleCase } = require("../../Config/function");
const typesofquestionmodel = require("../../Module/Admin/Typesofquestions");

class Typesofquestion {
  async addtypesofquestion(req, res) {
    try {
      let { Typesofquestion } = req.body;
      if (!Typesofquestion)
        return res
          .status(400)
          .json({ error: "Please Enter Types Of Question" });
      Typesofquestion = toTitleCase(Typesofquestion);
      let data = await typesofquestionmodel.findOne({
        Typesofquestion: Typesofquestion,
      });
      if (data)
        return res
          .status(400)
          .json({ error: `${Typesofquestion} already exits` });
      await typesofquestionmodel.create({ Typesofquestion });
      return res.status(200).json({ success: "Successfully Added" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something Went Wrong !!!" });
    }
  }
  //   get method

  async getAllTypesofquestion(req, res) {
    try {
      let data = await typesofquestionmodel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Somethig Went Wrong" });
    }
  }

  async updateTypesofquestions(req, res) {
    try {
      let { id, Typesofquestion } = req.body;
      let obj = {};
      if (Typesofquestion) {
        Typesofquestion = toTitleCase(Typesofquestion);
        let data = await typesofquestionmodel.findOne({
          Typesofquestion: Typesofquestion,
        });
        if (data)
          return res
            .status(400)
            .json({ error: `${Typesofquestion} already exits` });
        obj["Typesofquestion"] = Typesofquestion;
      }
      let data = await typesofquestionmodel.findOneAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      if (!data) return res.status(400).json({ error: "Data Not Found" });
      return res.status(200).json({ success: "Successfully Updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAllTypesofquestions(req, res) {
    try {
      let id = req.params.id;
      let data = await typesofquestionmodel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully Deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new Typesofquestion();
