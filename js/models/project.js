'use strict';

var $ = require('jquery'),
  Backbone = require('backbone')

Backbone.$ = $

module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  schema: {
    title: 'Text',
    description: 'TextArea'
  },

  defaults:{
    doctype: 'project',
    title: 'title of the project',
    description: 'information about this',
    date: 'the format you prefer',
    links:[
      {
        name: 'where?',
        url: 'url'
      }
    ],
    images:[
      {
        title: 'title or short description',
        file: 'local uri'
      }
    ],
    videos: [
      {
        code: 'embed code given by the provider'
      }
    ]
  }
});

