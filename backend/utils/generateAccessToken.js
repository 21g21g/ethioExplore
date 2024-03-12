const jwt = require('jsonwebtoken');

// Generate Access Token with User Role
const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
};

module.exports = generateAccessToken;
