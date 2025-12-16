const { sendMail } = require('../../EmailSender/send');
const otpModel = require('../../Module/Teacher/Otp');
const teacherModel = require("../../Module/Teacher/Teacher");

class OTP {
    async sendOtpRegisterEmail(req, res) {
        try {
            let { email } = req.body;
            let data = await teacherModel.findOne({ Email: email });
            if (!data) {
                return res.status(400).json({ error: `${email} is not register` });
            }
            let otp = ((Math.floor(Math.random() * 1000000)) + 1000000).toString().substring(1);

            let check = await otpModel.findOne({ email: email });
            if (check) {
                check.otp = otp;
                check = await check.save();
            } else {
                check = await otpModel.create({ email: email, otp: otp });
            }

             const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #1e3a8a; color: white; padding: 20px 30px;">
            <h2 style="margin: 0;">ParikshaShikshak</h2>
            <p style="margin: 0; font-size: 14px;">www.parikshashikshak.com</p>
          </div>

          <div style="padding: 30px;">
            <h3>Hello ${data.FirstName},</h3>
            <p style="font-size: 16px;">Thank you for registering with <strong>ParikshaShikshak</strong>.</p>
            <p style="font-size: 16px;">Your One-Time Password (OTP) for email verification is:</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <span style="display: inline-block; background-color: #e0f2fe; color: #0284c7; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;">
                ${otp}
              </span>
            </div>

            <p style="font-size: 14px; color: #6b7280;">Please do not share this OTP with anyone. This code is valid for the next 10 minutes.</p>
            <br/>
            <p style="font-size: 16px;">Regards,<br/>Team ParikshaShikshak</p>
          </div>

          <div style="background-color: #f1f5f9; text-align: center; padding: 15px; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} ParikshaShikshak. All rights reserved.
          </div>
        </div>
      </div>
    `;
            sendMail(email, "Your OTP for Email Verification", htmlContent)
            return res.status(200).json({ success: "Successfully send otp", otp: check.otp })
        } catch (error) {
            console.log(error);
        }
    }

    async verifyEmail(req, res) {
        try {
            let { email, otp } = req.body;
            let data = await otpModel.findOne({ email: email, otp: otp });
            if (!data) return res.status(400).json({ error: "Incurrect otp" });
            return res.status(200).json({ success: "Successfully verify" })
        } catch (error) {
            console.log(error);
        }
    }

    async sendOtpForLogin(req, res) {
        try {
            let { name, email } = req.body;
            let data = await teacherModel.findOne({ Email: email });
            if (!data) return res.status(400).json({ error: `${email} not registered` });
            let otp = ((Math.floor(Math.random() * 1000000)) + 1000000).toString().substring(1);
            let check = await otpModel.findOne({ email: email });
            if (check) {
                check.otp = otp;
                check = await check.save();
            } else {
                check = await otpModel.create({ email: email, otp: otp });
            }
            sendMail(email, "Email Verification", `<h1>${name}</h1><p>This is ${check.otp} otp for login please do not share your otp <h3>Thank you <br/>Team GRM</h3></p>`)
            return res.status(200).json({ success: "Successfully send otp", otp: check.otp })
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new OTP();
