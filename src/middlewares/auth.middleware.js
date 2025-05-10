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
      req.user = { userId: decoded.id, role: decoded.role }; // Attach user ID and role to request object
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized: Please log in again." });
      }
      console.log("Decoded token:", decoded); // Log the decoded token for debugging
      console.log("User found:", req.user); // Log the user for debugging
      next();
    });
  } catch (err) {
    console.error("Invalid or expired token", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
