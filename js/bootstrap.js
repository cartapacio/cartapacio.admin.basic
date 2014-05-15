'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  Router = require('./router'),
  projectsCollection = require('./collections/projects')

Backbone.$ = $

global.cartapacio = {
  collections: {
    projects: new projectsCollection()
  }
}



module.exports = {
  init: function () {
    global.cartapacio.collections.projects.fetch({
      data: {doctype: 'project'},

      success: function(){
        global.cartapacio.router = new Router()
        Backbone.history.start()
      }
    })
  }
}



