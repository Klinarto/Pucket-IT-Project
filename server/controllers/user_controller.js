const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var register = function (req, res) {
    const userData = {
        username: req.body.username,
        password: req.body.password
    }

    collection = req.app.db.collection("GrizzAccount");
    collection.findOne({username: req.body.username}, (data) => {
        if (!data) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                collection.insertOne(userData)
                .then(user => {res.send("sucess")})
                .catch(err => {res.send("failed")})
            });
        }
        else {
            res.json({error: "user already exist"});
        }
    });
}

var login = function(req, res) {
    collection = req.app.db.collection("GrizzAccount");
    collection.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            res.status(400).json({msg: "username not found in database"});
        }
        else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let accessToken = jwt.sign({id: user._id}, "supersecret", {
                    expiresIn: 1440
                });
                res.json({
                    accessToken,
                    user: {
                        id: user._id,
                        username: user.username
                    }
                })
            }
            else {
                res.status(400).json({msg: "password is incorrect"})
            }
        }
    });
}

var test = async function(req, res) {
    console.log(req.user);
}

module.exports.login = login;
module.exports.register = register;
module.exports.test = test;