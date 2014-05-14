'use strict';

var $ = require('jquery'),
  Backbone = require('backbone')

Backbone.$ = $

module.exports = Backbone.Model.extend({
  url: 'http://127.0.0.1:31173/doc',

  idAttribute: '_id',

  defaults:{
    doctype: 'project',
    title: 'title of the project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, quisquam, error odit veniam obcaecati blanditiis fugit nostrum possimus quas totam mollitia quos sed nobis ab minus optio quo praesentium fuga.',
    date: 'the format you prefer',
    links:[],
    images:[],
    videos: []
  }
});

