// src/utils/interServiceUtils.js
const axios = require('axios');

const routesMap = {
  user: 'http://localhost:3001/api',
  jobs: 'http://localhost:3004/api',
  metrics: 'http://localhost:3003/api',
};

async function forwardRequest(service, endpoint, method = 'GET', data = {}) {
  const url = `${routesMap[service]}${endpoint}`;
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error(`Error forwarding request to ${service}:`, error.message);
    throw error;
  }
}

module.exports = { forwardRequest };
