'use strict';

function getMailerConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    auth: { user, pass },
  };
}

function getMissingMailerVars() {
  return [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
  ].filter(key => !process.env[key]);
}

module.exports = {
  getMailerConfig,
  getMissingMailerVars,
};
