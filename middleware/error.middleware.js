'use strict';

function handle404(req, res) {
  res.status(404).render('pages/errors/404', { title: '404 — Page Not Found' });
}

function handle500(err, req, res, _next) {
  console.error('[ERROR]', err.stack);
  res.status(500).render('pages/errors/500', { title: '500 — Server Error' });
}

module.exports = { handle404, handle500 };
