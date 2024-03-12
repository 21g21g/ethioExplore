const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    // Get access token from cookies
    const accessToken = req.cookies.accessToken;
    // If no access token found, deny access
    if (!accessToken) {
      res.status(401);
      throw new Error('Not autherized please login');
    }
    //verify the token
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user= await User.findById( verified.userId,
      verified.role ).select("-password")
      if (!user) {
        res.status(401)
        throw new Error("user not found")
      }
      req.user=user
    // Attach user information to the request object
    // req.user = {
    //   userId: verified.userId,
    //   role: verified.role 
    // };
    // Proceed to the next middleware
    next();
  } catch (error) {
    // If verification fails, deny access
    res.status(401);
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
const hotel = (req, res, next) => {
  console.log('User Role:', req.user.role); // Log user role
  if (req.user && req.user.role === "hotel") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a hotel");
  }
};

module.exports = { protect, admin, tourGuide, user, hotel, };
