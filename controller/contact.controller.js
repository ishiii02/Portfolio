'use strict';

exports.getContactPage = (req, res) => {
  const status = req.query.status || null;
  res.render('pages/contact', { title: 'Contact — Nash Francis', status, errors: [] });
};

exports.postContactForm = (req, res) => {
  // Validation + email logic added in Phase 6
  res.redirect('/contact?status=sent');
};
