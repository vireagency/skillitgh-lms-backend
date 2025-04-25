const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");

/** @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/auth/register', authController.register);

/** @route   POST /api/v1/auth/sign in 
 * @desc     Sign in a user
 * @access   Public
*/
router.post('/auth/signin', authController.signIn);

module.exports = router;