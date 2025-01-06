// src/utils/interServiceUtils.js
const axios = require('axios');
const { URLS, CONFIG } = require('../../config/const');

async function forwardRequest(service, endpoint, method = 'GET', data = {}) {
  const url = `${URLS.API[service]}${endpoint}`;
  try {
    const response = await axios({ 
      method, 
      url, 
      data,
      timeout: CONFIG.TIMEOUT 
    });
    return response.data;
  } catch (error) {
    console.error(`Error forwarding request to ${service}:`, error.message);
    throw error;
  }
}

module.exports = { forwardRequest };