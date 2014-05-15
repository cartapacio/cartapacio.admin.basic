var $ = require('jquery'),
  Backbone = require('backbone'),
  Router = require('./router'),
  projectsCollection = require('./collections/projects')

Backbone.$ = $

global.cartapacio = {
  router: new Router(),

  collections: {
    projects: new projectsCollection()
  }
}

global.cartapacio.collections.projects.fetch({
  data: {doctype: 'project'},
  success: function(){
    Backbone.history.start()
  }
})



