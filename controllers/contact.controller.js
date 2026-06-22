'use strict';
exports.getContactPage = (req, res) => {
  const status = req.query.status || null;
  res.render('pages/contact', { title: 'Contact — Nash Francis', currentPage: 'contact', status, errors: [] });
};
exports.postContactForm = (req, res) => {
  res.redirect('/contact?status=sent');
};
