'use strict';
const ProjectModel = require('../models/project.model');
exports.getAllProjects = (req, res) => {
  const projects = ProjectModel.getAll();
  res.render('pages/projects', { title: 'Projects — Nash Francis', currentPage: 'projects', projects });
};
exports.getProjectById = (req, res, next) => {
  const project = ProjectModel.getById(req.params.id);
  if (!project) return next();
  res.render('pages/project-detail', { title: `${project.title} — Nash Francis`, currentPage: 'projects', project });
};
