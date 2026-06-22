'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  env:  process.env.NODE_ENV || 'development',
  owner: {
    name:  process.env.OWNER_NAME  || 'Nash Francis',
    email: process.env.OWNER_EMAIL || 'nashfrancis@example.com',
  },
};
