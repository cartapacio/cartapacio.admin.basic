'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  template = require('../../templates/Navbar.hbs')

Backbone.$ = $

module.exports = Backbone.View.extend({
  el: '',

  initialize: function(){
    console.info('home Navbar --- initialize')
    this.render()
  },

  events:{
    'click .main-nav': 'goto'
  },

  render: function(){
    this.template = template()
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);
    return this
  },

  goto: function(e){
    e.preventDefault()

    var to = $(e.currentTarget).attr('data-href')
    global.cartapacio.router.navigate(to, {trigger: true})
  }

})


