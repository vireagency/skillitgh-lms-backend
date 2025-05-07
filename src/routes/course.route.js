const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { uploadFile } = require('../middlewares/multer.middleware');

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
 *               courseTitle:
 *                 type: string
 *                 description: The title of a course.
 *                 example: "Graphic Design"
 *               messageBody:
 *                 type: string
 *                 description: The reason for registering for the course.
 *                 example: "I want to learn more about this topic."
 *               courseImage:
 *                 type: string
 *                 description: The URL of the course image.
 *                 example: "https://example.com/course-image.jpg"
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
 *                 course:
 *                  type: object
 *                  properties:
 *                   _id:
 *                     type: string
 *                     example: "1234567890abcdef12345678"
 *                   enrolledUser:
 *                     type: string
 *                     example: "1234567890abcdef12345678"
 *                   messageBody:
 *                     type: string
 *                     example: "I want to learn more about this topic."
 *       400:
 *          description: Course title is required or You have already registered for this course.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Course title is required or You have already registered for this course."
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
router.post('/courses', auth, authorizeRole('admin'), uploadFile, courseController.createCourse);

/** 
 * @swagger
 * /api/v1/dashboard/registeredCourses:
 *   get:
 *     summary: Get all registered courses for a user
 *     description: This endpoint allows a user to fetch all courses they have registered for.
 *     tags: ["Courses"]
 *     responses:
 *       200:
 *         description: Successfully fetched all registered courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully fetched all registered courses."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "1234567890abcdef12345678"
 *                       courseTitle:
 *                         type: string
 *                         example: "Graphic Design"
 *                       messageBody:
 *                         type: string
 *                         example: "I want to learn more about this topic."
 *                       courseImage:
 *                         type: string
 *                         example: "https://example.com/course-image.jpg"
 * 
 *       401:
 *         description: Unauthorized:Please Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Please Login."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404: 
 *         description: No registered course found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No registered course found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Internal Server Error"
 *                  success:
 *                    type: boolean
 *                    example: false
 * 
 * 
 * 
 * @route    GET api/v1/dashboard/registeredCourses
 * @desc      GET all registered courses for a user
 * @access    Private
 */
router.get('/dashboard/registeredCourses', auth, courseController.getRegisteredCourses);

/** 
 * @route    GET api/v1/dashboard/registeredUsers
 * @desc      GET all registered users for a course
 * @access    Private (admin only)
 */
router.get('/dashboard/:courseId/registeredUsers', auth, authorizeRole('admin'), courseController.getRegisteredUsers);


/**
 * @swagger
 * /api/v1/dashboard/otherCourses:
 *   get:
 *     summary: Get all other courses for a user
 *     description: This endpoint allows a user to fetch all other courses they can register.
 *     tags: ["Courses"]
 *     responses:
 *       200:
 *         description: Successfully fetched all other courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully fetched all other courses."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "1234567890abcdef12345678"
 *                       courseTitle:
 *                         type: string
 *                         example: "Graphic Design"
 *                       messageBody:
 *                         type: string
 *                         example: "I want to learn more about this topic."
 *                       courseImage:
 *                         type: string
 *                         example: "https://example.com/course-image.jpg"
 * 
 *       401:
 *         description: Unauthorized:Please Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Please Login."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404: 
 *         description: No registered course found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No registered course found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Internal Server Error"
 *                  success:
 *                    type: boolean
 *                    example: false 
 * 
 * @route    GET api/v1/dashboard/otherCourses
 * @desc      GET all other courses
 * @access    Private 
 */
router.get('/dashboard/otherCourses', auth, courseController.getOtherCourses);

/**
 * @swagger
 * /api/v1/dashboard/{courseId}/register:
 *   get:
 *     summary: Register for other courses
 *     description: This endpoint allows a user to register for other courses.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to register for.
 *         schema:
 *           type: string
 *           example: "1234567890abcdef12345678"
 *     tags: ["Courses"]
 *     responses:
 *       200:
 *         description: Successfully registered for this course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully registered for this course."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "1234567890abcdef12345678"
 *                       courseTitle:
 *                         type: string
 *                         example: "Graphic Design"
 *                       messageBody:
 *                         type: string
 *                         example: "I want to learn more about this topic."
 *                       courseImage:
 *                         type: string
 *                         example: "https://example.com/course-image.jpg"
 * 
 *       401:
 *         description: Unauthorized:Please Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Please Login."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404: 
 *         description: No registered course found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No registered course found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Internal Server Error"
 *                  success:
 *                    type: boolean
 *                    example: false
 *  
 * @route   GET api/v1/dashboard/{courseId}/register 
 * @desc     Register for other courses
 * @access   Private
 */
router.post('/dashboard/:courseId/register', auth, courseController.registerForOtherCourses);

module.exports = router;