'use strict';

// Nodemailer integration added in Phase 6
async function sendContactEmail({ name, email, message }) {
  console.log(`[MAIL STUB] From: ${name} <${email}> — ${message}`);
  return true;
}

module.exports = { sendContactEmail };
