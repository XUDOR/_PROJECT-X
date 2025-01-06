// config/const.js

const ENV = {
  PORT: process.env.PORT || 3010,
  PROJECT_X_URL: process.env.PROJECT_X_URL || 'http://localhost:3010',
  PROJECT_Z_URL: process.env.PROJECT_Z_URL || 'http://localhost:3007', // Security service
  JWT_SECRET: process.env.JWT_SECRET,
  DB: {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 5434,
    NAME: process.env.DB_NAME || 'project_b_db'
  }
};

const URLS = {
  BASE: ENV.PROJECT_X_URL,
  SECURITY: ENV.PROJECT_Z_URL,
  API: {
    user: `${ENV.PROJECT_X_URL}/api`,
    jobs: `${ENV.PROJECT_X_URL}/api`,
    metrics: `${ENV.PROJECT_X_URL}/api`,
    parser: `${ENV.PROJECT_X_URL}/api`,
    database: `${ENV.PROJECT_X_URL}/api`,
    communication: `${ENV.PROJECT_X_URL}/api`,
    security: `${ENV.PROJECT_Z_URL}/api`
  },
  ENDPOINTS: {
    health: '/health',
    status: '/status',
    metrics: '/metrics',
    auth: '/auth'
  }
};

const SERVICE_NAMES = {
  USER: 'user',
  JOBS: 'jobs',
  METRICS: 'metrics',
  PARSER: 'parser',
  DATABASE: 'database',
  COMMUNICATION: 'communication',
  SECURITY: 'security'
};

const CONFIG = {
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per window
  },
  REQUEST_LIMIT: '10kb',
  TIMEOUT: 5000, // 5 seconds
  DB: {
    pool: {
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    }
  }
};

module.exports = {
  ENV,
  URLS,
  SERVICE_NAMES,
  CONFIG
};