const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.auth = async (req, res, next) => {
  try {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1]; // Get token from cookies or authorization header
    if (!accessToken) {
      return res.status(401).json({ success: false, message: "Access denied. Please log in." });
    }
    // verify token
    jwt.verify(accessToken, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Access denied! Please log in again." })
      }
      const user = User.findById(decoded.id);
      if (!user || decoded.tokenVersion !== user.tokenVersion) {
        return res.status(401).json({ success: false, message: "Access denied! Please log in again." })
      }
      req.user = { userId: decoded.id, role: decoded.role }; // Attach user ID and role to request object

      next();
    });
  } catch (err) {
    console.error("Invalid or expired token", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
