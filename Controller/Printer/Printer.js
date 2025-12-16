const printerModel = require("../../Module/Printer/Printer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

class PRINTER {
  async registerPrinter(req, res) {
    try {
      let {
        FirstName,
        LastName,
        Mobile,
        Email,
        Country,
        State,
        City,
        Password,
        whatsAppNumber
      } = req.body;
      if (!(FirstName))
        return res.status(400).json({ error: "Please enter first name" });
      if (!(LastName))
        return res.status(400).json({ error: "Please enter last name" });
      if (!(Mobile))
        return res.status(400).json({ error: "Please enter mobile number" });
        if (!(whatsAppNumber))
        return res.status(400).json({ error: "Please enter whatsapp number" });
      if (!(Email))
        return res.status(400).json({ error: "Please enter email id" });
      let checkMobile = await printerModel.findOne({ Mobile: Mobile });
      if (checkMobile)
        return res.status(400).json({ error: `${Mobile} already exits` });
        let checkWhats = await printerModel.findOne({ whatsAppNumber: whatsAppNumber });
        if (checkWhats)
          return res.status(400).json({ error: `${whatsAppNumber} already exits` });
      let checkEmail = await printerModel.findOne({ Email: Email });
      if (checkEmail)
        return res.status(400).json({ error: `${Email} already exits` });
      // if (!(Country))
      //   return res.status(400).json({ error: "Please enter country" });
      // if (!(State))
      //   return res.status(400).json({ error: "Please enter state" });
      // if (!(City))
      //   return res.status(400).json({ error: "Please enter city" });
    //   if (!(Password))
    //     return res.status(400).json({ error: "Please enter password" });
    if(Password){
       Password = await bcrypt.hash(Password, 10);
    }
  
      let data = await printerModel.create({
        FirstName,
        LastName,
        Mobile,
        Email,
        Country,
        State,
        City,
        Password,
        whatsAppNumber
      });
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: "Successfully Registered" });
    } catch (error) {
      console.log(error);
    }
  }

  async loginPrinter(req, res) {
    try {
      let { Email, Password } = req.body;
      let check = await printerModel.findOne({ Email: Email });
      if (!check) {
        check = await printerModel.findOne({ Mobile: Email });
      }
      if (!check)
        return res.status(400).json({ error: `${Email} is not registered` });

      let compare = await bcrypt
        .compare(Password, check.Password)
        .then((res) => {
          return res;
        });

      if (!compare) {
        return res.status(400).send({ error: "Incorrect password" });
      }

      if (check?.isBlock == true)
        return res.status(400).json({ error: "Your account is blocked" });
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
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPrinters(req, res) {
    try {
      let data = await printerModel.find({}).sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getByPrinterId(req, res) {
    try {
      const teacherId = req.params.id;
      let data = await printerModel.findById(teacherId);
      if(data){
        return res.status(200).send({ success: data });
      }
      return res.status(400).json({error: "No data is available!!!"})
    } catch (error) {
      console.log(error);
    }
  }

  async updatePrinter(req, res) {
    try {
      let {
        id,
        FirstName,
        LastName,
        Mobile,
        Email,
        Country,
        State,
        City,
        Password,
        whatsAppNumber
      } = req.body;
      let obj = {};
      if(whatsAppNumber){
        obj["whatsAppNumber"]=whatsAppNumber
      }
      if (FirstName) {
        obj["FirstName"] = FirstName;
      }
      if (LastName) {
        obj["LastName"] = LastName;
      }
      if (Mobile) {
        let checkMobile = await printerModel.findOne({ Mobile: Mobile });
        if (checkMobile)
          return res.status(400).json({ error: `${Mobile} already exits` });
        obj["Mobile"] = Mobile;
      }
      if (Email) {
        let checkEmail = await printerModel.findOne({ Email: Email });
        if (checkEmail)
          return res.status(400).json({ error: `${Email} already exits` });
        obj["Email"] = Email;
      }
      if (Country) {
        obj["Country"] = Country;
      }
      if (State) {
        obj["State"] = State;
      }
      if (City) {
        obj["City"] = City;
      }
      if (Password) {
        obj["Password"] = await bcrypt.hash(Password, 10);
      }
      if (req.files.length != 0) {
        let arr = req.files
        let i
        for (i = 0; i < arr.length; i++) {
            if (arr[i].fieldname == "Profile") {
                obj["Profile"] = await uploadFile2 (arr[i],"profile")
            }
        }}
      let data=await printerModel.findOneAndUpdate({_id:id},{$set:obj},{new:true});
      if(!data) return res.status(400).json({error:"Data not found"});
      return res.status(200).json({success:data,msg:"Successfully Updated"})
    } catch (error) {
      console.log(error);
    }
  }

  async makeBlockAndUnblockPrinters(req,res){
    try {
        let {id,isBlock}=req.body;
        let data=await printerModel.findOneAndUpdate({_id:id},{$set:{isBlock:isBlock}},{new:true});
        if(!data) return res.status(400).json({error:"Something went wrong"});
        return res.status(200).json({success:`Successfully ${data?.isBlock==true ? "Blocked":"Un-Blocked"}`});
    } catch (error) {
        console.log(error);
    }
  }
  
async deletePrinter(req,res){
  try {
     let id=req.params.id;
     let data=await printerModel.deleteOne({_id:id});
     if(data.deletedCount==0) return res.status(400).json({error:"Data not found"});
     return res.status(200).json({success:"Sucessfully deleted"}) 
  } catch (error) {
      console.log(error);
  }
}
}
module.exports = new PRINTER();
