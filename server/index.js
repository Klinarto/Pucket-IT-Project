const express = require("express");
const app = express();
const port = 5000;

const mongo = require("./mongo.js");
var db = mongo.db;

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/academic-experiences", (req, res) => {
  collection = db.collection("academicExperiences");
  collection.insertOne({ a: 1 });
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
