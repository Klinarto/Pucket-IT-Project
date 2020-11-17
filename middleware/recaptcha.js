if (process.env.NODE_ENV !== 'production') {require('dotenv').config()}
const axios = require("axios");

var recaptchaVerify = function (req, res, next) {
    userResponse =  req.body.recaptcha
    axios({
        method: "post",
        url: "https://www.google.com/recaptcha/api/siteverify",
        params: {
            secret: process.env.RECAPTCHA_SECRET,
            response: userResponse
        }
    }).then((response) => {
        console.log(response)
        console.log(response.data.success)
        if (response.data.success == true) {
            res.status(200).send("Recaptcha Valid!");
            console.log("succes bert")
            next();
        } else {
            console.log("fail")
            res.status(401).send("Recaptcha Failed");
        }
    });
}

module.exports.recaptcha = recaptchaVerify;