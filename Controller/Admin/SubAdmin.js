const AdminModel = require("../../Module/Admin/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmpty, isValidEmail, phonenumber } = require("../../Config/function");
const e = require("cors");
const saltRounds = 10;

class SUBADMIN {
  async registerSubAdmin(req, res) {
    try {
      let {
        name,
        email,
        mobile,
        password,
        SubAdmin,
        Board,
        Class,
        Subclass,
        Medium,
        Name_Of_Examination,
        Subject,
        Chapters,
        Blue_Print,
        Questions,
        Type_Of_Questions,
        Exam_Level,
        Weightage,
        User_List,
        Account_History,
      } = req.body;

      if (!name) return res.status(400).json({ error: "Please enter name" });
      if (!email) return res.status(400).json({ error: "Please enter email" });
      if (!isValidEmail(email))
        return res.status(400).json({ error: `${email} Invalid id` });
      if (!mobile)
        return res.status(400).json({ error: "Please enter mobile number" });
      if (!phonenumber(mobile))
        return res
          .status(400)
          .json({ error: `${mobile} Invalid mobile number` });
      if (!password)
        return res.status(400).json({ error: "Please enter password" });
      let encryptedPassword = bcrypt.hash(password, saltRounds).then((hash) => {
        return hash;
      });
      let pwd = await encryptedPassword;

      let obj = {
        mobile,
        name,
        email,
        password: pwd,
        SubAdmin,
        Board,
        Class,
        Subclass,
        Medium,
        Name_Of_Examination,
        Subject,
        Chapters,
        Blue_Print,
        Questions,
        Type_Of_Questions,
        Exam_Level,
        Weightage,
        User_List,
        Account_History,
      };
      let data = await AdminModel.create(obj);
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: "Successfully register" });
    } catch (error) {
      console.log(error);
    }
  }

  async EditSubAdmin(req, res) {
    try {
      let {
        id,
        name,
        email,
        mobile,
        password,
        SubAdmin,
        Board,
        Class,
        Subclass,
        Medium,
        Name_Of_Examination,
        Subject,
        Chapters,
        Blue_Print,
        Questions,
        Type_Of_Questions,
        Exam_Level,
        Weightage,
        User_List,
        Account_History,
      } = req.body;
      let obj = {
        SubAdmin,
        Board,
        Class,
        Subclass,
        Medium,
        Name_Of_Examination,
        Subject,
        Chapters,
        Blue_Print,
        Questions,
        Type_Of_Questions,
        Exam_Level,
        Weightage,
        User_List,
        Account_History,
      };
      if (name) {
        obj["name"] = name;
      }
      if (email) {
        if (!isValidEmail(email))
          return res.status(400).json({ error: `${email} Invalid id` });
        let checkEmail = await AdminModel.findOne({ email: email });
        if (checkEmail)
          return res.status(400).json({ error: `${email} already exits` });
        obj["email"] = email;
      }
      if (mobile) {
        if (!phonenumber(mobile))
          return res
            .status(400)
            .json({ error: `${mobile} Invalid mobile number` });
        let checkMobile = await AdminModel.findOne({ mobile: mobile });
        if (checkMobile)
          return res.status(400).json({ error: `${mobile} already exits` });
        obj["mobile"] = mobile;
      }
      if (password) {
        obj["password"] = await bcrypt
          .hash(password, saltRounds)
          .then((hash) => {
            return hash;
          });
      }
      let data = await AdminModel.findOneAndUpdate(
        { _id: id },
        { $set: obj },
        { new: true }
      );
      if (!data) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSubAdmin(req,res){
    try {
        let data=await AdminModel.find({AdminType:"SubAdmin"}).sort({_id:-1});
        return res.status(200).json({success:data})
    } catch (error) {
        console.log(error);
    }
  }

  async deleteSubadmin(req,res){
    try {
        let id=req.params.id;
        let data=await AdminModel.deleteOne({_id:id});
        if(data.deletedCount==0) return res.status(400).json({error:"Data not found"});
        return res.status(200).json({success:"Successfully deleted"})
    } catch (error) {
        console.log(error);
    }
  }
}
module.exports = new SUBADMIN();
