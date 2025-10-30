const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const { upload } = require("../middlewares/multer.middleware");

const { auth } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/role.middleware");

/** @route    GET api/v1/courses/
 * @desc      Fetch all courses
 * @access    Public
 */
router.get("/courses", courseController.getCourses);

/** @route    GET api/v1/courses/:courseId/
 * @desc      Fetch a course by ID
 * @access    Public
 */
router.get("/:courseId", auth, courseController.getCourseById);

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
router.post("/courses/register", auth, courseController.registerForCourse);

/**
 * @route    POST api/v1/courses/
 * @desc      Create a new course
 * @access    Private (admin only)
 */
router.post(
  "/courses",
  auth,
  authorizeRole("admin"),
  upload.single("courseImage"),
  courseController.createCourse
);

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
router.get(
  "/dashboard/registeredCourses",
  auth,
  courseController.getRegisteredCourses
);

/**
 * @route    GET api/v1/dashboard/registeredUsers
 * @desc      GET all registered users for a course
 * @access    Private (admin only)
 * @swagger
 * /api/v1/dashboard/{courseId}/registeredUsers:
 *  get:
 *    summary: Get all registered users for a course
 *   description: This endpoint allows an admin to fetch all users registered for a specific course.
 *  parameters:
 *   - in: path
 *   name: courseId
 *  required: true
 * description: The ID of the course to fetch registered users for.
 * schema:
 *  type: string
 * example: "1234567890abcdef12345678"
 * tags: ["Courses"]
 * responses:
 *  200:
 *   description: Successfully fetched all registered users for the course.
 *  content:
 *   application/json:
 *    schema:
 *   type: object
 *  properties:
 *   message:
 *    type: string
 *   example: "Successfully fetched all registered users for the course."
 *  success:
 *   type: boolean
 *  example: true
 * registeredUsers:
 *  type: array
 * items:
 *  type: object
 * properties:
 * _id:
 * type: string
 * example: "1234567890abcdef12345678"
 * firstName:
 * type: string
 * example: "John"
 * lastName:
 * type: string
 * example: "Doe"
 * email:
 * type: string
 * example: "example@gmail.com"
 * userImage:
 * type: string
 * example: "https://example.com/user-image.jpg"
 * role:
 * type: string
 * example: "user"
 */
router.get(
  "/dashboard/:courseId/registeredUsers",
  auth,
  authorizeRole("admin"),
  courseController.getRegisteredUsers
);

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
router.get("/dashboard/otherCourses", auth, courseController.getOtherCourses);

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
router.post(
  "/dashboard/:courseId/register",
  auth,
  courseController.registerForOtherCourses
);

/**
 * @route   DELETE api/v1/courses/:courseId
 * @desc    Delete a course
 * @access  Private (admin only)
 *
 * @swagger
 * /api/v1/courses/{courseId}:
 *   delete:
 *    summary: Delete a course
 *  description: This endpoint allows an admin to delete a course.
 *  parameters:
 *   - in: path
 *    name: courseId
 *  required: true
 * description: The ID of the course to delete.
 * schema:
 *   type: string
 * example: "1234567890abcdef12345678"
 * tags: ["Courses"]
 * responses:
 *  200:
 *   description: Successfully deleted the course.
 *  content:
 *   application/json:
 *    schema:
 *    type: object
 *   properties:
 *   message:
 *    type: string
 *   example: "Successfully deleted the course."
 *  success:
 *   type: boolean
 *  example: true
 * course:
 *  type: object
 * properties:
 *  _id:
 *   type: string
 * example: "1234567890abcdef12345678"
 * courseTitle:
 *  type: string
 * example: "Graphic Design"
 * courseImage:
 * type: string
 * example: "https://example.com/course-image.jpg"
 */
router.delete(
  "/courses/:courseId",
  auth,
  authorizeRole("admin"),
  courseController.deleteCourse
);

/**
 * @route   PUT api/v1/courses/:courseId
 * @desc    Update a course
 * @access  Private (admin only)
 * @swagger
 * /api/v1/courses/{courseId}:
 *   put:
 *    summary: Update a course
 *   description: This endpoint allows an admin to update a course.
 *   parameters:
 *    - in: path
 *     name: courseId
 *    required: true
 *   description: The ID of the course to update.
 *  schema:
 *    type: string
 *   example: "1234567890abcdef12345678"
 *  tags: ["Courses"]
 * responses:
 *  200:
 *   description: Successfully updated the course.
 *  content:
 *   application/json:
 *    schema:
 *     type: object
 *    properties:
 *    message:
 *     type: string
 *    example: "Successfully updated the course."
 *   success:
 *    type: boolean
 *   example: true
 *  course:
 *   type: object
 *  properties:
 *   _id:
 *    type: string
 *   example: "1234567890abcdef12345678"
 *  courseTitle:
 *   type: string
 *  example: "Graphic Design"
 * courseImage:
 *  type: string
 * example: "https://example.com/course-image.jpg"
 */
router.put(
  "/courses/:courseId",
  auth,
  authorizeRole("admin"),
  upload.single("courseImage"),
  courseController.updateCourse
);

/**
 * @route   POST api/v1/dashboard/:courseId/unregister
 * @desc    Unregister from a course
 * @access  Private
 */
router.post(
  "/dashboard/:courseId/unregister",
  auth,
  courseController.unregisterFromCourse
);

/**
 * @route    POST api/v1/dashboard/metrics
 * @desc      Get dashboard metrics
 * @access    Private (admin only)
 * @swagger
 * /api/v1/dashboard/metrics:
 *   get:
 *     summary: Get dashboard metrics
 *     description: This endpoint allows an admin to fetch dashboard metrics.
 *     tags: ["Dashboard"]
 *    responses:
 *      200:
 *        description: Successfully fetched dashboard metrics.
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *          properties:
 *           message:
 *            type: string
 *           example: "Successfully fetched dashboard metrics."
 *          success:
 *           type: boolean
 *          example: true
 *          metrics:
 *           type: object
 *          properties:
 *           totalUsers:
 *            type: number
 *           example: 100
 *          totalCourses:
 *           type: number
 *         example: 50
 *         totalWorkshops:
 *          type: number
 *         example: 20
 *         totalRegisteredUsers:
 *          type: number
 *        example: 80
 */
router.get(
  "/dashboard/metrics",
  auth,
  authorizeRole("admin"),
  courseController.getDashboardMetrics
);
/**
 * @swagger
 * /api/v1/dashboard/:courseId/unregister:
 *  post:
 *    summary: Unregister from a course
 *    description: This endpoint allows a user to unregister from a course.
 *    parameters:
 *     - in: path
 *       name: courseId
 *       required: true
 *       description: The ID of the course to unregister from.
 *       schema:
 *         type: string
 *         example: "1234567890abcdef12345678"
 *    tags: ["Courses"]
 *    responses:
 *      200:
 *        description: Successfully unregistered from the course.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Successfully unregistered from the course."
 *                success:
 *                  type: boolean
 *                  example: true
 *
 */

/**
 * @route     GET api/v1/dashboard/registeredCourses
 * @desc      Get all registered courses in the system
 * @access    Private (admin only)
 */

router.get(
  "/dashboard/admin/courses",
  auth,
  authorizeRole("admin"),
  courseController.getRegisteredCoursesByAdmin
);

/**
 * @route     GET api/v1/dashboard/registeredUsers
 * @desc      Get all registered courses and users
 * @access    Private (admin only)
 */
router.get(
  "/dashboard/students",
  auth,
  authorizeRole("admin"),
  courseController.getRegisteredUsersByAdmin
);

module.exports = router;
