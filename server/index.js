const express = require("express");
const app = express();
const port = 5000;

var contactMeController = require('./contact_me_controller.js');

app.get("/contact-me", contactMeController.sendContactMe);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/academic-experiences", (req, res) => {
  res.send("Academic Experiences");
});

app.get("/hobbies", (req, res) => {
  res.send("Academic Experiences");
});

app.get("/contact", (req, res) => {
  res.send("Contact");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
