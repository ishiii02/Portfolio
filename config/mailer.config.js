'use strict';

const requiredEnv = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};

const missingVars = Object.entries(requiredEnv)
  .filter(([, value]) => value === undefined || value === null || value === '')
  .map(([key]) => key);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required SMTP environment variable(s): ${missingVars.join(', ')}. ` +
    'Please set these in your environment or Vercel dashboard before starting the app.'
  );
}

module.exports = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
