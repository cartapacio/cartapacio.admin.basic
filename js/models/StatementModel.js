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
    doctype: 'statement',
    statement: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, eum minima facilis in culpa facere quia iusto placeat pariatur qui tenetur provident recusandae repellendus laborum et est porro ducimus ab?'
  },

  // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
  validate: function(attrs) {

  }

})
