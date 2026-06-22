'use strict';

const express    = require('express');
const router     = express.Router();

router.use('/',           require('./home.routes'));
router.use('/about',      require('./about.routes'));
router.use('/skills',     require('./skills.routes'));
router.use('/projects',   require('./projects.routes'));
router.use('/experience', require('./experience.routes'));
router.use('/contact',    require('./contact.routes'));

module.exports = router;
