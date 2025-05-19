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

router.put('/dashboard/notifications/:notificationId', auth, authorizeRole('admin'), markNotificationAsRead);

router.delete('/dashboard/notifications/:notificationId', auth, authorizeRole('admin'), deleteNotification);

module.exports = router;