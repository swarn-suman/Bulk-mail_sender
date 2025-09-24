const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  let token = req.header("Authorization");
  console.log("Incoming Authorization header:", token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

   if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user from token:", decoded);
    req.user = decoded; // now req.user.id is available
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = auth;