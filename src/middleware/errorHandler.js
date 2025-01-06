// src/utils/errorHandler.js

class ServiceError extends Error {
  constructor(service, message, statusCode = 500) {
    super(message);
    this.service = service;
    this.statusCode = statusCode;
    this.name = 'ServiceError';
  }
}

const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    service: err.service,
    statusCode: err.statusCode,
    path: req.path
  });

  if (err instanceof ServiceError) {
    return res.status(err.statusCode).json({
      error: err.message,
      service: err.service
    });
  }

  // Default error response
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = { ServiceError, errorHandler };