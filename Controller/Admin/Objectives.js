const objectivemodel = require("../../Module/Admin/Objectives");

class Objectives {
  async addobjectives(req, res) {
    try {
      let { mediumName,Objectivesname } = req.body;
      if (!mediumName)
      return res.status(400).json({ error: "Please Select The Medium" });
      if (!Objectivesname)
        return res.status(400).json({ error: "Please Enter The Objective" });
      let data = await objectivemodel.findOne({
        mediumName:mediumName,
        Objectivesname: Objectivesname,

      });
      if (data)
        return res
          .status(400)
          .json({ error: `${Objectivesname} already exists` });
      await objectivemodel.create({ mediumName,Objectivesname });
      return res.status(200).json({ success: "Successfully added data" });
    } catch (error) {
      return res.status(500).json({ error: "Something Went Wrong !!!" });
    }
  }

  async updateObjectives(req, res) {
    try {
      let { id, mediumName,Objectivesname } = req.body;
      console.log("obj", req.body);
      let obj = {};
      if (Objectivesname) {
        let data = await objectivemodel.findOne({
          mediumName:mediumName,
          Objectivesname: Objectivesname,
        });
        if (data)
          return res
            .status(400)
            .json({ error: `${Objectivesname} already Exists` });
        obj["Objectivesname"] = Objectivesname;
      }
      if(mediumName)
      {
        obj["mediumName"] = mediumName;
      }
      let data = await objectivemodel.findOneAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      res.status(200).json({ success: "Successfully Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getobjective(req, res) {
    try {
      let data = await objectivemodel.find().sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteobjectives(req, res) {
    try {
      let id = req.params.id;
      let data = await objectivemodel.deleteOne({ _id: id });
      console.log("deleted", data);
      if (data.deletedCount === 0)
        return res.status(400).json({ error: "Data not Found" });
      return res.status(200).json({ success: "Successfully Deleted" });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately, for example:
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
module.exports = new Objectives();
