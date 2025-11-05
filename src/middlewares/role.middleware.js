const authorizeRole = (access) => {
  return (req, res, next) => {
    try {
      const { role } = req.user;
      // Check if the user is authenticated
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized. Please log in." });
      }
      // check if role is present in the request
      if (!role) {
        return res
          .status(403)
          .json({ success: false, message: "Access denied. Role not found." });
      }

      //Alternatively, you can check if the user is an admin and allow access

      // Check if the user is an admin
      // if (access === "admin") {
      //   return next();
      // }

      // res.status(403).json({ message: "Access denied. You do not have the required permissions." });

      // Check if the user role matches the required role
      if (role !== access) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You do not have the required permissions.",
        });
      }
      next();
    } catch (err) {
      console.error("Authorization error: ", err.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
};

module.exports = { authorizeRole };
