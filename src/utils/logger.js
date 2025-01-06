// src/utils/logger.js
const axios = require('axios');
const { ENV } = require('../../config/const');

const notifyProjectF = async (message, level = 'info') => {
  try {
    // For now, just log to console since Project F integration isn't set up
    console.log(`[${level.toUpperCase()}] ${message}`);
    
    // In the future, you can uncomment this to send to Project F
    /*
    await axios.post(`${ENV.PROJECT_F_URL}/api/log`, {
      message,
      level,
      source: 'Project X',
      timestamp: new Date().toISOString()
    });
    */
  } catch (error) {
    console.error('Failed to notify Project F:', error.message);
    // Don't throw - we don't want logging failures to crash the app
  }
};

module.exports = {
  notifyProjectF
};