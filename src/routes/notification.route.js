const express = require('express');
const router = express.Router();
const { 
  getAllNotifications, 
  markNotificationAsRead, 
  deleteNotification
} = require('../controllers/notification.controller');

const { auth } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

router.get('/dashboard/notifications', auth, authorizeRole('admin'), getAllNotifications);

router.put('/dashboard/notifications/:id', auth, authorizeRole('admin'), markNotificationAsRead);

router.delete('/dashboard/notifications/:id', auth, authorizeRole('admin'), deleteNotification);

module.exports = router;