'use strict';

const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_MAX, 10)        || 100,
  standardHeaders: true,
  legacyHeaders:   false,
  message: 'Too many requests, please try again later.',
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max:      parseInt(process.env.CONTACT_RATE_LIMIT_MAX, 10) || 5,
  message:  'Too many messages sent. Please wait before trying again.',
});

function applyRateLimiting(app) {
  app.use(globalLimiter);
  app.use('/contact', contactLimiter);
}

module.exports = { applyRateLimiting, contactLimiter };
