'use strict';

const nodemailer = require('nodemailer');
const mailerConfig = require('../config/mailer.config');
const appConfig = require('../config/app.config');

function createTransporter() {
  const config = mailerConfig.getMailerConfig();
  if (!config) {
    return null;
  }

  return nodemailer.createTransport(config);
}

/**
 * Send a contact form email
 * @param {Object} params - Email parameters
 * @param {string} params.name - Sender's name
 * @param {string} params.email - Sender's email
 * @param {string} params.message - Message content
 * @returns {Promise<boolean>} Success status
 */
async function sendContactEmail({ name, email, message }) {
  try {
    const ownerMailOptions = {
      from: process.env.SMTP_USER || 'noreply@nashfrancis.dev',
      to: appConfig.owner.email,
      replyTo: email,
      subject: `New Contact Form Submission from ${escapeHtml(name)}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from your portfolio contact form.</em></p>
      `,
    };

    const transporter = createTransporter();
    if (!transporter) {
      const missingVars = mailerConfig.getMissingMailerVars();
      const err = new Error(
        `Email service is not configured. Missing SMTP environment variable(s): ${missingVars.join(', ')}.`
      );
      err.code = 'EMAIL_CONFIG_MISSING';
      throw err;
    }

    // Verify SMTP connection before sending messages so failures are caught early.
    try {
      await transporter.verify();
    } catch (verificationError) {
      verificationError.code = verificationError.code || 'EMAIL_TRANSPORT_ERROR';
      throw verificationError;
    }

    // Send only the owner notification email.
    await transporter.sendMail(ownerMailOptions);

    console.log(`[MAIL] Contact form email sent from ${email} to ${appConfig.owner.email}`);
    return true;
  } catch (err) {
    console.error('[MAIL ERROR]', err);
    if (err && err.stack) {
      console.error(err.stack);
    }
    if (!err.code) {
      err.code = 'EMAIL_TRANSPORT_ERROR';
    }
    throw err;
  }
}

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, char => htmlEscapeMap[char]);
}

module.exports = { sendContactEmail };
