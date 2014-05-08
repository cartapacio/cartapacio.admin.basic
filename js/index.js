'use strict';

var page = require('page'),
  $ = require('jquery'),
  index = require('./views/index'),
  project = require('./views/project'),
  projects = require('./views/projects'),
  cv = require('./views/cv')


// routes
page('/', index)
page('/projects', projects)
page('/project/new', project.newProject)
page('/cv', cv)
page('*', notfound)
page();

function notfound () {
  $('.main-content').html('404 not found')
}
