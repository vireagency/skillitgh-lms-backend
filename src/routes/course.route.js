const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

const { auth } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

/** @route    GET api/v1/courses/
 * @desc      Fetch all courses 
 * @access    Public
*/
router.get('/courses/', auth, courseController.getCourses);

/** @route    GET api/v1/courses/:courseId/
 * @desc      Fetch a course by ID
 * @access    Public
 */
router.get('/courses/:courseId', auth, courseController.getCourseById);

/** @route    POST api/v1/courses/:courseId/register/ 
 * @desc      Register for a course
 * @access    Private
 */
router.post('/courses/:courseId/register', auth, courseController.registerForCourse);

/** @route    POST api/v1/courses/ 
 * @desc      Create a new course
 * @access    Private (admin only)
 */
router.post('/courses/', auth, authorizeRole('admin'), courseController.createCourse);

module.exports = router;