const passport = require('passport');
const jwt = require('jsonwebtoken');

var ensureVerified = function (req, res, next) {
    res.send(req);
}

module.exports.ensureVerified = ensureVerified;