'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($),
  template = require('../../templates/Settings.hbs'),
  model = require('../models/SettingsModel')

Backbone.$ = $

module.exports = Backbone.View.extend({
  el: '',

  initialize: function(){
    console.info('home Settings --- initialize')

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
    var info = $('#settings-form').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    this.model.save(doc, {
      success: function(model){
        global.cartapacio.collections.settings.add(model)
        global.cartapacio.router.navigate('/', {trigger: true})
      }
    })
  }
})


