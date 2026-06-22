'use strict';

exports.getAboutPage = (req, res) => {
  res.render('pages/about', { title: 'About — Nash Francis' });
};
