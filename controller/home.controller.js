'use strict';

const ProjectModel = require('../models/project.model');

exports.getHomePage = (req, res) => {
  const featured = ProjectModel.getFeatured();
  res.render('pages/home', { title: 'Nash Francis — Full-Stack Developer', featured });
};
