const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/academic-experiences", (req, res) => {
  collection = req.app.db.collection("academicExperience");
  collection.find({}, { sort: { dateStart: -1 } }).toArray((err, docs) => {
    if (err) {
      throw err;
    }
    res.send(docs);
  });
});

router.get("/hobbies", (req, res) => {
  collection = req.app.db.collection("hobbies");
  collection.find({}).toArray((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports = router;
