const { toTitleCase } = require("../../Config/function");
const boardModel = require("../../Module/Admin/Board");

class BOARD {
  async addBoard(req, res) {
    try {
      let { mediumName,boardName } = req.body;
      console.log("rdywq",mediumName,boardName );
      if (!boardName)
        return res.status(400).json({ error: "Please enter board name" });
        if (!mediumName)
        return res.status(400).json({ error: "Please Select Medium Name" });
    
      let data = await boardModel.findOne({ boardName: boardName });
      // console.log(data);
      if (data)
        return res.status(400).json({ error: `${boardName} already exits` });
      await boardModel.create({ boardName,mediumName });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something Went Wrong !!!" });
    }
  }

  async updateBoard(req, res) {
    try {
      let { id, mediumName,boardName } = req.body;
      let obj = {};
      if (boardName) {
      
        let data = await boardModel.findOne({ boardName: boardName,mediumName:mediumName });
        if (data)
          return res.status(400).json({ error: `${boardName} already exits` });
        obj["boardName"] = boardName;
        obj["mediumName"] = mediumName;
      }
      let data = await boardModel.findOneAndUpdate({ _id: id }, { $set: obj });
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllBoard(req, res) {
    try {
      let data = await boardModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something Went Wrong" });
    }
  }

  async deleteBoard(req, res) {
    try {
      let id = req.params.id;
      let data = await boardModel.deleteOne({ _id: id });
      if (data.deletedCount == 0)
        return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new BOARD();
