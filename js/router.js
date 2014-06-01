'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  url = require('url'),
  config = require('./config')

Backbone.$ = $

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
}

var indexView = require('./views/index'),
  projectsView = require('./views/projects/projects'),
  newProject = require('./views/projects/newProject'),
  cvView = require('./views/CvView'),
  newsView = require('./views/news/newsView'),
  newNews = require('./views/news/newNewsView'),
  settingsView = require('./views/SettingsView'),
  statementView = require('./views/StatementView'),
  DbConfig = require('./views/FileExplorerView'),
  Navbar = require('./views/NavbarView')

module.exports = Backbone.Router.extend({
  routes:{
    '': 'index',

    'projects': 'projects',
    'project/new' : 'newProject',
    'project/:id' : 'project',

    'news': 'news',
    'news/new' : 'newNews',
    'news/:id' : 'newsDetail',

    'bio': 'bio',
    'statement': 'statement',
    'settings': 'settings',
    'dbConfig': 'dbConfig',

    'build': 'build',
    'upload': 'upload'
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

  news: function(){
    console.info('router -- news')

    this.appView(new newsView({
      collection: global.cartapacio.collections.news
    }))
  },

  newNews: function(){
    console.info('router -- new news')
    this.appView(new newNews())
  },

  newsDetail: function(id){
    console.info('router --  news id: ', id)
    var model = global.cartapacio.collections.news.get(id)
    this.appView(new newNews({model:model}))
  },

  settings: function(){
    console.info('router -- settings')

    var collection = global.cartapacio.collections.settings
    var model = null

    if (collection.length > 0 ){
      model= collection.get(collection.models[0].attributes._id)
    }

    this.appView(new settingsView({model: model}))
  },

  statement: function(){
    console.info('router -- statement')

    var collection = global.cartapacio.collections.statement
    var model = null

    if (collection.length > 0 ){
      model= collection.get(collection.models[0].attributes._id)
    }

    this.appView(new statementView({model: model}))
  },

  dbConfig: function(){
    console.info('router -- dbconfig')
    this.appView(new DbConfig())
  },

  build: function(){
    console.info('router -- build ')
    $.ajax({
      url: url.resolve(config.CARTAPACIO_SERVER, 'build'),
      type: 'get',
      success: function (data) {
        // TODO: update ui
        console.warn('build done!');
      },
      error: function(data){
        // TODO: update ui
        console.warn('build error!');
      }
    })
  },

  upload: function(){
    console.info('router -- upload ')
    $.ajax({
      url: url.resolve(config.CARTAPACIO_SERVER, 'upload'),
      type: 'get',
      success: function (data) {
        // TODO: update ui
        console.warn('build done!');
      },
      error: function(data){
        // TODO: update ui
        console.warn('build error!');
      }
    })
  },

  appView: function(view){
    var self = this
    if (this.currentView){
      self.currentView.close();
    }

    if(this.navbar){
      self.navbar.close()
    }

    this.navbar = new Navbar()
    $('#nav-content').html(this.navbar.el)

    this.currentView = view;
    this.currentView.render();
    $('.main-content').html(this.currentView.el);

  }
})
