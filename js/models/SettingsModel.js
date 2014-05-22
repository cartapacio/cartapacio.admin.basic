'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  config = require('../config')


Backbone.$ = $

module.exports = Backbone.Model.extend({

  urlRoot: config.CARTAPACIO_SERVER + '/doc',

  idAttribute: '_id',

  // Model Constructor
  initialize: function() {

  },

  // Default values for all of the Model attributes
  defaults: {
    doctype: 'settings',
    author: 'author name',
    siteName: 'site name',
    url: 'http://myawesomeportfolio.com'
    //ftp: []
  },

  // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
  validate: function(attrs) {

  }

})
