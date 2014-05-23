'use strict';

var $ = require('jquery'),
  _ = require('lodash'),
  Backbone = require('backbone'),
  template = require('../../../templates/Projects.hbs')

require('jquery-ui/sortable')

Backbone.$ = $

module.exports = Backbone.View.extend({

  initialize: function(){
    console.info('projects view --- initialize')
  },

  events:{
    'click #new': 'new',
    'click .datail': 'detail',
    'click .delete': 'delete'
  },

  render: function(){
    this.template = template({models:this.collection.models})
    this.$el.html(this.template)

    var self = this

    this.$('#project-list').sortable({
      axis: "y",
      update: function (){
        self.sort($(this).sortable('toArray'))
      }
    })
    this.$('#project-list').disableSelection()

    return this
  },

  sort: function(order){
    _.each(order, function (item, index){
      var model = this.collection.get(item)
      model.set({order: index})
      model.save()
    }, this)
  },

  delete: function(e){
    var target = $(e.currentTarget).attr('data-id')
    var project = this.collection.get(target)

    project.destroy({
      wait: true,
      success: function(){
         $(e.currentTarget).closest('li').remove()
      }
    })
  },

  detail: function(e){
    var target = $(e.currentTarget).attr('data-id')
    global.cartapacio.router.navigate('project/'+target, {trigger: true})
  },

  new: function(){
    global.cartapacio.router.navigate('project/new', {trigger: true})
  }
});
