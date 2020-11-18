const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/user_controller");


router.post("/login", user_controller.login);

router.post("/register", user_controller.register);

router.post("/changePassword", user_controller.changePassword);

router.post("/delete", user_controller.deleteUser);

router.post("/tokenIsValid", user_controller.tokenIsValid);

module.exports = router;

