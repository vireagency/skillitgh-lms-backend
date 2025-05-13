const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUserProfile, getAllUsers } = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

/**
 * @route    GET api/v1/dashboard/profile
 * @desc     Get user profile
 * @access   Private
 */
router.get('/dashboard/profile', auth, getUserProfile);

/**
 * @route    PUT api/v1/dashboard/profile
 * @desc     Update user profile
 * @access   Private
 */
router.put('/dashboard/profile', auth, updateUserProfile);

/** @  
 * @route    DELETE api/v1/dashboard/profile
 * @desc     Delete user profile
 * @access   Private
 */
router.delete('/dashboard/profile', auth, authorizeRole('admin'), deleteUserProfile)

/**
 * @route    GET api/v1/dashboard/users
 * @desc     Get all users on the platform
 * @access   Private
 */
router.get('/dashboard/users', auth, authorizeRole('admin'), getAllUsers);

module.exports = router;