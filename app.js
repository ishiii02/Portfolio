'use strict';

const express    = require('express');
const path       = require('path');
const morgan     = require('morgan');

const { applySecurityMiddleware } = require('./middleware/security.middleware');
const { applyRateLimiting }       = require('./middleware/rateLimit.middleware');
const { handle404, handle500 }    = require('./middleware/error.middleware');
const routes                      = require('./routes/index');

const app = express();

// ─── View Engine ────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Security Middleware ─────────────────────────────────────────
applySecurityMiddleware(app);
applyRateLimiting(app);

// ─── Body Parsers ────────────────────────────────────────────────
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ─── Static Assets ───────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

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
