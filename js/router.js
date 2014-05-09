'use strict';

var $ = require('jquery'),
 Backbone = require('backbone')
Backbone.$ = $

var indexView = require('./views/index.js')

module.exports = Backbone.Router.extend({
  routes:{
    '': 'index',
    'projects': 'projects',
    'bio': 'bio',
    'config': 'config'
  },

  index: function(){
    console.info('router -- home')
    new indexView()
  },

  projects: function(){
    console.info('router -- projects')
  },

  bio: function(){
    console.info('router -- bio')
  },

  config: function(){
    console.info('router -- config')
  }
})
