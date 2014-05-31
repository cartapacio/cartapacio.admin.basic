'use strict';

var $ = require('jquery'),
  url = require('url'),
  Backbone = require('backbone'),
  template = require('../../templates/FileExplorer.hbs'),
  config = require('../config')

Backbone.$ = $

module.exports = Backbone.View.extend({
  el: '',

  initialize: function(){
    console.info('home FileExplorer --- initialize')
    this.query()
  },

  events:{
    'click .folder' : 'update',
    'click .select' : 'select',
    'click #save' : 'save',
  },

  render: function(data){
    this.template = template(data)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);
    console.log(this.el);
    return this
  },

  query: function(){
    var path = arguments[0] || '',
      self = this,
      endPoint = url.resolve(config.CARTAPACIO_SERVER, '/explorer/')

      console.log(endPoint);

    $.ajax({
      url: endPoint,
      data: {path:path},
      success: function(data){
        self.render(data)
      }
    })
  },

  update: function(e){
    var path = this.$(e.currentTarget).attr('data-path')
    this.query(path)
    $('#file-explorer').append(this.el)
  },

  select: function(e){
    this.folder = this.$(e.currentTarget).attr('data-path')
    this.$('li').removeClass('selected')
    this.$(e.currentTarget).closest('li').toggleClass('selected')
  },

  save: function(){
    var self = this

    $.ajax({
      type: 'POST',
      url : url.resolve(config.CARTAPACIO_SERVER, 'dbConfig'),
      data: {path: self.folder},
      success: function(data){
        if (data.status === 200){
          global.cartapacio.router.navigate('/', {trigger: true})
        }
      },
      error: function(data){
        console.info(data);
      }
    })
  }

})


