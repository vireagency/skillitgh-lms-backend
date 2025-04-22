const Course = require('../models/course.model');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort('title');
    if (!courses) {
      return res.status(404).json({ success: false, message: "Courses not found" });
    }
    res.status(200).json({ success: true, message: "Courses found!", courses });
  } catch (error) {
    console.error("Error in getting all courses", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ success: true, message: "Successfully fetched course by Id", course });
  } catch (error) {
    console.error("Error in fetching this course by Id:", error);
    res.status(500).sjon({ success: false, message: "Internal Server Error" });
  }
}

exports.registerForCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.enrolledUsers.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: "You are already enrolled in this course." });
    }
    course.enrolledUsers.push(req.user._id);
    await course.save();
    res.status(200).json({ success: true, message: "You have successfully enrolled in this course", course})
  } catch (error) {
    console.error("Error in registering course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, duration } = req.body;
    if (!title || !description || !instructor || !duration) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    
  } catch (error) {
    console.error("Error creating new course", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}