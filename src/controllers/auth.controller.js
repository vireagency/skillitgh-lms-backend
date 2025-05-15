const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    // validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists!" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    })
    // check if user is created successfully
    if (!newUser) {
      return res.status(400).json({ success: false, message: "User not created!" });
    }
    
    // save new user to db
    const savedUser = await newUser.save();
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password; // remove password from user object
    res.status(201).json({ success: true, message: "User registered successfully!", user: userWithoutPassword });
  } catch (err) {
    console.error("Error in registering user: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// @desc    sign in user
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    };
    /// check if user exists
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User does not exist!" });
    }
    // check password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "User does not exist!" });
    }
    // generate token
    const accessToken = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, process.env.PRIVATE_KEY, { expiresIn : "1d" })
    // remove password from user object
    const { password: _ , ...userObject } = existingUser._doc; 
    const user = { ...userObject };
    // ALT 
    // const userObject = existingUser.toObject();
    // delete userObject.password;

    // set secure HTTP-only cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({ success: true, message: "User signed in successfully!", user: user, token: accessToken });
  } catch (err) {
    console.log("Error in signing in user: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
} 

// @desc    sign out user

exports.signOut = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ success: true, message: "User signed out successfully!" });
  } catch (err) {
    console.log("Error in signing out user: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}