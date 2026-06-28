'use strict';


const { validationResult } = require('express-validator');
const { sendContactEmail } = require('../services/mail.service');

exports.getContactPage = (req, res) => {
  const status = req.query.status || null;
  res.render('pages/contact', {
    title: 'Contact — Nash Francis',
    currentPage: 'contact',
    status,
    errors: [],
  });
};

exports.postContactForm = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      return res.render('pages/contact', {
        title: 'Contact — Nash Francis',
        currentPage: 'contact',
        status: null,
        errors: errorMessages,
      });
    }

    // Extract validated and sanitized form data
    const { name, email, message } = req.body;

    // Send email
    await sendContactEmail({ name, email, message });

    // Redirect with success status
    res.redirect('/contact?status=sent');
  } catch (err) {
    console.error('[CONTACT ERROR]', err);
    res.render('pages/contact', {
      title: 'Contact — Nash Francis',
      currentPage: 'contact',
      status: null,
      errors: ['Something went wrong. Please try again later.'],
    });
  }
};
