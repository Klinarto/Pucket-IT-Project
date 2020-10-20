if (process.env.NODE_ENV !== 'production') {require('dotenv').config()}
const jwt = require('jsonwebtoken');

var auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({msg: "Not authenticated, Please Login"});
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if (!verified) {
            return res.status(401).json({msg: "token verification failed"});
        }
        
        req.user = verified.id;
        next();
    }
    catch (err) {
        res.status(500).json({err: err.message});
    }
};

module.exports.auth = auth;