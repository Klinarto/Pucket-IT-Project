const multer = require("multer");

// var upload = multer({ dest: './public/data/uploads/' })
// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
//    // req.file is the name of your file in the form above, here 'uploaded_file'
//    // req.body will hold the text fields, if there were any
//    console.log(req.file, req.body)
// });

var upload = multer({
  fileFilter: checkImage,
});

function checkImage(req, file, callback) {
  //allowed filetypes
  const filetypes = /jpg|jpeg|png|gif/;
  // Check ext
  const extension = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime
  const mime = filetypes.test(file.mimetype);

  //if both checks pass
  if (extension && mime) {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

var addNewEntry = new (function (req, res) {
  if (!req.file) {
    console.log("No file uploaded");
  }

  var section = req.body.section;
  var title = req.body.title;
  var description = req.body.description;
  var dateStart = req.body.startDate;
  var dateEnd = req.body.endDate;

  const collection = req.app.db.collection(section);
  collection.
})();
