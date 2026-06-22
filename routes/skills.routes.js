'use strict';
const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/skills.controller');

router.get('/', controller.getSkillsPage);

module.exports = router;
