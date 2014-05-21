'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  config = require('../config')

Backbone.$ = $

module.exports = Backbone.Model.extend({

  urlRoot: config.CARTAPACIO_SERVER + '/doc',

  // Model Constructor
  initialize: function() {

  },

  // Default values for all of the Model attributes
  defaults: {
    doctype: 'cv',
    name: 'name',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, labore, modi, possimus, adipisci laudantium aspernatur quia ipsa iusto perferendis quibusdam tenetur sed inventore iure provident aut quae odit esse fuga.',
    portrait: '',
    full_cv: '',
    exhibitions: []
  },

  // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
  validate: function(attrs) {

  }

})
