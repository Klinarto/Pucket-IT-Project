var addNewEntry = function (req, res) {
  var section = req.body.section;
  var title = req.body.title;
  var description = req.body.description;
  var dateStart = req.body.dateStart;
  var dateEnd = req.body.dateEnd;
  var alignment = req.body.alignment;

  //   if (!req.file) {
  //     console.log("No file uploaded");

  //   } else {

  //   }

  const collection = req.app.db.collection(section);
  collection.insertOne({
    title: title,
    dateStart: new Date(dateStart),
    dateEnd: new Date(dateEnd),
    description: description,
    image: "",
    alignment: alignment,
  });

  res.send("Uploaded!");
};

module.exports.addNewEntry = addNewEntry;
