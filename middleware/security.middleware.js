'use strict';

const helmet = require('helmet');

function applySecurityMiddleware(app) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc:  ["'self'", "https://vercel.com"],
        scriptSrc:   ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://vercel.live"],
        scriptSrcElem: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://vercel.live"],
        styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        fontSrc:     ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc:      ["'self'", "data:", "https:"],
        connectSrc:  ["'self'"],
        manifestSrc: ["'self'", "https://vercel.com"],
        frameSrc:    ["'none'"],
        objectSrc:   ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));
}

module.exports = { applySecurityMiddleware };
