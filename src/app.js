//app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const { notifyProjectF } = require('./utils/logger');
const { ENV, CONFIG } = require('../config/const');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: CONFIG.REQUEST_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: CONFIG.REQUEST_LIMIT }));

// Rate Limiting
app.use(rateLimit(CONFIG.RATE_LIMIT));

// Serve Public Folder
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', mainRoutes);

// Notify Project F on Startup
(async () => {
  await notifyProjectF('Project X: Controller is online', 'info');
})();

// Default Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(ENV.PORT, () => {
  console.log(`Project X is running on ${ENV.PROJECT_X_URL}`);
});