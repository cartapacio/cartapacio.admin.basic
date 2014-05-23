'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  projects = require('../models/project'),
  config = require('../config')

Backbone.$ = $

module.exports = Backbone.Collection.extend({
  url: config.CARTAPACIO_SERVER + '/doc',
  model: projects,
  comparator: 'order'
})
