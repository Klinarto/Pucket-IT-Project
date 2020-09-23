const MongoClient = require("mongodb").MongoClient;
var fs = require("fs");

var url = "";
var dbName = "";
var pool = 0;
fs.readFile("mongo.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  dbProperties = JSON.parse(data);
  url = dbProperties.url;
  dbName = dbProperties.dbName;
  pool = dbProperties.poolSize;
});

const client = new MongoClient(url, { poolSize: pool });
var db = null;

function connect() {
  if (db != null) {
    return db;
  }
  client.connect(function (err, connected) {
    //assert err here
    db = connected.db(dbName);
    return db;
  });
}

exports.db = db;
