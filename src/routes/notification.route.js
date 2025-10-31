const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotificationsByAdmin,
  markAllNotificationsAsReadByAdmin,
  findNotificationsByUserId,
} = require("../controllers/notification.controller");

const { auth } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/role.middleware");

router.get(
  "/dashboard/notifications",
  auth,
  authorizeRole("admin"),
  getAllNotifications
);

router.get("/dashboard/user/notifications", auth, findNotificationsByUserId);

router.put(
  "/dashboard/notifications/:notificationId",
  auth,
  authorizeRole("admin"),
  markNotificationAsRead
);

router.delete(
  "/dashboard/notifications/:notificationId",
  auth,
  authorizeRole("admin"),
  deleteNotification
);

router.delete(
  "/dashboard/notifications",
  auth,
  authorizeRole("admin"),
  deleteAllNotificationsByAdmin
);

router.put(
  "/dashboard/notifications",
  auth,
  authorizeRole("admin"),
  markAllNotificationsAsReadByAdmin
);

module.exports = router;
