'use strict';

require('dotenv').config();
const app    = require('./app');
const config = require('./config/app.config');

app.listen(config.port, () => {
  console.log(`
  ┌────────────────────────────────────────┐
  │   Nash Francis Portfolio               │
  │   Running on http://localhost:${config.port}    │
  │   Environment: ${config.env.padEnd(22)}│
  └────────────────────────────────────────┘
  `);
});
