const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. Please log in." });
    }
    // verify token
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Access denied! Please log in again." })
      }
      req.user = User.findById(decoded.id);
      console.log("Decoded token:", decoded); // Log the decoded token for debugging
    });
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Access denied! Please log in again." });
    }
    console.log("User found:", req.user); // Log the user for debugging
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Invalid or expired token", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
