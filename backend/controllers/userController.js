const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
const bcrypt = require("bcryptjs")
// register users
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  // Check if user  already exists
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("This email has already been used");
  }
  // Create new user
  user = await User.create({
    name,
    email,
    password,
  });

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Set tokens as cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minutes
    secure: true,
    sameSite: 'none'
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    secure: true,
    sameSite: 'none'
  });

  // Send success response without including tokens
  if (user) {
    res.status(201).json({
      data: {
        user,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Login User
exports.loginUser = asyncHandler(async (req, res) => {
  // Take inputs from the user
  const { email, password } = req.body;

  // Validate user input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter an email and a password");
  }
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User not found ");
  }
  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Enter correct password");
  }
  // Generate access token and refresh token
  const accessToken = generateAccessToken(user._id,user.role);
  const refreshToken = generateRefreshToken(user._id);

  // Set tokens as cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minutes
    secure: true,
    sameSite: 'none'
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    secure: true,
    sameSite: 'none'
  });

  // Send success response without including the tokens
  if (user && isPasswordCorrect) {
    res.status(200).json({
      data: {
        user,
      },
        });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});


//logout user
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie('accessToken', "", {
    httpOnly: true,
    expires: new Date(0) , // 0 minutes
    secure: true,
    sameSite: 'none'
  });
  res.status(200).json({ message: "Logged out successfully" })
});


exports.getUsers = asyncHandler(async (req, res) => {
  // User is authenticated, fetch users
  const users = await User.find();
  if (users) {
    res.status(200).json({
      data: {
        users,
      },
    });
  } else {
    throw new Error("User not found");
  }
});

// Get single user by ID
exports.getUser = asyncHandler(async (req, res) => {
  try {
    const {id } = req.params;

    if (!id) {
      res.status(400).json({ error: "User ID is missing in the request" });
      return;
    }

    console.log("Requested User ID:", id); // Log userId for debugging

    // Find the user by ID
    const user = await User.findById(id);

    // If user is found, respond with user data
    if (user) {
      res.status(200).json({
        data: {
          user,
        },
      });
    } else {
      // If user is not found, return 404 error
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error); // Log any caught errors for further inspection
    res.status(500).json({ error: "Server Error" }); // Send a generic error response
  }
});

// Update the user
exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  // Find the user by ID and update
  let user = await User.findById(id, req.body,{
    new: true,
    runValidators: true,
  });

  // If user doesn't exist, return 404 error
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update specific fields if provided
  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;

  // Save the updated user
  updaterUser = await user.save();

  // Respond with the updated user
  res.json({
    data: {
      updaterUser,
    },
  });
});


