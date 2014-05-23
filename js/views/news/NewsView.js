'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  _ = require('lodash'),
  template = require('../../../templates/News.hbs')

Backbone.$ = $

module.exports = Backbone.View.extend({

  initialize: function(){
    console.info('home News --- initialize')
  },

  events:{
    'click #new': 'new',
    'click .datail': 'detail',
    'click .delete': 'delete'
  },

  render: function(){
    // TODO: order after add a new item
    this.template = template({models:this.collection.models})
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);
    return this
  },

  delete: function(e){
    var target = $(e.currentTarget).attr('data-id')
    var news = this.collection.get(target)

    news.destroy({
      wait: true,
      success: function(){
         $(e.currentTarget).closest('li').remove()
      }
    })
  },

  detail: function(e){
    var target = $(e.currentTarget).attr('data-id')
    global.cartapacio.router.navigate('news/'+target, {trigger: true})
  },

  new: function(){
    global.cartapacio.router.navigate('news/new', {trigger: true})
  }

})


