const mongo = require("mongodb");
const FormData = require("form-data");
const axios = require("axios");

var addNewEntry = function (req, res) {
  var section = req.body.section;
  var title = req.body.title;
  var description = req.body.description;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var alignment = req.body.alignment;

  const collection = req.app.db.collection(section);

  if (!req.file) {
    console.log("No file uploaded");
    if (section == "hobbies") {
      collection.insertOne({
        title: title,
        description: description,
        image: "",
        alignment: alignment,
      });
    } else {
      collection.insertOne({
        title: title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description: description,
        image: "",
        alignment: alignment,
      });
    }
  } else {
    console.log("image uploaded");

    if (section == "hobbies") {
      collection.insertOne({
        title: title,
        description: description,
        image: "something",
        alignment: alignment,
      });
    } else {
      collection.insertOne({
        title: title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description: description,
        image: "something",
        alignment: alignment,
      });
    }
  }

  res.send("Uploaded!");
};

var editEntry = function (req, res) {
  var section = req.body.section;
  var idString = req.body._id;
  var title = req.body.title;
  var description = req.body.description;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var imageUrl = req.body.imageUrl;
  var alignment = req.body.alignment;

  var id = new mongo.ObjectID(idString);
  const collection = req.app.db.collection(section);

  if (!req.file) {
    console.log("No new photos");
    if (section == "hobbies") {
      collection.updateOne(
        { _id: id },
        {
          $set: {
            title: title,
            description: description,
            image: imageUrl,
            alignment: alignment,
          },
        }
      );
    } else {
      collection.updateOne(
        { _id: id },
        {
          $set: {
            title: title,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            description: description,
            image: imageUrl,
            alignment: alignment,
          },
        }
      );
    }
  } else {
    console.log("New photo uploaded");
    if (section == "hobbies") {
      collection.updateOne(
        { _id: id },
        {
          $set: {
            title: title,
            description: description,
            image: "newPhoto",
            alignment: alignment,
          },
        }
      );
    } else {
      collection.updateOne(
        { _id: id },
        {
          $set: {
            title: title,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            description: description,
            image: "newPhoto",
            alignment: alignment,
          },
        }
      );
    }
  }

  res.send("Edited!");
};

module.exports.addNewEntry = addNewEntry;
module.exports.editEntry = editEntry;
