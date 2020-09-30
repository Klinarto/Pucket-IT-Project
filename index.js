const assert = require("assert");
const fs = require("fs");
const flash = require("flash")();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
const token = require("jsonwebtoken");
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const MongoClient = require("mongodb").MongoClient;
app.use(express.json());

// Serve the static files from the React app
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));

//read json to get config properties, might change over to heroku environment variables
fs.readFile("mongoProperties.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  dbProperties = JSON.parse(data);

  //create new MongoClient with options
  const client = new MongoClient(dbProperties.url, {
    useNewUrlParser: true,
    poolSize: dbProperties.poolSize,
    useUnifiedTopology: true,
  });

  //connect client (must be done before using client to access DB)
  client.connect((err) => {
    if (err) {
      console.error(err);
    }

    //specify DB to access
    app.db = client.db(dbProperties.dbName);

    //call expressJS to listen to port (now that DB is ready)
    app.listen(port, () => {
      console.log(`API site listening at http://localhost:${port}`);
    });
  });
});

app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

//handling express session for passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

app.use(flash);

/*
 * ROUTES START HERE
 */
// Handles any requests that don't match the ones above
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/academic-experiences", (req, res) => {
  collection = req.app.db.collection("academicExperience");
  collection.find({}).toArray((err, docs) => {
    if (err) {
      throw err;
    }
    res.send(docs);
  });
});

app.get("/api/hobbies", (req, res) => {
  collection = req.app.db.collection("hobbies");
  collection.find({}).toArray((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.get("/api/contact", (req, res) => {
  res.send("Contact");
});

app.get("/fuck", (req, res) => {
  collection = req.app.db.collection("GrizzAccount");
  const query = {username: "Grizz", password: "123"};
  const user = collection.findOne(query, function(err,result) {
    if(err) console.log("OH SHIT SOMETHING WRONG");
    res.send(result);
  });
});

const contact_me_routes = require("./routes/contact_me_routes");
app.use("/home", contact_me_routes);

const login_routes = require("./routes/user_routes");
app.use("/login", login_routes);
