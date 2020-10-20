if (process.env.NODE_ENV !== 'production') {require('dotenv').config()}
const fs = require("fs");
const mongo = require("mongodb");
const FormData = require("form-data");
const axios = require("axios");

var refreshAccess = function (db, callback) {
  var id = new mongo.ObjectID(process.env.DB_TOKEN);
  var formData = new FormData();
  formData.append("refresh_token", process.env.REFRESH_TOKEN);
  formData.append("client_id", process.env.CLIENT_ID);
  formData.append("client_secret", process.env.CLIENT_SECRET);
  formData.append("grant_type", "refresh_token");

  axios
    .post("https://api.imgur.com/oauth2/token", formData, {
      headers: formData.getHeaders(),
    })
    .then((response) => {
      var accessToken = response.data.access_token;

      db.collection("authToken").updateOne(
        { _id: id },
        {
          $set: {
            token: accessToken,
          },
        },
        (err, result) => {
          if (err) {
            console.log(err);
            console.log("DB not updated.");
            callback(500);
          } else {
            callback(response.status);
          }
        }
      );
      return;
    })
    .catch((err) => {
      console.log("Imgur request failed.");
      console.log(err);
      callback(err.status);
      return;
    });
};

var imgurUpload = function (db, imagePath, callback) {
  var id = new mongo.ObjectID(process.env.DB_TOKEN);
  db.collection("authToken")
    .findOne({ _id: id })
    .then((result) => {
      var accessToken = result.token;
      if (accessToken == null) {
        //return null
        callback(null);
        return;
      }

      var formData = new FormData();
      formData.append("image", fs.createReadStream(imagePath));
      axios
        .post("https://api.imgur.com/3/upload", formData, {
          headers: {
            Authorization: "Bearer " + accessToken,
            ...formData.getHeaders(),
          },
        })
        .then((response) => {
          console.log(response);
          var imageUrl = response.data.data.link;
          console.log(imageUrl);
          //return imageUrl;
          callback(imageUrl);
          return;
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 401) {
              //NOTE: FIX TO MAKE USE OF CALLBACK
              accessToken = refreshAccess(db);
              if (accessToken == null) {
                //return err;
                callback(null);
                return;
              } else {
                imgurUpload(db, imagePath, callback);
              }
            } else {
              console.log(err.response);
              //return err;
              callback(null);
              return;
            }
          }
        });
    });
};

var imgurDelete = function (db, imageHash) {
  var id = new mongo.ObjectID(process.env.DB_TOKEN);
  db.collection("authToken")
    .findOne({ _id: id })
    .then((result) => {
      if (result.token == null) {
        console.log("result.token: ", result.token);
        return null;
      }
      var accessToken = result.token;
      var url = "https://api.imgur.com/3/image/" + imageHash;
      axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          return response.status;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    });
};

module.exports.refreshAccess = refreshAccess;
module.exports.imgurUpload = imgurUpload;
module.exports.imgurDelete = imgurDelete;
