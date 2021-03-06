'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  Template = require('../../templates/Home.hbs')

Backbone.$ = $

module.exports = Backbone.View.extend({
  //el: '.main-content',

  initialize: function(){
    console.info('home view --- initialize')

  },

  events:{
    'click .action': 'action'
  },

  render: function(){
    this.template = Template()
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);

    return this
  },

  action: function(e){
    var where = e.currentTarget.id
    global.cartapacio.router.navigate(where, {trigger: true})
  }
})


