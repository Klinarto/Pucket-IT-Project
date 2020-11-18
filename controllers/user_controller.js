if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var register = function (req, res) {
	const userData = {
		username: req.body.username,
		password: req.body.password,
	};

	collection = req.app.db.collection("GrizzAccount");
	collection.findOne({ username: req.body.username }, (err, user) => {
		if (!user) {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				userData.password = hash;
				collection
					.insertOne(userData)
					.then((user) => {
						res.send("success");
					})
					.catch((err) => {
						res.send("failed");
					});
			});
		} else {
			res.status(400).json({ error: "user already exist" });
		}
	});
};

var login = function (req, res) {
	collection = req.app.db.collection("GrizzAccount");
	collection.findOne({ username: req.body.username }, (err, user) => {
		if (!user || err) {
			res.status(400).json({ msg: "username not found in database" });
		} else {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
					expiresIn: 1440,
				});
				res.json({
					token,
					user: {
						id: user._id,
						username: user.username,
					},
				});
			} else {
				res.status(400).json({ msg: "password is incorrect" });
			}
		}
	});
};

var changePassword = function (req, res) {
	collection = req.app.db.collection("GrizzAccount");
	collection.findOne({ username: req.body.username }, (err, user) => {
		if (!user || err) {
			res.status(400).json({ msg: "username not found in database" });
		} else {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
					if (err) {
						res.status(400).json({ msg: "cannot get new password" });
					}
					else {
						collection.updateOne({username: req.body.username}, {$set:{password: hash}}, (err, user) => {
							if (err) {
								res.status(400).json({ msg: "cannot update" });
							}
							res.send("update successful");
						});
					}
				});
			} else {
				res.status(400).json({ msg: "password is incorrect" });
			}
		}
	});
};

var deleteUser = function (req, res) {
	collection = req.app.db.collection("GrizzAccount");
	collection.deleteOne({ username: req.body.username }, (err, user) => {
		if (err) {
			res.status(400).json({ msg: "error deleting has occured" });
		} else {
			if (user.result.ok == 1 && user.result.n == 1) {
				res.send("delete successful");
			} else {
				res.status(400).send("username not found in the database");
			}
		}
	});
};

var tokenIsValid = async function (req, res) {
	try {
		collection = req.app.db.collection("GrizzAccount");
		const token = req.header("x-auth-token");
		if (!token) {
			return res.json(false);
		}

		const verified = jwt.verify(token, process.env.SECRET_KEY);
		if (!verified) {
			return res.json(false);
		}

		const user = await collection.find({ _id: verified.id });
		if (!user) {
			return res.json(false);
		}
		return res.json(true);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

module.exports.login = login;
module.exports.register = register;
module.exports.tokenIsValid = tokenIsValid;
module.exports.deleteUser = deleteUser;
module.exports.changePassword = changePassword;