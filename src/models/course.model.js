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
  },
  price: {
    type: String,
    required: true,
    trim: true,
    default: "Free"
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);