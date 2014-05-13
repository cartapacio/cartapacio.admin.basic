'use strict';

var $ = require('jquery'),
  Backbone = require('backbone')

Backbone.$ = $

module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  defaults:{
    doctype: 'project',
    title: 'title of the project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, quisquam, error odit veniam obcaecati blanditiis fugit nostrum possimus quas totam mollitia quos sed nobis ab minus optio quo praesentium fuga.',
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

