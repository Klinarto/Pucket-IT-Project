const assert = require("assert");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const cors = require("cors");
app.use(cors());

const MongoClient = require("mongodb").MongoClient;

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

/*
 * ROUTES START HERE
 */
const profile_routes = require("./routes/profile_routes");
app.use("/api", profile_routes);

const admin_routes = require("./routes/admin_routes");
app.use("/admin", admin_routes);

// Handles any requests that don't match the ones above
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
