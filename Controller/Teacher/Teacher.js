// const teacherModel = require("../../Module/Teacher/Teacher");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const saltRounds = 10; 
// const { sendMail } = require('../../Authentication/SendEmail');

// class TEACHER {
//   async registerTeacher(req, res) {
//     try {
//       let {
//         FirstName,
//         LastName,
//         Mobile,
//         Email,
//         Country,
//         State,
//         City,
//         Password,
//         whatsAppNumber,
//         CPassword,
//         termndcond
//       } = req.body;
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const mobileRegex = /^[789]\d{9}$/;
//       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//       if (!(FirstName)) {
//         return res.status(400).json({ error: "Please enter first name" });
//       }
//       if (!(LastName)) {
//         return res.status(400).json({ error: "Please enter last name" });
//       }
//       if (!Mobile || !mobileRegex.test(Mobile)) {
//         return res.status(400).json({ error: "Please enter a valid mobile number" });
//       }
//       if (!whatsAppNumber || !mobileRegex.test(whatsAppNumber)) {
//         return res.status(400).json({ error: "Please enter whatsapp number" });
//       }
//       if (!Email || !emailRegex.test(Email)) {
//         return res.status(400).json({ error: "Please enter a valid email address" });
//       }
//       if (!Password) {
//         return res.status(400).json({ error: "Please enter a password" });
//       }
//       if (!passwordRegex.test(Password)) {
//         return res.status(400).json({ error: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" });
//       }
//       if (Password !== CPassword) {
//         return res.status(400).json({ error: "Password not Match" });
//       }

//       if (!termndcond) {
//         return res.status(400).json({ error: "Accept, I agree the terms and conditions" });
//       }
//       let checkMobile = await teacherModel.findOne({ Mobile: Mobile });
//       if (checkMobile) {
//         return res.status(400).json({ error: `${Mobile} already exits` });
//       }
//       let checkWhats = await teacherModel.findOne({ whatsAppNumber: whatsAppNumber });
//       if (checkWhats) {
//         return res.status(400).json({ error: `${whatsAppNumber} already exits` });
//       }
//       let checkEmail = await teacherModel.findOne({ Email: Email });
//       if (checkEmail) {
//         return res.status(400).json({ error: `${Email} already exits` });
//       }
//       Password = await bcrypt.hash(Password, 10);
//       let data = await teacherModel.create({
//         FirstName,
//         LastName,
//         Mobile,
//         Email,
//         Country,
//         State,
//         City,
//         Password,
//         whatsAppNumber
//       });
//       if (!data) return res.status(400).json({ error: "Something went wrong" });
//       return res.status(200).json({ success: "Successfully Registered" });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async loginTeacher(req, res) {
//     try {
//       let { Email, Password } = req.body;
//       let check = await teacherModel.findOne({ Email: Email });
//       if (!check) {
//         check = await teacherModel.findOne({ Mobile: Email });
//       }
//       if (!check)
//         return res.status(400).json({ error: `${Email} is not registered` });

//       let compare = await bcrypt
//         .compare(Password, check.Password)
//         .then((res) => {
//           return res;
//         });

//       if (!compare) {
//         return res.status(400).send({ error: "Incorrect password" });
//       }

//       if (check?.isBlock == true)
//         return res.status(400).json({ error: "Your account is blocked" });
//       sendMail(check.FirstName, check.Email, "You are successfully login to your account");
//       let token = jwt.sign(
//         {
//           userId: check._id.toString(),
//         },
//         "Guru_Resource",
//         { expiresIn: "1d" }
//       );

//       res.header("Authorization", "Bearer : " + token);

//       return res
//         .status(200)
//         .json({ msg: "Successfully login", success: check, token: token });
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   async getAllTeachers(req, res) {
//     try {
//       let data = await teacherModel.find({}).sort({ _id: -1 });
//       return res.status(200).json({ success: data });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getAllUserById(req, res) {
//     try {
//       const teacherId = req.params.id;
//       let data = await teacherModel.findById(teacherId);
//       if (data) {
//         return res.status(200).send({ success: data });
//       }
//       return res.status(400).json({ error: "No data is available!!!" })
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async updateTeacher(req, res) {
//     try {
//       let {
//         id,
//         FirstName,
//         LastName,
//         Mobile,
//         Email,
//         Country,
//         State,
//         City,
//         Password,
//         whatsAppNumber
//       } = req.body;
//       let obj = {};
//       if (whatsAppNumber) {
//         obj["whatsAppNumber"] = whatsAppNumber
//       }
//       if (FirstName) {
//         obj["FirstName"] = FirstName;
//       }
//       if (LastName) {
//         obj["LastName"] = LastName;
//       }
//       if (Mobile) {
//         let checkMobile = await teacherModel.findOne({ Mobile: Mobile });
//         if (checkMobile)
//           return res.status(400).json({ error: `${Mobile} already exits` });
//         obj["Mobile"] = Mobile;
//       }
//       if (Email) {
//         let checkEmail = await teacherModel.findOne({ Email: Email });
//         if (checkEmail)
//           return res.status(400).json({ error: `${Email} already exits` });
//         obj["Email"] = Email;
//       }
//       if (Country) {
//         obj["Country"] = Country;
//       }
//       if (State) {
//         obj["State"] = State;
//       }
//       if (City) {
//         obj["City"] = City;
//       }
//       if (Password) {
//         obj["Password"] = await bcrypt.hash(Password, 10);
//       }
//       if (req.files.length != 0) {
//         let arr = req.files
//         let i
//         for (i = 0; i < arr.length; i++) {
//           if (arr[i].fieldname == "Profile") {
//             obj["Profile"] = await uploadfile2(arr[i],"Profile")
//           }
//         }
//       }
//       let data = await teacherModel.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true });
//       if (!data) return res.status(400).json({ error: "Data not found" });
//       return res.status(200).json({ success: data, msg: "Successfully Updated" })
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async makeBlockAndUnblockTeachers(req, res) {
//     try {
//       let { id, isBlock } = req.body;
//       let data = await teacherModel.findOneAndUpdate({ _id: id }, { $set: { isBlock: isBlock } }, { new: true });
//       if (!data) return res.status(400).json({ error: "Something went wrong" });
//       return res.status(200).json({ success: `Successfully ${data?.isBlock == true ? "Blocked" : "Un-Blocked"}` });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async deleteTeacher(req, res) {
//     try {
//       let id = req.params.id;
//       let data = await teacherModel.deleteOne({ _id: id });
//       if (data.deletedCount == 0) return res.status(400).json({ error: "Data not found" });
//       return res.status(200).json({ success: "Sucessfully deleted" })
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async updatepassword(req, res) {
//     try {
//       const { Email, Password } = req.body;
//       // Check if the email exists in the database
//       const existingUser = await teacherModel.findOne({ Email: Email });
//       if (!existingUser) {
//         return res.status(400).json({ error: "Email not found" });
//       }
//       // Hash the new password
//       const hashedPassword = await bcrypt.hash(Password, 10);
//       // Update the password in the database
//       const updatedUser = await teacherModel.findOneAndUpdate(
//         { Email: Email },
//         { $set: { Password: hashedPassword } },
//         { new: true }
//       );
//       if (updatedUser) {
//         return res.status(200).json({ success: "Password updated successfully" });
//       } else {
//         return res.status(500).json({ error: "Failed to update password" });
//       }
//     } catch (error) {
//       console.error("Error updating password:", error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }
// module.exports = new TEACHER(); 
 
 
 const teacherModel = require("../../Module/Teacher/Teacher"); 
 const ReferralPricing = require("../../Module/Admin/ReferralPricingSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10; 
const { sendMail } = require('../../Authentication/SendEmail');

class TEACHER {
  // async registerTeacher(req, res) {
  //   try {
  //     let {
  //       FirstName,
  //       LastName,
  //       Mobile,
  //       Email,
  //       Country,
  //       State,
  //       City,
  //       Password,
  //       whatsAppNumber,
  //       CPassword,
  //       termndcond,
  //       referralCode // New field for referral
  //     } = req.body;

  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     const mobileRegex = /^[789]\d{9}$/;
  //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //     // Validation
  //     if (!(FirstName)) {
  //       return res.status(400).json({ error: "Please enter first name" });
  //     }
  //     if (!(LastName)) {
  //       return res.status(400).json({ error: "Please enter last name" });
  //     }
  //     if (!Mobile || !mobileRegex.test(Mobile)) {
  //       return res.status(400).json({ error: "Please enter a valid mobile number" });
  //     }
  //     if (!whatsAppNumber || !mobileRegex.test(whatsAppNumber)) {
  //       return res.status(400).json({ error: "Please enter whatsapp number" });
  //     }
  //     if (!Email || !emailRegex.test(Email)) {
  //       return res.status(400).json({ error: "Please enter a valid email address" });
  //     }
  //     if (!Password) {
  //       return res.status(400).json({ error: "Please enter a password" });
  //     }
  //     if (!passwordRegex.test(Password)) {
  //       return res.status(400).json({ error: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" });
  //     }
  //     if (Password !== CPassword) {
  //       return res.status(400).json({ error: "Password not Match" });
  //     }
  //     if (!termndcond) {
  //       return res.status(400).json({ error: "Accept, I agree the terms and conditions" });
  //     }

  //     // Check for existing records
  //     let checkMobile = await teacherModel.findOne({ Mobile: Mobile });
  //     if (checkMobile) {
  //       return res.status(400).json({ error: `${Mobile} already exits` });
  //     }
  //     let checkWhats = await teacherModel.findOne({ whatsAppNumber: whatsAppNumber });
  //     if (checkWhats) {
  //       return res.status(400).json({ error: `${whatsAppNumber} already exits` });
  //     }
  //     let checkEmail = await teacherModel.findOne({ Email: Email });
  //     if (checkEmail) {
  //       return res.status(400).json({ error: `${Email} already exits` });
  //     }

  //     // Check referral code if provided
  //     let referrerTeacher = null;
  //     if (referralCode) {
  //       referrerTeacher = await teacherModel.findOne({ teacherId: referralCode });
  //       if (!referrerTeacher) {
  //         return res.status(400).json({ error: "Invalid referral code" });
  //       }
  //       if (!referrerTeacher.isReferralActive) {
  //         return res.status(400).json({ error: "Referral code is not active" });
  //       }
  //     }

  //     Password = await bcrypt.hash(Password, 10);
      
  //     // Create teacher data object
  //     let teacherData = {
  //       FirstName,
  //       LastName,
  //       Mobile,
  //       Email,
  //       Country,
  //       State,
  //       City,
  //       Password,
  //       whatsAppNumber
  //     };

  //     // Add referral information if referral code was provided
  //     if (referrerTeacher) {
  //       teacherData.referredBy = referralCode;
  //       teacherData.referredByTeacher = referrerTeacher._id;
  //     }

  //     let data = await teacherModel.create(teacherData);
  //     if (!data) return res.status(400).json({ error: "Something went wrong" });

  //     // If referred by someone, add referral to referrer's account
  //     if (referrerTeacher) {
  //       await referrerTeacher.addReferral(data._id);
        
  //       // Send notification email to referrer
  //       sendMail(
  //         referrerTeacher.FirstName, 
  //         referrerTeacher.Email, 
  //         `Congratulations! ${FirstName} ${LastName} has joined using your referral code.`
  //       );
  //     }

  //     return res.status(200).json({ 
  //       success: "Successfully Registered",
  //       teacherId: data.teacherId,
  //       referralCode: data.referralCode
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }
   
   async registerTeacher(req, res) {
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
        whatsAppNumber,
        CPassword,
        termndcond,
        referralCode,
        bankDetails
      } = req.body;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const mobileRegex = /^[6-9]\d{9}$/;

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

      // Validation
      if (!FirstName) {
        return res.status(400).json({ error: "Please enter first name" });
      }
      if (!LastName) {
        return res.status(400).json({ error: "Please enter last name" });
      }
      if (!Mobile || !mobileRegex.test(Mobile)) {
        return res.status(400).json({ error: "Please enter a valid mobile number" });
      }
      if (!whatsAppNumber || !mobileRegex.test(whatsAppNumber)) {
        return res.status(400).json({ error: "Please enter a valid WhatsApp number" });
      }
      if (!Email || !emailRegex.test(Email)) {
        return res.status(400).json({ error: "Please enter a valid email address" });
      }
      if (!Password) {
        return res.status(400).json({ error: "Please enter a password" });
      }
      if (!passwordRegex.test(Password)) {
        return res.status(400).json({ error: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" });
      }
      if (Password !== CPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      if (!termndcond) {
        return res.status(400).json({ error: "Please agree to the terms and conditions" });
      }
      
      // Bank details validation
      // if (!bankDetails) {
      //   return res.status(400).json({ error: "Bank details are required" });
      // }
      // if (!bankDetails.accountNumber || bankDetails.accountNumber.length < 9 || bankDetails.accountNumber.length > 18) {
      //   return res.status(400).json({ error: "Please enter a valid account number (9-18 digits)" });
      // }
      // if (!bankDetails.ifsc || !ifscRegex.test(bankDetails.ifsc)) {
      //   return res.status(400).json({ error: "Please enter a valid IFSC code" });
      // }
      // if (!bankDetails.bankName || bankDetails.bankName.length < 3) {
      //   return res.status(400).json({ error: "Please enter a valid bank name" });
      // }
      // if (!bankDetails.branchName || bankDetails.branchName.length < 3) {
      //   return res.status(400).json({ error: "Please enter a valid branch name" });
      // }
    

      // Check for existing records
      let checkMobile = await teacherModel.findOne({ Mobile: Mobile });
      if (checkMobile) {
        return res.status(400).json({ error: `${Mobile} already exists` });
      }
      let checkWhats = await teacherModel.findOne({ whatsAppNumber: whatsAppNumber });
      if (checkWhats) {
        return res.status(400).json({ error: `${whatsAppNumber} already exists` });
      }
      let checkEmail = await teacherModel.findOne({ Email: Email });
      if (checkEmail) {
        return res.status(400).json({ error: `${Email} already exists` });
      }

   
      let referrerTeacher = null;
      if (referralCode) {
        referrerTeacher = await teacherModel.findOne({ teacherId: referralCode });
        if (!referrerTeacher) {
          return res.status(400).json({ error: "Invalid referral code" });
        }
        if (!referrerTeacher.isReferralActive) {
          return res.status(400).json({ error: "Referral code is not active" });
        }
      }

      Password = await bcrypt.hash(Password, 10);
      
      // Create teacher data object
      let teacherData = {
        FirstName,
        LastName,
        Mobile,
        Email,
        Country,
        State,
        City,
        Password,
        whatsAppNumber,
        termndcond,
        bankDetails: {
          accountNumber: bankDetails.accountNumber,
          ifsc: bankDetails.ifsc.toUpperCase(),
          bankName: bankDetails.bankName,
          branchName: bankDetails.branchName,
        
        }
      };

      // Add referral information if referral code was provided
      if (referrerTeacher) {
        teacherData.referredBy = referralCode;
        teacherData.referredByTeacher = referrerTeacher._id;
      }

      let data = await teacherModel.create(teacherData);
      if (!data) return res.status(400).json({ error: "Something went wrong" });

      // If referred by someone, add referral to referrer's account
      if (referrerTeacher) {
        await referrerTeacher.addReferral(data._id);
        
        // Send notification email to referrer
        sendMail(
          referrerTeacher.FirstName, 
          referrerTeacher.Email, 
          `Congratulations! ${FirstName} ${LastName} has joined using your referral code.`
        );
      }

      return res.status(200).json({ 
        success: "Successfully Registered",
        teacherId: data.teacherId,
        referralCode: data.referralCode
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } 

async setReferralPricing(req, res) {
  try {
    const { baseReward } = req.body;
    
    // Only allow one active pricing configuration
    await ReferralPricing.updateMany({}, { $set: { active: false } });
    
    const pricing = await ReferralPricing.create({
      baseReward,
     
      active: true
    });
    
    return res.status(200).json({ success: pricing });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async getCurrentPricing(req, res) {
  try {
    const pricing = await ReferralPricing.findOne({ active: true });
    return res.status(200).json({ 
      success: pricing || {
        baseReward: 100,
     
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async getCurrentPricing(req, res) {
  try {
    const pricing = await ReferralPricing.findOne({ active: true });
    return res.status(200).json({ 
      success: pricing || {
        baseReward: 100,
     
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async confirmReferral(req, res) {
  try {
    const { referrerId, referredId } = req.body;
    
    const referrer = await teacherModel.findById(referrerId);
    if (!referrer) {
      return res.status(400).json({ error: "Referrer not found" });
    }
    
    // Get current pricing
    const pricing = await ReferralPricing.findOne({ active: true }) || {
      baseReward: 100,
      bonusPerReferral: 50,
      maxBonus: 500
    };
    
    // Calculate reward amount
    let rewardAmount = pricing.baseReward;
    const referralCount = referrer.referralStats.confirmedReferrals || 0;
    
    // Add bonus for multiple referrals
    if (referralCount > 0) {
      const bonus = Math.min(
        referralCount * pricing.bonusPerReferral,
        pricing.maxBonus - pricing.baseReward
      );
      rewardAmount += bonus;
    }
    
    await referrer.confirmReferral(referredId, rewardAmount);
    
    sendMail(
      referrer.FirstName, 
      referrer.Email, 
      `Your referral has been confirmed! You've earned ${rewardAmount} reward points.`
    );
    
    return res.status(200).json({ 
      success: "Referral confirmed successfully",
      rewardAmount
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
  async loginTeacher(req, res) {
    try {
      let { Email, Password } = req.body;
      let check = await teacherModel.findOne({ Email: Email }).populate('referredByTeacher', 'FirstName LastName referralCode');
      if (!check) {
        check = await teacherModel.findOne({ Mobile: Email }).populate('referredByTeacher', 'FirstName LastName referralCode');
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
      
      sendMail(check.FirstName, check.Email, "You are successfully login to your account");
      
      let token = jwt.sign(
        {
          userId: check._id.toString(),
        },
        "Guru_Resource",
        { expiresIn: "1d" }
      );

      res.header("Authorization", "Bearer : " + token);

      return res.status(200).json({ 
        msg: "Successfully login", 
        success: check, 
        token: token 
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async getAllTeachers(req, res) {
    try {
      let data = await teacherModel.find({})
        .populate('referredByTeacher', 'FirstName LastName teacherId referralCode')
        .populate('referrals.teacherId', 'FirstName LastName teacherId Email')
        .sort({ _id: -1 });
      return res.status(200).json({ success: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async getAllUserById(req, res) {
    try {
      const teacherId = req.params.id;
      let data = await teacherModel.findById(teacherId)
        .populate('referredByTeacher', 'FirstName LastName teacherId referralCode')
        .populate('referrals.teacherId', 'FirstName LastName teacherId Email Mobile')
        .populate('referralRewards.referredTeacher', 'FirstName LastName teacherId');
      
      if (data) {
        return res.status(200).send({ success: data });
      }
      return res.status(400).json({ error: "No data is available!!!" })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // async updateTeacher(req, res) {
  //   try {
  //     let {
  //       id,
  //       FirstName,
  //       LastName,
  //       Mobile,
  //       Email,
  //       Country,
  //       State,
  //       City,
  //       Password,
  //       whatsAppNumber,
  //       isReferralActive
  //     } = req.body;
      
  //     let obj = {};
  //     if (whatsAppNumber) {
  //       obj["whatsAppNumber"] = whatsAppNumber
  //     }
  //     if (FirstName) {
  //       obj["FirstName"] = FirstName;
  //     }
  //     if (LastName) {
  //       obj["LastName"] = LastName;
  //     }
  //     if (Mobile) {
  //       let checkMobile = await teacherModel.findOne({ Mobile: Mobile, _id: { $ne: id } });
  //       if (checkMobile)
  //         return res.status(400).json({ error: `${Mobile} already exits` });
  //       obj["Mobile"] = Mobile;
  //     }
  //     if (Email) {
  //       let checkEmail = await teacherModel.findOne({ Email: Email, _id: { $ne: id } });
  //       if (checkEmail)
  //         return res.status(400).json({ error: `${Email} already exits` });
  //       obj["Email"] = Email;
  //     }
  //     if (Country) {
  //       obj["Country"] = Country;
  //     }
  //     if (State) {
  //       obj["State"] = State;
  //     }
  //     if (City) {
  //       obj["City"] = City;
  //     }
  //     if (Password) {
  //       obj["Password"] = await bcrypt.hash(Password, 10);
  //     }
  //     if (typeof isReferralActive === 'boolean') {
  //       obj["isReferralActive"] = isReferralActive;
  //     }
      
  //     if (req.files && req.files.length != 0) {
  //       let arr = req.files
  //       let i
  //       for (i = 0; i < arr.length; i++) {
  //         if (arr[i].fieldname == "Profile") {
  //           obj["Profile"] = await uploadfile2(arr[i],"Profile")
  //         }
  //       }
  //     }
      
  //     let data = await teacherModel.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true });
  //     if (!data) return res.status(400).json({ error: "Data not found" });
  //     return res.status(200).json({ success: data, msg: "Successfully Updated" })
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // } 
   
  async updateTeacher(req, res) {
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
      whatsAppNumber,
      isReferralActive,
      bankDetails
    } = req.body;
    
    // Validate the incoming data
    if (!id) {
      return res.status(400).json({ error: "Teacher ID is required" });
    }

    let obj = {};
    if (whatsAppNumber) {
      obj["whatsAppNumber"] = whatsAppNumber;
    }
    if (FirstName) {
      obj["FirstName"] = FirstName;
    }
    if (LastName) {
      obj["LastName"] = LastName;
    }
    if (Mobile) {
      let checkMobile = await teacherModel.findOne({ Mobile: Mobile, _id: { $ne: id } });
      if (checkMobile)
        return res.status(400).json({ error: `${Mobile} already exists` });
      obj["Mobile"] = Mobile;
    }
    if (Email) {
      let checkEmail = await teacherModel.findOne({ Email: Email, _id: { $ne: id } });
      if (checkEmail)
        return res.status(400).json({ error: `${Email} already exists` });
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
    if (typeof isReferralActive === 'boolean') {
      obj["isReferralActive"] = isReferralActive;
    }
    if (bankDetails) {
      obj["bankDetails"] = bankDetails;
    }
    
    let data = await teacherModel.findOneAndUpdate(
      { _id: id }, 
      { $set: obj }, 
      { new: true }
    );
    
    if (!data) return res.status(400).json({ error: "Teacher not found" });
    return res.status(200).json({ success: data, msg: "Successfully Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
  async makeBlockAndUnblockTeachers(req, res) {
    try {
      let { id, isBlock } = req.body;
      let data = await teacherModel.findOneAndUpdate({ _id: id }, { $set: { isBlock: isBlock } }, { new: true });
      if (!data) return res.status(400).json({ error: "Something went wrong" });
      return res.status(200).json({ success: `Successfully ${data?.isBlock == true ? "Blocked" : "Un-Blocked"}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteTeacher(req, res) {
    try {
      let id = req.params.id;
      let data = await teacherModel.deleteOne({ _id: id });
      if (data.deletedCount == 0) return res.status(400).json({ error: "Data not found" });
      return res.status(200).json({ success: "Successfully deleted" })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updatepassword(req, res) {
    try {
      const { Email, Password } = req.body;
      const existingUser = await teacherModel.findOne({ Email: Email });
      if (!existingUser) {
        return res.status(400).json({ error: "Email not found" });
      }
      const hashedPassword = await bcrypt.hash(Password, 10);
      const updatedUser = await teacherModel.findOneAndUpdate(
        { Email: Email },
        { $set: { Password: hashedPassword } },
        { new: true }
      );
      if (updatedUser) {
        return res.status(200).json({ success: "Password updated successfully" });
      } else {
        return res.status(500).json({ error: "Failed to update password" });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }



  async getReferralDetails(req, res) {
    try {
      const teacherId = req.params.id;
      let teacher = await teacherModel.findById(teacherId)
        .populate('referrals.teacherId', 'FirstName LastName teacherId Email Mobile createdAt')
        .populate('referralRewards.referredTeacher', 'FirstName LastName teacherId');

      if (!teacher) {
        return res.status(400).json({ error: "Teacher not found" });
      }

      const referralData = {
        referralCode: teacher.referralCode,
        referralStats: teacher.referralStats,
        referrals: teacher.referrals,
        referralRewards: teacher.referralRewards,
        isReferralActive: teacher.isReferralActive,
        referredBy: teacher.referredBy,
        referredByTeacher: teacher.referredByTeacher
      };

      return res.status(200).json({ success: referralData });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // async validateReferralCode(req, res) {
  //   try {
  //     const { referralCode } = req.body;
      
  //     if (!referralCode) {
  //       return res.status(400).json({ error: "Referral code is required" });
  //     } 
       
  //     console.log()

  //     const teacher = await teacherModel.findOne({ referralCode: referralCode });
      
  //     if (!teacher) {
  //       return res.status(400).json({ error: "Invalid referral code" });
  //     }

  //     if (!teacher.isReferralActive) {
  //       return res.status(400).json({ error: "Referral code is not active" });
  //     }

  //     return res.status(200).json({ 
  //       success: "Valid referral code",
  //       referrer: {
  //         name: `${teacher.FirstName} ${teacher.LastName}`,
  //         teacherId: teacher.teacherId
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // } 
 
   
  async validateReferralCode(req, res) {
  try {
    const { referralCode } = req.body;

    console.log("Referral Code Received:", referralCode); // Debug: log referral code received from frontend

    if (!referralCode) {
      return res.status(400).json({ error: "Referral code is required" });
    }

    const teacher = await teacherModel.findOne({ teacherId: referralCode });

    console.log("Matching Teacher:", teacher); // Debug: log the result from DB

    if (!teacher) {
      return res.status(400).json({ error: "Invalid referral code" });
    }

    if (!teacher.isReferralActive) {
      return res.status(400).json({ error: "Referral code is not active" });
    }

    return res.status(200).json({
      success: "Valid referral code",
      referrer: {
        name: `${teacher.FirstName} ${teacher.LastName}`,
        teacherId: teacher.teacherId
      }
    });
  } catch (error) {
    console.log("Error during referral code validation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

  async confirmReferral(req, res) {
    try {
      const { referrerId, referredId, rewardAmount } = req.body;

      const referrer = await teacherModel.findById(referrerId);
      if (!referrer) {
        return res.status(400).json({ error: "Referrer not found" });
      }

      await referrer.confirmReferral(referredId, rewardAmount || 100);

      // Send confirmation email
      sendMail(
        referrer.FirstName, 
        referrer.Email, 
        `Your referral has been confirmed! You've earned ${rewardAmount || 100} reward points.`
      );

      return res.status(200).json({ success: "Referral confirmed successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getReferralLeaderboard(req, res) {
    try {
      const leaderboard = await teacherModel.find({ 'referralStats.totalReferrals': { $gt: 0 } })
        .select('FirstName LastName teacherId referralStats referralCode')
        .sort({ 'referralStats.totalReferrals': -1 })
        .limit(50);

      return res.status(200).json({ success: leaderboard });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateReferralStatus(req, res) {
    try {
      const { teacherId, isReferralActive } = req.body;

      const teacher = await teacherModel.findByIdAndUpdate(
        teacherId,
        { $set: { isReferralActive: isReferralActive } },
        { new: true }
      );

      if (!teacher) {
        return res.status(400).json({ error: "Teacher not found" });
      }

      return res.status(200).json({ 
        success: `Referral system ${isReferralActive ? 'activated' : 'deactivated'} successfully`,
        data: teacher
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getReferralStatistics(req, res) {
    try {
      const stats = await teacherModel.aggregate([
        {
          $group: {
            _id: null,
            totalTeachers: { $sum: 1 },
            totalReferrals: { $sum: '$referralStats.totalReferrals' },
            totalConfirmedReferrals: { $sum: '$referralStats.confirmedReferrals' },
            totalPendingReferrals: { $sum: '$referralStats.pendingReferrals' },
            totalRewards: { $sum: '$referralStats.totalRewards' },
            activeReferrers: {
              $sum: {
                $cond: [{ $gt: ['$referralStats.totalReferrals', 0] }, 1, 0]
              }
            }
          }
        }
      ]);

      return res.status(200).json({ success: stats[0] || {} });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new TEACHER();