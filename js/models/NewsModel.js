'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  config = require('../config')

Backbone.$ = $

module.exports = Backbone.Model.extend({

  urlRoot: config.CARTAPACIO_SERVER + '/doc',

  idAttribute: '_id',

  // Default values for all of the Model attributes
  defaults: {
    doctype: 'news',
    title: 'Title',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, qui nostrum suscipit quas exercitationem. Est, officiis illum quisquam doloremque debitis pariatur delectus praesentium! Quis, assumenda laboriosam ipsum possimus earum maxime.',
    date: new Date()
  },

  // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
  validate: function(attrs) {

  }

})
