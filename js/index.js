'use strict';

var $ = require('jquery'),
  Backbone = require('backbone')

Backbone.$ = $

var Router = require('./router'),
  router = new Router()

Backbone.history.start()
