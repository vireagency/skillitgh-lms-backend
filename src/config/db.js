const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
exports.connectDB = () => {
  mongoose.connect(process.env.DB_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.log("MongoDB connection failed!", err))
}