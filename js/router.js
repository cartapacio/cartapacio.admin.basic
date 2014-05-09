'use strict';

var $ = require('jquery'),
 Backbone = require('backbone')
Backbone.$ = $

var indexView = require('./views/index.js'),
  projectsView = require('./views/projects/projects.js'),
  newProject = require('./views/projects/newProject.js')

module.exports = Backbone.Router.extend({
  routes:{
    '': 'index',

    'projects': 'projects',
    'project/new' : 'newProject',
    'project/:id' : 'project',

    'bio': 'bio',
    'config': 'config'
  },

  index: function(){
    console.info('router -- home')
    new indexView()
  },

  projects: function(){
    console.info('router -- projects')
    new projectsView()
  },

  newProject: function(){
    console.info('router -- new project')
    new newProject()
  },

  project: function(id){
    console.info('router --  project id: ', id)
    //new newProject()
  },

  bio: function(){
    console.info('router -- bio')
  },

  config: function(){
    console.info('router -- config')
  }
})
