'use strict';
const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/contact.controller');

router.get('/',  controller.getContactPage);
router.post('/', controller.postContactForm);

module.exports = router;
