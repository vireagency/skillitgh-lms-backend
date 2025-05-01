const mongoose = require('mongoose');

workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  workshopImage: {
    type: String,
    trim: true,
    default: "https://asset.cloudinary.com/dc7waspih/5298eb1df4079707814dcf1b435a0af7"
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  facilitator: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
  },
  resource: [String],
  location: {
    type: String,
    required: true,
    trim: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

module.exports = mongoose.model('Workshop', workshopSchema);