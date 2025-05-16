const Course = require('../models/course.model');
const CourseRegistration = require('../models/course.registration');
const User = require('../models/user.model');
const Workshop = require('../models/workshop.model');
const { sendMail } = require('../utils/email.transport');
//const sendEmail = require('../utils/email.transport.js')
const Notification = require('../models/notification');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort('title');
    if (!courses) {
      return res.status(404).json({ success: false, message: "Courses not found" });
    }
    res.status(200).json({ success: true, message: "Successfully fetched all courses", courses: courses });
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
    res.status(200).json({ success: true, message: "Successfully fetched course by Id", course: course });
  } catch (error) {
    console.error("Error in fetching this course by Id:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });

  }
}
 
// @desc     Register for a course
exports.registerForCourse = async (req, res) => {
  try {
    const { courseTitle, messageBody } = req.body;
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login."})
    }
    if (!courseTitle) {
      return res.status(400).json({ success: false, message: "Course title is required!" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found!" });
    }
    const alreadyRegistered = await CourseRegistration.findOne({ enrolledUser: userId, course: course._id });
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: "You have already registered for this course!" });
    }
    
    const registration = await CourseRegistration.create({
      course: course._id,
      enrolledUser: userId,
      messageBody
    });
    if (!registration) {
      return res.status(400).json({ success: false, message: "Course registration failed!" });
    }
    user.courses.push(course._id);
    if (!user.hasChosenPath) {
      user.hasChosenPath = true;
    }
    await user.save();

    course.registeredUsers.push(userId);
    await course.save();

    // Send email to user
    const emailData = {
      email: user.email,
      subject: "Course Registration Confirmation",
      text: `Congratulations ${user.firstName}!\n\nYou have successfully registered for the SkillitGh ${course.title} course.`
    };
    await sendMail(emailData);

    // // Send notification to user
    const notification = await Notification.create({
      userId: userId,
      type: 'course',
      message: `${ user.firstName } just registered for the ${ course.title } course.`,
    });
    if (!notification) {
      return res.status(400).json({ success: false, message: "Notification not sent!" });
    }


    res.status(200).json({ success: true, message: "You have successfully enrolled in this course", registration: registration, user: user });
  } catch (error) {
    console.error("Error in registering course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}  

// @desc     Get all registered courses for a user
exports.getRegisteredCourses = async (req, res) => {
  try {
    const { userId } = req.user;
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

    res.status(200).json({ success: true, message: "Successfully fetched all registered courses", courses: courses });
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
    res.status(200).json({ success: true, message: "Successfully fetched all registered users", users: users });
  } catch (error) {
    console.error("Error in fetching registered users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc      Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;
    const courseImage = req.file?.path ;
    if (!title || !duration ) {
      return res.status(400).json({ success: false, message: "course title and duration are required!" });
    }
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({ success: false, message: "Course with this title already exists!" });
    }
    const course = await Course.create({
      title,
      description, 
      courseImage,
      duration,
      price
    });
    
    if (!course) {
      return res.status(400).json({ success: false, message: "Course creation failed!" });
    }
    res.status(201).json({ success: true, message: "Course created successfully", course: course });
  } catch (error) {
    console.error("Error in creating course:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc      GET other courses
exports.getOtherCourses = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login."})
    }
    const availableCourses = await Course.find().sort('createdAt: -1');
    const registrations = await CourseRegistration.find({ enrolledUser: userId }).populate('course');
    if (!registrations || registrations.length === 0) {
      return res.status(200).json({ success: true, message: "Successfully fetched all courses", courses: availableCourses });
    }
    const registrationIds = registrations.map(reg => reg.course._id);
    const courses = await Course.find({ _id: { $nin: registrationIds }}).sort('createdAt: -1'); 

    if (!courses || courses.length === 0) {
      return res.status(404).json({ success: false, message: "No other courses found!" });
    }
    res.status(200).json({ success: true, message: "Successfully fetched other courses", courses: courses });
  } catch (error) {
    console.error("Error in fetching other courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.registerForOtherCourses = async (req, res) => {
  try {
    const { userId } = req.user;
    const { courseId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({ success: false, message: "Course not found!" });
    }
    const alreadyRegistered = await CourseRegistration.findOne({ enrolledUser: userId, course: courseId });
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: "You have already registered for this course." });
    }
    const otherCourse = await CourseRegistration.create({
      enrolledUser: userId,
      course: courseId
    })
    if (!otherCourse) {
      return res.status(400).json({ success: false, message: "Course registration failed!" });
    }
    if (!user.hasChosenPath) {
      user.hasChosenPath = true;
    }
    user.courses.push(courseId);
    await user.save();

    // Send email to user
    const emailData = {
      email: user.email,
      subject: "Course Registration Confirmation",
      text: `Congratulations ${user.firstName}!\n\nYou have successfully registered for the SkillitGh ${existingCourse.title} course.`
    }

    await sendMail(emailData);

    // Send notification to user
    const notification = await Notification.create({
      userId: userId,
      type: 'course',
      message: `${ user.firstName } just registered for the ${ otherCourse.title } course.`,
    });
    if (!notification) {
      return res.status(400).json({ success: false, message: "Notification not sent!" });
    }
    
    res.status(201).json({ success: true, message: "This course is successfully registered", registration: otherCourse, user });

  } catch (error) {
    console.error("Error registering for another course:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc      Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, duration, price } = req.body;
    const courseImage = req.file?.path ;
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required!" });
    }
    // const course = await Course.findById(courseId);
    // if (!course) {
    //   return res.status(404).json({ success: false, message: "Course not found!" });
    // }
    // course.title = title || course.title;
    // course.description = description || course.description;
    // course.duration = duration || course.duration;
    // course.price = price || course.price;
    // if (courseImage) {
    //   course.courseImage = courseImage;
    // }

    const course = await Course.findByIdAndUpdate(courseId, {
      title,
      description,
      duration,
      price,
      courseImage
    }, { new: true, runValidators: true });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found!" });
    }
    
    await course.save();
    res.status(200).json({ success: true, message: "Course updated successfully", course: course });
  } catch (error) {
    console.error("Error in updating the course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc      Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required!" });
    }
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found!" });
    }
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error in deleting the course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.unregisterFromCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login."});
    }
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required!" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found!" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    const registration = await CourseRegistration.findOneAndDelete({ enrolledUser: userId, course: courseId });
    if (!registration) {
      return res.status(404).json({ success: false, message: "You are not registered for this course!" });
    }
    user.courses = user.courses.filter(course => course.toString() !== courseId);
    await user.save();

    res.status(200).json({ success: true, message: "Successfully unregistered from the course", registration: registration });
  } catch (error) {
    console.error("Error in unregistering from course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc      dashboard statistics
exports.getDashboardMetrics = async (req, res) => {
  try {
    const [totalCourses, totalUsers, totalRegistrations, totalWorkshops] = await Promise.all([
      Course.countDocuments(),
      User.countDocuments(),
      CourseRegistration.countDocuments(),
      Workshop.countDocuments(),
    ]);

    const topCourses = await CourseRegistration.aggregate([
      {
        $group: {
          _id: "$course",
          registrationCount: { $sum: 1 }
        }
      },
    {
      $sort: { registrationCount: -1 },
    },
    {
      $limit: 5
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "courseDetails"
      }
    },
    {
      $unwind: "$course"
    },
    {
      $project: {
        _id: 0,
        courseTitle: "$course.courseTitle",
        registrationCount: 1
      }
    }
    ]);

    const userRoles = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({ success: true, message: "Successfully fetched dashboard metics", metrics: {
      totalCourses,
      totalUsers,
      totalRegistrations,
      totalWorkshops,
      topCourses,
      userRoles
    } });
  } catch (error) {
    console.error("Error in fetching dashboard metrics:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getRegisteredCoursesByAdmin = async (req, res) => {
  try {
    const registrations = await CourseRegistration.find().populate('course enrolledUser');
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ success: false, message: "No registered course found!" });
    }

    const registeredUsers = registrations.map(reg => reg.enrolledUser);
    const userCount = registeredUsers.length;
    const courseCount = registrations.reduce((acc, reg) => {
      if (!acc[reg.course._id]) {
        acc[reg.course._id] = 1;
      } else {
        acc[reg.course._id]++;
      }
      return acc;
    }, {});


    res.status(200).json({ success: true, message: "Successfully fetched all registered courses", registrations: registrations });
  } catch (error) {
    console.error("Error in fetching registered courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getRegisteredUsersByAdmin = async (req, res) => {
  try {
    const courses = await Course.find({ registeredUsers: { $exists: true, $ne: [] } }).populate('registeredUsers');
    if (!courses || courses.length === 0) {
      return res.status(404).json({ success: false, message: "No registered users found!" });
    }
    const totalStudents = courses.reduce((acc, course) => acc + course.registeredUsers.length, 0);
    const courseCount = await Course.countDocuments({ registeredUsers: { $exists: true, $not: { $size: 0}}});
    const courseDetails = courses.map(course => ({
      courseTitle: course.title,
      studentCount: course.registeredUsers.length
    }));

    res.status(200).json({ success: true, message: "Successfully fetched all registered users", course: courses, courseDetails,courseCount, totalCount, totalStudents });
  } catch (error) {
    console.error("Error in fetching users for a course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
