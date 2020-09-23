const express = require("express");
const app = express();
const port = 5000;

const mongo = require("mongodb");

var fs = require("fs");
var uri = "";
fs.readFile("mongo.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  uri = data;
});
const client = new mongo(uri);

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/academic-experiences", (req, res) => {
  res.send("Academic Experiences");
});

app.get("/api/hobbies", (req, res) => {
  res.send("Academic Experiences");
});

app.get("/api/contact", (req, res) => {
  res.send("Contact");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
