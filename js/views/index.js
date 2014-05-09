'use strict';

var $ = require('jquery'),
  Backbone = require('backbone')
Backbone.$ = $

var HomeTemplate = require('../../templates/Home.hbs')

module.exports = Backbone.View.extend({
  el: '.main-content',

  initialize: function(){
    console.info('home view --- initialize')
    this.render()
  },

  events:{
    'click .action': 'action'
  },

  render: function(){
    this.template = HomeTemplate()
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);
    return this
  },

  action: function(e){
    var where = e.currentTarget.id
    window.cartapacio.router.navigate(where, {trigger: true})
  }
})


