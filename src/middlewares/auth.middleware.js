const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided. Access denied." });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    // Attach user info to the request
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error("Invalid or expired token", err.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
