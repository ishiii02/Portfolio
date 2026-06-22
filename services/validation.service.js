'use strict';

const { body } = require('express-validator');

const contactRules = [
  body('name')
    .trim().escape()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters.'),
  body('email')
    .trim().normalizeEmail()
    .isEmail().withMessage('A valid email address is required.'),
  body('message')
    .trim().escape()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters.'),
  body('honeypot')
    .isEmpty().withMessage('Bot detected.'),
];

module.exports = { contactRules };
