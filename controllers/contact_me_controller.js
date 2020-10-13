var nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

var options = {
  auth: {
    api_key:
      "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",
  },
};

var sendContactMe = function (req, res) {
  const mailer = nodemailer.createTransport(sendGridTransport(options));
  var email = {
    to: ["dimi3laksamana@gmail.com"],
    from: "pucket2020@gmail.com",
    subject: "E-Portfolio Contact",
    text: "From: " + req.body.name + "\n" + "Email: " + req.body.email + "\n" + "Message: " + req.body.message
  };
  mailer.sendMail(email, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
  res.send("Message Sent!");
};

module.exports.sendContactMe = sendContactMe;

