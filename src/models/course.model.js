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
    default: "https://thaka.bing.com/th/id/OIP.sTchjTmtqEuL0q8yjtNkDQHaGE?rs=1&pid=ImgDetMain"
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);