'use strict';

var $ = require('jquery'),
 Backbone = require('backbone')
Backbone.$ = $

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
}

var indexView = require('./views/index'),
  projectsView = require('./views/projects/projects'),
  newProject = require('./views/projects/newProject'),
  cvView = require('./views/CvView')

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

    this.appView(new indexView())
  },

  projects: function(){
    console.info('router -- projects')

    this.appView(new projectsView({
      collection: global.cartapacio.collections.projects
    }))
  },

  newProject: function(){
    console.info('router -- new project')
    this.appView(new newProject())
  },

  project: function(id){
    console.info('router --  project id: ', id)
    var model = global.cartapacio.collections.projects.get(id)
    this.appView(new newProject({model:model}))
  },

  bio: function(){
    console.info('router -- bio')
    var collection = global.cartapacio.collections.bio
    var model = null

    if (collection.length > 0 ){
      model= collection.get(collection.models[0].attributes._id)
    }

    this.appView(new cvView({model: model}))
  },

  config: function(){
    console.info('router -- config')
  },

  appView: function(view){
    var self = this
    if (this.currentView){
      self.currentView.close();
    }

    this.currentView = view;
    this.currentView.render();
    $(".main-content").html(this.currentView.el);
  }
})
