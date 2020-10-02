require("dotenv").config();
const mongo = require("mongodb");
const FormData = require("form-data");
const axios = require("axios");

var refreshAccess = function (db) {
    var id = new mongo.ObjectID(process.env.DB_TOKEN);
    var formData = new FormData();
    formData.append("refresh_token", process.env.REFRESH_TOKEN);
    formData.append("client_id", process.env.CLIENT_ID);
    formData.append("client_secret", process.env.CLIENT_SECRET);
    formData.append("grant_type", "refresh_token");
    axios.post("https://api.imgur.com/oauth2/token", formData).then((response) => {
        var accessToken = response.data.access_token;
        if (accessToken == null) {
            console.log("accessToken: ", accessToken);
            return null;
        }

        db.collection("authToken").updateOne({_id = id }, {
            $set: {
                token: accessToken
            }
        });

        return accessToken;
    });
}


var imgurUpload = function (db, imagePath) {
    var id = new mongo.ObjectID(process.env.DB_TOKEN);
    db.collection("authToken").findOne({_id = id}).then((result) => {
        if (result.token == null) {
            console.log("result.token: ", result.token);
            return null;
        }
        var accessToken = result.token;

        var formData = new FormData();
        formData.append("image", fs.createReadstream(imagePath));
        axios.post("https://api.imgur.com/3/upload", formData, {
            headers: {
                Authorization: "Bearer " +  accessToken,
                ... formData.getHeaders()
            }
        }).then((response) => {
            var imageUrl = response.data.data.link;
            return imageUrl;
        }).catch((err) => {
            if (err.response) {
                if (err.response.status == 401) {
                    accessToken = refreshAccess(db)
                    if (accessToken == null) {
                        return null;
                    } else {
                        imgurUpload(db, imagePath);
                    }
                } else {
                    console.log(err.response);
                    return null;
                }
            }
        });
    });    
}

var imgurDelete = function (db, imageHash) {
    var id = new mongo.ObjectID(process.env.DB_TOKEN);
    db.collection("authToken").findOne({_id = id}).then((result) => {
        if (result.token == null) {
            console.log("result.token: ", result.token);
            return null;
        }
        var accessToken = result.token;
        var url = "https://api.imgur.com/3/image/" + imageHash;
        axios.delete(url, {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        }).then((response) => {

        }).catch((err) => {
            
        });
    });
}