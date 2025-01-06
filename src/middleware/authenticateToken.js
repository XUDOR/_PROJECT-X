// src/middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const { ENV } = require('../../config/const');
const { ServiceError } = require('../utils/errorHandler');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new ServiceError('auth', 'No token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ServiceError('auth', 'Invalid token', 403);
  }
};

module.exports = authenticateToken;