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

/**
 * @swagger
 * /api/v1/courses/register/:
 *   post:
 *     summary: Register a course
 *     description: This endpoint allows a user to register a course by selecting the course and optionally typing a reason.
 *     tags: ["Courses"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course to register for.
 *                 example: "1234567890abcdef12345678"
 *               reason:
 *                 type: string
 *                 description: The reason for registering for the course.
 *                 example: "I want to learn more about this topic."
 *     responses:
 *       200:
 *         description: Successfully registered for the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully registered for the course."
 *                 success: 
 *                   type: boolean
 *                   example: true
 *       400:
 *          description: Course Id is required or You have already registered for this course.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Course Id is required or You have already registered for this course."
 *                  success:
 *                    type: boolean
 *                    example: true              
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/** 
 * @route    POST api/v1/courses/register/ 
 * @desc      Register for a course
 * @access    Private
 */
router.post('/courses/register', auth, courseController.registerForCourse);

/** 
 * @route    POST api/v1/courses/ 
 * @desc      Create a new course
 * @access    Private (admin only)
 */
router.post('/courses', auth, authorizeRole('admin'), courseController.createCourse);

/** 
 * @route    GET api/v1/dashboard/registeredCourses
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