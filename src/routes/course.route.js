const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

const { auth } = require('../middlewares/auth.middleware');
//const { role } = require('../middlewares/role.middleware');

// Route to get all courses
router.get('/courses/', auth, courseController.getCourses);

// Route to get a course by ID
router.get('/courses/:courseId', auth, courseController.getCourseById);

// Route to register for a course
router.post('/courses/:courseId/register', auth, courseController.registerForCourse);

// Route to create a new course (admin only)
router.post('/courses/', auth, courseController.createCourse);

module.exports = router;