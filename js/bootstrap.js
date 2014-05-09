var $ = require('jquery'),
  Backbone = require('backbone'),
  Datastore = require('nedb'),
  Router = require('./router')

Backbone.$ = $

window.cartapacio = {}

window.cartapacio.router = new Router()

window.cartapacio.db = new Datastore({
    filename: 'test.db',
    autoload: true
})

require('nedbone')(Backbone, window.cartapacio.db)


Backbone.history.start()

