const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    // Get access token from cookies
    const accessToken = req.cookies.accessToken;
    // If no access token found, deny access
    if (!accessToken) {
      res.status(401);
      throw new Error('Not authorized, please login');
    }
    // Verify the token
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // Fetch the user based on the userId from the token
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // Set user role in the request object
    req.user = user;
    next();
  } catch (error) {
    // Forward errors to error handler middleware
    next(error);
  }
};


// Role-based middleware
const admin = (req, res, next) => {
  console.log('User Role:', req.user.role); // Log user role
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};


const tourGuide = (req, res, next) => {
  console.log('User Role:', req.user.role); // Log user role
  if (req.user && req.user.role === "tourGuide") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a tour guide");
  }
};

const user = (req, res, next) => {
  console.log('User Role:', req.user.role); // Log user role
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a user");
  }
};
const hotelManager = (req, res, next) => {
  console.log('User Role:', req.user.role); // Log user role
  if (req.user && req.user.role === "hotelManager") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a hotel");
  }
};

module.exports = { protect, admin, tourGuide, user, hotelManager};
