// src/routes/mainRoutes.js
const express = require('express');
const { forwardRequest } = require('../utils/interServiceUtils');
const { SERVICE_NAMES, URLS } = require('../../config/const');

const router = express.Router();

// Health Check
router.get('/health', async (req, res) => {
  try {
    const services = Object.values(SERVICE_NAMES);
    const healthStatuses = await Promise.all(
      services.map(async (service) => {
        try {
          const data = await forwardRequest(service, URLS.ENDPOINTS.health);
          return { service, status: 'UP', details: data };
        } catch {
          return { service, status: 'DOWN' };
        }
      })
    );
    res.json(healthStatuses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health statuses' });
  }
});

// Forward Requests
router.post('/:service/*', async (req, res) => {
  const { service } = req.params;
  const endpoint = req.params[0];
  try {
    const data = await forwardRequest(service, `/${endpoint}`, req.method, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to forward request' });
  }
});

module.exports = router;