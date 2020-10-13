const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

// var upload = multer({ dest: './public/data/uploads/' })
// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
//    // req.file is the name of your file in the form above, here 'uploaded_file'
//    // req.body will hold the text fields, if there were any
//    console.log(req.file, req.body)
// });

var upload = multer({
  dest: "/app/uploads",
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

const admin = require("../controllers/admin_controller.js");
router.post("/upload", upload.single("image"), admin.addNewEntry);
router.post("/edit", upload.single("image"), admin.editEntry);

router.get("/refresh", admin.refreshToken);
module.exports = router;
