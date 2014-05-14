var $ = require('jquery'),
  Backbone = require('backbone'),
  Router = require('./router'),
  projectsCollection = require('./collections/projects')

Backbone.$ = $

window.cartapacio = {}

window.cartapacio.router = new Router()

// collections
var projects = new projectsCollection()
projects.fetch({data: {doctype: 'project'}})

window.cartapacio.collections = {
  projects: projects
}

Backbone.history.start()

