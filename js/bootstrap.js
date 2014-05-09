var $ = require('jquery'),
  Backbone = require('backbone'),
  Router = require('./router')

Backbone.$ = $

window.cartapacio = {}

window.cartapacio.router = new Router()


Backbone.history.start()

