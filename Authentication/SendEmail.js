var nodemailer = require("nodemailer");


const sendMail = async (name, email, msg) => {
  try {   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "parikshashikshak@gmail.com",
        pass: "fottdrjdudjpvbbv",
      },
      port: 465,
      host: "gsmtp.gmail.com",
    });

    var mailOptions = {
      from:"parikshashikshak@gmail.com",
      to: email,
      subject: "Parikshashikshak",
      text: "Alert",
      html: '<h1>Hi ' + name + " </h1><p>" + msg + "</p>",
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

module.exports = { sendMail };  
    
  
 