const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/user_controller");
const authentication = require('../middleware/auth');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());


router.post("/login", user_controller.login);

router.post("/register", user_controller.register);

router.post("/tokenIsValid", user_controller.tokenIsValid);

module.exports = router;