const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    // Get access token from cookies
    const accessToken = req.cookies.accessToken;
    // If no access token found, deny access
    if (!accessToken) {
      res.status(401);
      throw new Error('Access token not found');
    }
    // Verify access token using the access token secret key
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // If verification succeeds, attach the user ID to the request object
    req.userId = decoded.userId;
    // Proceed to the next middleware
    next();
  } catch (error) {
    // If verification fails, deny access
    res.status(401);
    throw new Error('Not authorized, token verification failed');
  }
};


module.exports = protect;


module.exports = protect;



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

module.exports = { protect, admin, tourGuide, user, hotel };
