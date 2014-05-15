'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  template = require('../../../templates/Projects.hbs')

Backbone.$ = $

module.exports = Backbone.View.extend({
  //el: '.main-content',

  initialize: function(){
    console.info('projects view --- initialize')

    //this.render()
  },

  events:{
    'click #new': 'new',
    'click .datail': 'detail',
    'click .delete': 'delete'
  },

  render: function(){
    this.template = template({models:this.collection.models})
    this.$el.html(this.template)

    console.log(this.collection)

    return this
  },

  delete: function(e){
    var target = $(e.currentTarget).attr('data-id')
    var project = this.collection.get(target)

    project.destroy({
      wait: true,
      success: function(){
         $(e.currentTarget).closest('tr').remove()
      }
    })
  },

  detail: function(e){
    var target = $(e.currentTarget).attr('data-id')
    window.cartapacio.router.navigate('project/'+target, {trigger: true})
  },

  new: function(){
    window.cartapacio.router.navigate('project/new', {trigger: true})
  }
});
