const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify tocken
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


// Role-based middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const tourGuide = (req, res, next) => {
  if (req.user && req.user.role === "tourGuide") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a tour guide");
  }
};

const user = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a user");
  }
};
const hotel = (req, res, next) => {
  if (req.user && req.user.role === "hotel") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a hotel");
  }
};

module.exports = { protect, admin, tourGuide, user,hotel };
