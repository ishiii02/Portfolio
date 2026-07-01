'use strict';

const REQUIRED_SMTP_VARS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];

function getMissingMailerVars() {
  return REQUIRED_SMTP_VARS.filter((key) => {
    const value = process.env[key];
    return value === undefined || value === null || String(value).trim() === '';
  });
}

function isMailerConfigured() {
  return getMissingMailerVars().length === 0;
}

function getMailerConfig() {
  const missingVars = getMissingMailerVars();
  if (missingVars.length > 0) {
    return null;
  }

  const port = parseInt(process.env.SMTP_PORT, 10);

  return {
    host: process.env.SMTP_HOST,
    port: Number.isNaN(port) ? 587 : port,
    secure: parseInt(process.env.SMTP_PORT, 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
}

module.exports = {
  getMailerConfig,
  getMissingMailerVars,
  isMailerConfigured,
};
