'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  Template = require('../../../templates/Projects.hbs')

Backbone.$ = $

module.exports = Backbone.View.extend({
  el: '.main-content',

  initialize: function(){
    console.info('projects view --- initialize')
    this.render()
  },

  events:{
    'click #new': 'new'
  },

  render: function(){
    this.template = Template()
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);
    return this
  },

  new: function(){
    window.cartapacio.router.navigate('project/new', {trigger: true})
  }
});
