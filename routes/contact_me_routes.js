
const express = require('express');
const contact_me_routes = express.Router();
const contact_me_controller = require('../controllers/contact_me_controller.js');


contact_me_routes.get("/contact_me", contact_me_controller.sendContactMe);


module.exports = contact_me_routes;