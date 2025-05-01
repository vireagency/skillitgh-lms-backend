const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrolledUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messageBody: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("CourseRegistration", courseRegistrationSchema);
