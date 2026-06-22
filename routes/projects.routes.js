'use strict';
const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/projects.controller');

router.get('/',    controller.getAllProjects);
router.get('/:id', controller.getProjectById);

module.exports = router;
