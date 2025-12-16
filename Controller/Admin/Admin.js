const AdminModel = require("../../Module/Admin/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmpty, isValidEmail, phonenumber } = require("../../Config/function");
const saltRounds = 10;

class ADMIN {
  async registerAdmin(req, res) {
    try {
      let { name, email, mobile, password } = req.body;
      console.log("first", name, email, mobile, password);
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

      let obj = { mobile, name, email, password: pwd };
      let data = await AdminModel.create(obj);
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: "Successfully register" });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      let check = await AdminModel.findOne({ email: email });

      if (!check)
        return res.status(400).json({ error: `${email} id is not exits` });

      let compare = await bcrypt
        .compare(password, check.password)
        .then((res) => {
          return res;
        });

      if (!compare) {
        return res.status(400).send({ error: "Incurrect password" });
      }
      let token = jwt.sign(
        {
          userId: check._id.toString(),
        },
        "Guru_Resource",
        { expiresIn: "1d" }
      );

      res.header("Authorization", "Bearer : " + token);

      return res
        .status(200)
        .json({ msg: "Successfully login", success: check, token: token });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something Went Wrong!!!!" });
    }
  }
}
module.exports = new ADMIN();
