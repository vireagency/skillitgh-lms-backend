const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateUserProfile, 
  deleteUserProfile, 
  getAllUsers,
  deleteUserProfileByAdmin,
  updateUserProfileByAdmin,
  getUserProfileByAdmin
} = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');
const upload = require('../middlewares/multer.middleware');

/**
 * @route    GET api/v1/dashboard/profile
 * @desc     Get user profile
 * @access   Private
 * 
 * @swagger
 * /api/v1/dashboard/profile:
 *  get:
 *    summary: Get user profile
 *   description: Get user profile
 *  tags:
 *    - Users
 *   parameters:
 *    - name: Authorization
 *     in: header
 *    required: true
 *   description: Bearer token
 *  responses:
 *    200:
 *     description: User profile
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *       properties:
 *        user:
 *         type: object
 *        properties:
 *         firstName:
 *          type: string
 *         lastName:
 *         type: string
 *        email:
 *         type: string
 *        userImage:
 *        type: string
 * 
 * example:
 *  user:
 *  firstName: John
 * lastName: Doe
 * email: example.com
 * userImage: https://example.com/user-image.jpg
 */
router.get('/dashboard/profile', auth, getUserProfile);

/**
 * @route    PUT api/v1/dashboard/profile
 * @desc     Update user profile
 * @access   Private
 * 
 * @swagger
 * /api/v1/dashboard/profile:
 *  put:
 *   summary: Update user profile
 *  description: Update user profile
 * tags:
 *   - Users
 * parameters:
 *   - name: Authorization
 *  in: header
 * required: true
 * description: Bearer token
 * requestBody:
 *  required: true
 * content:
 *  application/json:
 *  schema:
 *   type: object
 *  properties:
 *   firstName:
 *    type: string
 *  lastName:
 *   type: string
 *  email:
 *   type: string
 *  userImage
 *  type: string
 * example:
 *  firstName: John
 * lastName: Doe
 * email: example.com
 * userImage: https://example.com/user-image.jpg
 * required:
 * - firstName
 * - lastName
 * - email
 * - userImage
 * responses:
 *  200:
 *   description: User profile updated
 *  content:
 *   application/json:
 *  schema:
 *   type: object
 *  properties:
 *   user:
 *    type: object
 *  properties:
 *   firstName:
 *   type: string
 *  lastName:
 *  type: string
 *  email:
 *  type: string
 * example:
 *  firstName: John
 *  lastName: Doe
 *  email: example.com
 * userImage:
 * type: string
 * example: https://example.com/user-image.jpg
 */
router.put('/dashboard/profile', auth, upload.single('userImage'), updateUserProfile);

/** @  
 * @route    DELETE api/v1/dashboard/profile
 * @desc     Delete user profile
 * @access   Private
 * 
 * @swagger
 * /api/v1/dashboard/profile:
 * delete:
 *  summary: Delete user profile
 * description: Delete user profile
 * tags:
 * - Users
 * parameters:
 * - name: Authorization
 * in: header
 * required: true
 * description: Bearer token
 * responses:
 *  200:
 *  description: User profile deleted
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: User profile deleted successfully
 * success:
 * type: boolean
 * example: true
 * 
 */
router.delete('/dashboard/profile', auth, authorizeRole('admin'), deleteUserProfile)

/**
 * @route    GET api/v1/dashboard/users
 * @desc     Get all users on the platform
 * @access   Private
 * 
 * @swagger
 * /api/v1/dashboard/users:
 * get:
 *  summary: Get all users
 * description: Get all users
 * tags:
 * - Users
 * parameters:
 * - name: Authorization
 * in: header
 * required: true
 * description: Bearer token
 * responses:
 *  200:
 *  description: All users
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * users:
 * type: array
 * items:
 * type: object
 * properties:
 * firstName:
 * type: string
 * lastName:
 * type: string
 * email:
 * type: string
 * userImage:
 * type: string
 * role:
 * type: string
 * 
 * example:
 * users:
 * - firstName: John
 * lastName: Doe
 * email: example.com
 * userImage: https://example.com/user-image.jpg
 * role: user
 * 
 */
router.get('/dashboard/users', auth, authorizeRole('admin'), getAllUsers);

/** 
 * @route    DELETE api/v1/dashboard/users/:userId
 * @desc     Delete user profile by admin
 * @access   Private
 */
router.delete('/dashboard/users/:userId', auth, authorizeRole('admin'), deleteUserProfileByAdmin);

/**
 * @route     PUT api/v1/dashboard/users/:userId  
 * @desc      Update user profile by admin
 * @access    Private
 */
router.put('/dashboard/users/:userId', auth, authorizeRole('admin'), upload.single('userImage'), updateUserProfileByAdmin);

/**
 * @route     GET api/v1/dashboard/users/:userId
 * @desc      Get user profile by admin
 * @access    Private
 */
router.get('/dashboard/users/:userId', auth, authorizeRole('admin'), getUserProfileByAdmin);

module.exports = router;