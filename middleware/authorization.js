const { User } = require('./../models/index');
const jwt = require('jsonwebtoken');
const isAuthenticated = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request"); x``
    }
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let user = await User.findOne({ _id: decoded.userId });
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};
module.exports = isAuthenticated;