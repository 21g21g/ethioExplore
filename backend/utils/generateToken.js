const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  // In a real-world application, it's recommended to use a more secure secret and other configurations.
  const secret = process.env.JWT_SECRET || 'eyue123';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d'; // Token expiration time

  return jwt.sign({ id: userId }, secret, { expiresIn });
};

module.exports = generateToken;
