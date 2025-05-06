const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true  
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  courseImage: {
    type: String,
    trim: true,
    default: "https://ece.ucsd.edu/sites/default/files/assets/New-Course.png"
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);