'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  grande = require('grande-module'),
  template = require('../../templates/Statement.hbs'),
  model = require('../models/StatementModel')

Backbone.$ = $

module.exports = Backbone.View.extend({
  el: '',

  initialize: function(){
    console.info('home Statement --- initialize')

    this.model = this.model || new model()
  },

  events:{
    'click #save': 'save'
  },

  render: function(){
    this.template = template(this.model.attributes)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);
    grande.bind(this.$('#statement')[0])

    return this
  },

  save: function(){
    var doc = {
      statement: this.$('#statement')[0].innerHTML
    }

    this.model.save(doc, {
      success: function(model){
        global.cartapacio.collections.statement.add(model)
        global.cartapacio.router.navigate('/', {trigger: true})
      }
    })
  }

})


