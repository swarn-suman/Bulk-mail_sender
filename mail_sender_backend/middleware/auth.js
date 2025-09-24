const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Token comes like "Bearer <token>", so split it
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded.user; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
