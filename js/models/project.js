'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  config = require('../config')

Backbone.$ = $

module.exports = Backbone.Model.extend({
  urlRoot: config.CARTAPACIO_SERVER + '/doc',

  idAttribute: '_id',

  defaults:{
    doctype: 'project',
    order: 0,
    title: 'title of the project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, repellendus, ad, non ipsam accusamus magnam dolore quae pariatur doloribus repellat laborum ex possimus explicabo id nesciunt. Autem, perferendis amet repellendus.',
    date: 'the format you prefer',
    links:[],
    images:[],
    videos: []
  },

  validate: function(attrs){
    var errors = []

    if(!attrs.title){
      errors.push({
        id: 'title',
        msg: 'empty title'
      })
    }

    if(!attrs.date){
      errors.push({
        id: 'date',
        msg: 'empty date'
      })
    }

    if(!attrs.description){
      errors.push({
        id: 'description',
        msg: 'empty date'
      })
    }

    return errors.length > 0 ? errors : false
  }
});

