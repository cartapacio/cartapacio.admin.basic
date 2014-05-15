'use strict';

var $ = require('jquery'),
 Backbone = require('backbone')
Backbone.$ = $

var indexView = require('./views/index'),
  projectsView = require('./views/projects/projects'),
  newProject = require('./views/projects/newProject')

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
    var v = new indexView()
  },

  projects: function(){
    console.info('router -- projects')
    var v = new projectsView({
      collection: global.cartapacio.collections.projects
    })
  },

  newProject: function(){
    console.info('router -- new project')
    var v = new newProject()
  },

  project: function(id){
    console.info('router --  project id: ', id)
    var model = global.cartapacio.collections.projects.get(id)
    var v = new newProject({model:model})
  },

  bio: function(){
    console.info('router -- bio')
  },

  config: function(){
    console.info('router -- config')
  }
})
