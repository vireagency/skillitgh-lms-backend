const User = require('../models/user.model');

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
    res.status(200).json({ success: true, message: "User profile fetched successfully.", user: user });
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
    const updateUser = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      gender,
      location,
      phoneNumber,
      userImage
    }, { new: true, runValidators: true });
    
    if (!updateUser) {
      return res.status(400).json({ success: false, message: "User profile not updated!" });
    }

    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ success: false, message: "User not found!" });
    // }
    // user.firstName = firstName;
    // user.lastName = lastName;
    // user.email = email;
    // const updateUser = await user.save();

    // if (!updateUser) {
    //   return res.status(400).json({ success: false, message: "User profile not updated!" });
    // }
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
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, message: "User profile deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    if (!users) {
      return res.status(404).json({ success: false, message: "No users found!" });
    }
    if (!users) {
      return res.status(404).json({ success: false, message: "No users found!" });
    }
    res.status(200).json({ success: true, message: "Users fetched successfully!", users: users });
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
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, message: "User profile deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user profile by admin:", );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.updateUserProfileByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please Login." });
    }
    const { firstName, lastName, email, gender, location, phoneNumber } = req.body;
    const userImage = req.file?.path;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    const updateUser = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      gender,
      location,
      phoneNumber,
      userImage
    }, { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.status(400).json({ success: false, message: "User profile not updated!" });
    }
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
    res.status(200).json({ success: true, message: "User profile fetched successfully!", user: user });
  } catch (error) {
    console.error("Error fetching user profile by admin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}