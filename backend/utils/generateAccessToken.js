const jwt = require('jsonwebtoken');

// Generate Access Token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
};



module.exports = generateAccessToken;