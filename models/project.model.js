'use strict';

const projects = require('../data/projects.json');

function getAll()    { return projects; }
function getFeatured() { return projects.filter(p => p.featured); }
function getById(id) { return projects.find(p => p.id === id) || null; }

module.exports = { getAll, getFeatured, getById };
