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
  courseImagePublicId: {
    type: String,
    trim: true,
    default: ""
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
    trim: true,
    default: "8 weeks"
  },
  instructor: {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "John Doe"
    },
    email: {
      type: String,
      required: true,
      trim: true,
      default: "example@com"
    }
  },
  registeredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);