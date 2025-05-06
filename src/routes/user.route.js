const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth.middleware');

router.get('/dashboard/profile', auth, getUserProfile);
router.put('/dashboard/profile', auth, updateUserProfile);

module.exports = router;