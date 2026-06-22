'use strict';

require('dotenv').config();

const app = require('./app');
const config = require('./config/app.config');

const server = app.listen(config.port, () => {
  console.log(`
┌────────────────────────────────────────┐
│   Nash Francis Portfolio               │
│   Running on http://localhost:${config.port}
│   Environment: ${config.env}
└────────────────────────────────────────┘
`);
});

server.on('error', (err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});