const { default: axios } = require("axios");
var nodemailer = require("nodemailer");

// 	  user: "donotreply@mitrakart.com",
// pass: "MITRAKART@123",
// yzbzpllsthbvrdal

const sendMail = async ( email,subject, msg) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "parikshashikshak@gmail.com",
        pass: "fottdrjdudjpvbbv ",
      },
      port: 465,
      host: "gsmtp.gmail.com",
    });

    var mailOptions = {
      from: "parikshashikshak@gmail.com",
      to: email,
      subject: subject,
      text: "Alert",
      html: msg,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
const sendSMS=async (mobile, msg)=>{
  try {
    const body = `Dear Customer, is the OTP to register as a Customer. OTPs are secret. Please DO NOT disclose it to anyone. Team Mitrakart`;
    const formUrlEncoded = (x) =>
    Object.keys(x).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
      ""
    );
    let url =
    "https://" +
    process.env.otpKey +
    ":" +
    process.env.token +
    "@api.exotel.in/v1/Accounts/" +
    process.env.sid +
    "/Sms/send.json";

    axios
    .post(
      url,
      formUrlEncoded({
        From: process.env.registeredMobile,
        To: mobile,
        Body: msg,
        DltEntityId: "1001332735606324744",
      }),
      {
        withCredentials: true,
        headers: {
          Accept: "application/x-www-form-urlencoded",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ) .then(async (data) => {
        console.log(`statusCode: ${data.status}`);
        console.log(data);

      })
      .catch((error)=>{
        console.log(error);
      })

  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMail,sendSMS };
