const AccuntModel = require("../../Module/Admin/AccountHistory");

class ACCOUNT {
  async AddAccount(req, res) {
    try {
      let { Pay_id, title, teacherId, Pay_Amount, Pay_mode, date, status } =
        req.body;
      let data = await AccuntModel.create({
        Pay_id,
        title,
        teacherId,
        Pay_Amount,
        Pay_mode,
        date,
        status,
      });
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully added" });
    } catch (error) {
      console.log(error);
    }
  }

  async EditAccount(req, res) {
    try {
      let id = req.params.id;
      let obj = {};
      let { Pay_id, title, teacherId, Pay_Amount, Pay_mode, date, status } =
        req.body;
      if (Pay_id) obj.Pay_id = Pay_id;
      if (title) obj.title = title;
      if (teacherId) obj.teacherId = teacherId;
      if (Pay_Amount) obj.Pay_Amount = Pay_Amount;
      if (Pay_mode) obj.Pay_mode = Pay_mode;
      if (date) obj.date = date;
      if (status) obj.status = status;
      const data = await AccuntModel.findByIdAndUpdate(
        id,
        { $set: obj },
        { new: true }
      );
      if (data) {
        return res
          .status(200)
          .json({ success: "Account History Edited Successfully..." });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async DeleteAccount(req, res) {
    try {
      let id = req.params.id;
      const data = await AccuntModel.deleteOne({ _id: id });
      if (data) {
        return res
          .status(200)
          .json({ success: "Account history Deleted Successfully...." });
      }
    } catch (error) {
      return res.status(500).json({ error: "Inernal Server Error" });
    }
  }

  async getAllAcountHistory(req, res) {
    try {
      let data = await AccuntModel.find()
        .populate("teacherId")
        .sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAcountHistoryByTeacherId(req, res) {
    try {
      let id = req.params.id;
      let data = await AccuntModel.find({ teacherId: id }).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }


}
module.exports = new ACCOUNT();
