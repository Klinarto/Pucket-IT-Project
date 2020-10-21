const express = require('express');
const contact_me_routes = express.Router();
const contact_me_controller = require('../controllers/contact_me_controller.js');
const recaptcha = require('../middleware/recaptcha.js');


contact_me_routes.get("/contact_me", recaptcha.recaptcha, contact_me_controller.sendContactMe);


module.exports = contact_me_routes;