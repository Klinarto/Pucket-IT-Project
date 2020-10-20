if (process.env.NODE_ENV !== 'production') {require('dotenv').config()}
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var sendContactMe = function (req, res) {
  var email = {
    to: [process.env.EMAIL_TO],
    from: "pucket2020@gmail.com",
    subject: "E-Portfolio Contact",
    text: "From: " + req.body.name + "\n" + "Email: " + req.body.email + "\n" + "Message: " + req.body.message
  };

  sgMail
    .send(email)
    .then(() => {
      console.log("Email sent");
      res.send("Email sent");
    })
    .catch((err) => {
      console.log(err);
      res.send("Email failed");
    })
};

module.exports.sendContactMe = sendContactMe;