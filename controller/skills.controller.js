'use strict';

const SkillModel = require('../models/skill.model');

exports.getSkillsPage = (req, res) => {
  const skills = SkillModel.getAll();
  res.render('pages/skills', { title: 'Skills — Nash Francis', skills });
};
