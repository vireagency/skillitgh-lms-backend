const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

const { auth } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

/** @route    GET api/v1/courses/
 * @desc      Fetch all courses 
 * @access    Public
*/
router.get('/courses', auth, courseController.getCourses);

/** @route    GET api/v1/courses/:courseId/
 * @desc      Fetch a course by ID
 * @access    Public
 */
router.get('/:courseId', auth, courseController.getCourseById);

/** @route    POST api/v1/courses/:courseId/register/ 
 * @desc      Register for a course
 * @access    Private
 */
router.post('/courses/register', auth, courseController.registerForCourse);

/** @route    POST api/v1/courses/ 
 * @desc      Create a new course
 * @access    Private (admin only)
 */
router.post('/courses', auth, authorizeRole('admin'), courseController.createCourse);

/** @route    GET api/v1/dashboard/registeredCourses
 * @desc      GET all registered courses for a user
 * @access    Private
 */
router.get('/dashboard/registeredCourses', auth, courseController.getRegisteredCourses);

/** @route    GET api/v1/dashboard/registeredUsers
 * @desc      GET all registered users for a course
 * @access    Private (admin only)
 */
router.get('/dashboard/:courseId/registeredUsers', auth, authorizeRole('admin'), courseController.getRegisteredUsers);


/** @route    GET api/v1/dashboard/otherCourses
 * @desc      GET all other courses
 * @access    Private 
 */
router.get('/dashboard/otherCourses', auth, courseController.getOtherCourses);

module.exports = router;