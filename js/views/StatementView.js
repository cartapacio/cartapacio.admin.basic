'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($),
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
    return this
  },

  save: function(){
    var info = $('#statement-form').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    this.model.save(doc, {
      success: function(model){
        global.cartapacio.collections.statement.add(model)
        global.cartapacio.router.navigate('/', {trigger: true})
      }
    })
  }

})


