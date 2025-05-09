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
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    const updateUser = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      gender,
      location,
      phoneNumber
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