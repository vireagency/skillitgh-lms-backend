const Notification = require("../models/notification.model");

exports.getAllNotifications = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Please Login." });
    }

    //const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    const notifications = await Notification.find()
      .populate("userId", "firstName lastName userImage email")
      .sort({ createdAt: -1 });
    if (!notifications) {
      return res
        .status(404)
        .json({ success: false, message: "No notifications found!" });
    }
    res.status(200).json({
      success: true,
      message: "Notifications fetched successfully!",
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    if (!notificationId) {
      return res
        .status(400)
        .json({ success: false, message: "Notification ID is required." });
    }

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read successfully!",
      notification,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    if (!notificationId) {
      return res
        .status(400)
        .json({ success: false, message: "Notification ID is required." });
    }

    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Notification deleted successfully!" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteAllNotificationsByAdmin = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Please Login." });
    }
    const notifications = await Notification.deleteMany();
    if (!notifications) {
      return res
        .status(404)
        .json({ success: false, message: "No notifications found!" });
    }
    res.status(200).json({
      success: true,
      message: "All notifications deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting all notifications:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.markAllNotificationsAsReadByAdmin = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Please Login." });
    }
    const notifications = await Notification.updateMany({}, { isRead: true });
    if (!notifications) {
      return res
        .status(404)
        .json({ success: false, message: "No notifications found!" });
    }
    res.status(200).json({
      success: true,
      message: "All notifications marked as read successfully!",
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.findNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized: Please Login" });
    }
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    if (!notifications || notifications.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No notifications found for this user!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notifications fetched successfully!",
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications by user ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
