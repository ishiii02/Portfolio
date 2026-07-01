'use strict';

const express    = require('express');
const path       = require('path');
const morgan     = require('morgan');
const compression = require('compression');

const { applySecurityMiddleware } = require('./middleware/security.middleware');
const { applyRateLimiting }       = require('./middleware/rateLimit.middleware');
const { handle404, handle500 }    = require('./middleware/error.middleware');
const routes                      = require('./routes/index');

const app = express();
// ─── Trust proxy for Vercel / reverse proxies ─────────────────────────
app.set('trust proxy', 1);
// ─── View Engine ────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Compression (Gzip for better performance) ───────────────────
app.use(compression());

// ─── Security Middleware ─────────────────────────────────────────
applySecurityMiddleware(app);
applyRateLimiting(app);

// ─── Body Parsers ────────────────────────────────────────────────
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ─── Caching Strategy ────────────────────────────────────────────
// Cache static assets for 1 year (long-lived, content-addressed)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
  etag: false
}));

// ─── HTTP Logger (dev only) ──────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Routes ──────────────────────────────────────────────────────
app.use('/', routes);

// ─── Error Handlers ──────────────────────────────────────────────
app.use(handle404);
app.use(handle500);

module.exports = app;
