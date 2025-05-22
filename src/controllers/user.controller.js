const User = require('../models/user.model');
const cloudinary = require('../utils/cloudinaryHelper');

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login." });
    }
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, message: "User profile fetched successfully.", user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login." });
    }
    const { firstName, lastName, email, gender, location, phoneNumber } = req.body;
    const userImage = req.file?.path;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    // const updateUser = await User.findByIdAndUpdate(userId, {
    //   firstName,
    //   lastName,
    //   email,
    //   gender,
    //   location,
    //   phoneNumber,
    //   userImage
    // }, { new: true, runValidators: true });
    
    // if (!updateUser) {
    //   return res.status(400).json({ success: false, message: "User profile not updated!" });
    // }

   const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User profile not updated!" });
    }
    if (userImage !== user.userImage && user.userImagePublicId) {
      await cloudinary.deleteFromCloudinary(user.userImagePublicId);
    }
    user.userImage = userImage || user.userImage;
    // user.userImagePublicId = userImage ? userImage.split('/').pop().split('.')[0] : user.userImagePublicId;

    if (userImage && req.file?.filename) {
      user.userImage = userImage;
      user.userImagePublicId = req.file.filename;
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.location = location || user.location;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = req.body.role || user.role;

    const updateUser = await user.save();
    res.status(200).json({ success: true, message: "User profile updated successfully!", user: updateUser });
  } catch (error) {
    console.error("Error editing user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
} 

exports.deleteUserProfile = async (req, res) => {
  try {   
   const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    if (user.userImagePublicId) {
      await cloudinary.deleteFromCloudinary(user.userImagePublicId);
    }
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "User profile deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments({ role: "user" });
    const users = await User.find({ role: "user" })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    
    if (!users) {
      return res.status(404).json({ success: false, message: "No users found!" });
    }
    res.status(200).json({ success: true, message: "Users fetched successfully!",
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1 > 0 ? page - 1 : null,
      users
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.deleteUserProfileByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    if (user.userImagePublicId) {
      await cloudinary.deleteFromCloudinary(user.userImagePublicId);
    }
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({ success: true, message: "User profile deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user profile by admin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.updateUserProfileByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login." });
    }
    const { firstName, lastName, email, gender, location, phoneNumber, role } = req.body;
    const userImage = req.file?.path;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    // const updateUser = await User.findByIdAndUpdate(userId, {
    //   firstName,
    //   lastName,
    //   email,
    //   gender,
    //   location,
    //   phoneNumber,
    //   userImage
    // }, { new: true, runValidators: true }
    // );
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User profile not updated!" });
    }
    if (userImage !== user.userImage && user.userImagePublicId) {
      await cloudinary.deleteFromCloudinary(user.userImagePublicId);
    }
    user.userImage = userImage || user.userImage;
    // user.userImagePublicId = userImage ? userImage.split('/').pop().split('.')[0] : user.userImagePublicId;

    if (userImage && req.file?.filename) {
      user.userImage = userImage;
      user.userImagePublicId = req.file.filename;
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.location = location || user.location;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = role || user.role;

    const updateUser = await user.save();
    res.status(200).json({ success: true, message: "User profile updated successfully!", user: updateUser });
  } catch (error) {
    console.error("Error updating user profile by admin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getUserProfileByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, message: "User profile fetched successfully!", user });
  } catch (error) {
    console.error("Error fetching user profile by admin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}