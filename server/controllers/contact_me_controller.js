const sgMail = require('@sendgrid/mail')

sgMail.setApiKey("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")

var sendContactMe = function (req, res) {
  var email = {
    to: ["celivi8932@zik2zik.com"],
    from: "pucket2020@gmail.com",
    subject: "E-Portfolio Contact",
    text: "From: " + req.body.name + "\n" + "Email: " + req.body.email + "\n" + "Message: " + req.body.message
  };

  sgMail
    .send(email)
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => {
      console.log(err);
    })
};

module.exports.sendContactMe = sendContactMe;