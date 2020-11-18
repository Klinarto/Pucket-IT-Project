if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const mongo = require("mongodb");

const imgur = require("./imgur_controller");

var refreshToken = function (req, res) {
	db = req.app.db;
	imgur.refreshAccess(db, (status) => {
		if (status == 200) {
			res.status(200).send("Refreshed Token!");
		} else {
			res.status(500).send("Something went wrong. Token not refreshed");
		}
	});
};

var addNewEntry = async function (req, res) {
	var section = req.body.section;
	var title = req.body.title;
	var description = req.body.description;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var alignment = req.body.alignment;

	const collection = req.app.db.collection(section);

	if (!req.file) {
		console.log("No file uploaded");
		switch (section) {
			case "hobbies":
				collection.insertOne({
					title: title,
					description: description,
					image: "",
					alignment: alignment,
				});
				break;
			case "academicExperience":
				collection.insertOne({
					title: title,
					startDate: new Date(startDate),
					endDate: new Date(endDate),
					description: description,
					image: "",
					alignment: alignment,
				});
				break;
			default:
				res.status(400).send("Bad Request (section)");
				return;
		}
		res.status(200).send("Uploaded!");
	} else {
		console.log("image uploaded");

		imgur.imgurUpload(req.app.db, req.file.path, (imageURL) => {
			if (imageURL == null) {
				console.log("Some error occurred imageURL null");
				res.status(400).send("Some error occurred! imageURL null");
			} else {
				console.log("Image uploaded!");
				switch (section) {
					case "hobbies":
						collection.insertOne({
							title: title,
							description: description,
							image: imageURL,
							alignment: alignment,
						});
						break;
					case "academicExperience":
						collection.insertOne({
							title: title,
							startDate: new Date(startDate),
							endDate: new Date(endDate),
							description: description,
							image: imageURL,
							alignment: alignment,
						});
						break;
					default:
						res.status(400).send("Bad Request (section)");
						return;
				}
				res.status(200).send("Uploaded!");
			}
		});
	}
};

//editEntry
var editEntry = function (req, res) {
	var section = req.body.section;
	var idString = req.body._id;
	var title = req.body.title;
	var description = req.body.description;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var imageUrl = req.body.image;
	var alignment = req.body.alignment;

	var id;
	if (section == "hobbies" || section == "academicExperience") {
		id = new mongo.ObjectID(idString);
	}
	const collection = req.app.db.collection(section);

	if (!req.file) {
		console.log("No new photos");
		switch (section) {
			case "homepage":
				collection.updateOne(
					{ _id: parseInt(idString) },
					{
						$set: {
							title: title,
							description: description,
							image: imageUrl,
						},
					}
				);
				break;
			case "aboutMe":
				collection.updateOne(
					{},
					{
						$set: {
							title: title,
							description: description,
						},
					}
				);
				break;
			case "hobbies":
				collection.updateOne(
					{ _id: id },
					{
						$set: {
							title: title,
							description: description,
							image: imageUrl,
							alignment: alignment,
						},
					}
				);
				break;
			case "academicExperience":
				collection.updateOne(
					{ _id: id },
					{
						$set: {
							title: title,
							startDate: new Date(startDate),
							endDate: new Date(endDate),
							description: description,
							image: imageUrl,
							alignment: alignment,
						},
					}
				);
				break;
			default:
				res.status(400).send("Bad Request (section)");
				return;
		}

		res.status(200).send("Edited, no new picture!");
	} else {
		console.log("New photo uploaded");

		//delete previous photo
		collection.findOne({ _id: id }).then((result) => {
			if (result.image == null) {
				console.log("none found");
			} else {
				var oldImage = result.image;
				var imgurRegex = /(http(s*)):\/\/i.imgur.com\/([a-zA-Z0-9_\s]*)\./;
				var match = imgurRegex.exec(oldImage);
				var imageHash = match[3];

				imgur.imgurDelete(req.app.db, imageHash);
			}
		});

		//upload new photo
		var imagePath = req.file.path;
		imgur.imgurUpload(req.app.db, imagePath, (imageURL) => {
			if (!imageURL) {
				console.log("Image upload failed.");
				res.status(400).send("Image upload failed. No edits are made");
			} else {
				switch (section) {
					case "homepage":
						collection.updateOne(
							{ _id: parseInt(idString) },
							{
								$set: {
									title: title,
									description: description,
									image: imageUrl,
								},
							}
						);
						break;
					case "hobbies":
						collection.updateOne(
							{ _id: id },
							{
								$set: {
									title: title,
									description: description,
									image: imageUrl,
									alignment: alignment,
								},
							}
						);
						break;
					case "academicExperience":
						collection.updateOne(
							{ _id: id },
							{
								$set: {
									title: title,
									startDate: new Date(startDate),
									endDate: new Date(endDate),
									description: description,
									image: imageUrl,
									alignment: alignment,
								},
							}
						);
						break;
					default:
						res.status(400).send("Bad Request (section)");
						return;
				}
				res.status(200).send("Edited!");
			}
		});
	}
};

var deleteEntry = function (req, res) {
	var section = req.body.section;
	var idString = req.body._id;

	var id = new mongo.ObjectID(idString);
	const collection = req.app.db.collection(section);

	//find current entry and get photo url to delete
	collection.findOne({ _id: id }).then((result) => {
		if (result.image == null) {
			console.log("no picture URL found");
		} else {
			var oldImage = result.image;
			var imgurRegex = /(http(s*)):\/\/i.imgur.com\/([a-zA-Z0-9_\s]*)\./;
			var match = imgurRegex.exec(oldImage);
			var imageHash = match[3];

			imgur.imgurDelete(req.app.db, imageHash);
		}
		
		//delete MongoDB document here
		collection.deleteOne({ _id: id }).then((deleteConfirm) => {
			if (deleteConfirm == null) {
				res.status(500).send("An error occured");
			} else {
				res.status(200).send("Entry deleted!");
			}
		});
	});
};

module.exports.refreshToken = refreshToken;
module.exports.addNewEntry = addNewEntry;
module.exports.editEntry = editEntry;
module.exports.deleteEntry = deleteEntry;
