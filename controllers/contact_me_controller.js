const express = require("express");
var nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

var options = {
  auth: {
    api_key:
      "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",
  },
};

const mailer = nodemailer.createTransport(sendGridTransport(options));

var sendContactMe = function (req, res) {
  var email = {
    to: ["lonekad729@debsmail.com"],
    from: "pucket2020@gmail.com",
    subject: "E-Portfolio Contact",
    html: "<b>Awesome sauce</b>",
  };
  mailer.sendMail(email, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
  res.send("Message sent!");
};

module.exports.sendContactMe = sendContactMe;
