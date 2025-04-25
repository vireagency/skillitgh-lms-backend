const Course = require('../models/course.model');
const CourseRegistration = require('../models/course.registration');
const User = require('../models/user.model');

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
    res.status(500).json({ success: false, message: "Internal Server Error" });

  }
}
 
// @desc     Register for a course
exports.registerForCourse = async (req, res) => {
  try {
    const { courseId, text } = req.body;
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login."})
    }
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required!" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found!" });
    }
    const alreadyRegistered = await CourseRegistration.findOne({ enrolledUser: userId, course: courseId });
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: "You have already registered for this course!" });
    }
    
    const registration = await CourseRegistration.create({
      course: courseId,
      enrolledUser: userId,
      text
    });

    res.status(200).json({ success: true, message: "You have successfully enrolled in this course", data: registration })
  } catch (error) {
    console.error("Error in registering course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}  

// @desc     Get all registered courses for a user
exports.getRegisteredCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login."})
    }
    const registrations = await CourseRegistration.find({ enrolledUser: userId }).populate('course');
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ success: false, message: "No registered course found!" });
    }
    const registrationIds = registrations.map(reg => reg.course._id);
    const courses = await Course.find({ _id: { $in: registrationIds }}).sort('createdAt:-1');

    if (!courses || courses.length === 0) {
      return res.status(404).json({ success: false, message: "No registered courses found!" });
    }

    res.status(200).json({ success: true, message: "Successfully fetched all registered courses", data: courses });
  } catch (error) {
    console.error("Error in fetching registered courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc     Get all registered users for a course
exports.getRegisteredUsers = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required!" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found!" });
    }
    const registrations = await CourseRegistration.find({ course: courseId }).populate('enrolledUser');
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ success: false, message: "No users found for this course!" });
    }
    const registrationIds = registrations.map(reg => reg.enrolledUser);

    const users = await User.find({ _id: { $in: registrationIds }}).sort('createdAt:-1');

    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: "No registered users found!" });
    }
    res.status(200).json({ success: true, message: "Successfully fetched all registered users", data: users });
  } catch (error) {
    console.error("Error in fetching registered users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc      Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Course title is required!" });
    }
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({ success: false, message: "Course with this title already exists!" });
    }
    const course = await Course.create({
      title,
      description
    });
    res.status(201).json({ success: true, message: "Course created successfully", data: course });
  } catch (error) {
    console.error("Error in creating course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc      GET other courses
exports.getOtherCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login."})
    }
    const registrations = await CourseRegistration.find({ enrolledUser: userId }).populate('course');
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ success: false, message: "No registered courses found!" });
    }
    const registrationIds = registrations.map(reg => reg.course._id);
    const courses = await Course.find({ _id: { $nin: registrationIds }}).sort('createdAt: -1'); 

    if (!courses || courses.length === 0) {
      return res.status(404).json({ success: false, message: "No other courses found!" });
    }
    res.status(200).json({ success: true, message: "Successfully fetched other courses", data: courses });
  } catch (error) {
    console.error("Error in fetching other courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}