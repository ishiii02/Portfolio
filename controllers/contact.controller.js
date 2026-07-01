'use strict';


const { validationResult } = require('express-validator');
const { sendContactEmail } = require('../services/mail.service');
const { saveContactSubmission, isSupabaseReady } = require('../services/supabase.service');

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

    // Persist submission to Supabase when available.
    if (isSupabaseReady()) {
      try {
        await saveContactSubmission({ name, email, message });
      } catch (dbError) {
        console.warn('[SUPABASE] Failed to save contact submission:', dbError.message || dbError);
      }
    }

    // Send email
    const emailSent = await sendContactEmail({ name, email, message });
    if (!emailSent) {
      throw new Error('Contact email delivery failed.');
    }

    // Redirect with success status
    res.redirect('/contact?status=sent');
  } catch (err) {
    console.error('[CONTACT ERROR]', err);

    const errorMessage = err.code === 'EMAIL_CONFIG_MISSING'
      ? 'Email service is not configured. Please set the SMTP variables and try again.'
      : 'Something went wrong. Please try again later.';

    if (req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'))) {
      return res.status(503).json({ error: errorMessage });
    }

    res.status(err.code === 'EMAIL_CONFIG_MISSING' ? 503 : 500).render('pages/contact', {
      title: 'Contact — Nash Francis',
      currentPage: 'contact',
      status: null,
      errors: [errorMessage],
    });
  }
};
