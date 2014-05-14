'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  projects = require('../models/project')

Backbone.$ = $

module.exports = Backbone.Collection.extend({
  url: 'http://127.0.0.1:31173/doc',
  model: projects
})
