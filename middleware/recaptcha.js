if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const axios = require("axios");

var recaptchaVerify = function (req, res, next) {
	userResponse = req.body.recaptcha;
	axios({
		method: "post",
		url: "https://www.google.com/recaptcha/api/siteverify",
		params: {
			secret: process.env.RECAPTCHA_SECRET,
			response: userResponse,
		},
	}).then((response) => {
		console.log(response);
		console.log(response.data.success);
		if (response.data.success == true) {
			console.log("Recaptcha Valid!");
			next();
		} else {
			console.log("Recaptcha Failed");
		}
	});
};

module.exports.recaptcha = recaptchaVerify;
