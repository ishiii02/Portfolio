'use strict';
const ExperienceModel = require('../models/experience.model');
exports.getExperiencePage = (req, res) => {
  const experience = ExperienceModel.getAll();
  res.render('pages/experience', { title: 'Experience — Nash Francis', currentPage: 'experience', experience });
};
