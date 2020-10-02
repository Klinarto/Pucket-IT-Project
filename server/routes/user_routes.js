const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/user_controller");
const authentication = require('../middleware/auth');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());


router.post("/", user_controller.login);

router.post("/register", user_controller.register);

router.get("/test", authentication.auth, user_controller.test);

// //logout
// router.get('/logout',(req,res)=>{
//  })

module.exports = router;