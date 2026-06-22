'use strict';

const express        = require('express');
const router         = express.Router();
const controller     = require('../controllers/contact.controller');
const { contactRules } = require('../services/validation.service');

router.get('/', controller.getContactPage);
router.post('/', contactRules, controller.postContactForm);

module.exports = router;
