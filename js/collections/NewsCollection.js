'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  model = require('../models/NewsModel'),
  config = require('../config')

Backbone.$ = $

module.exports = Backbone.Collection.extend({
  url: config.CARTAPACIO_SERVER + '/doc',

  model: model,

  comparator: '-date'
})
