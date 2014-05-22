'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($),
  model = require('../../models/NewsModel'),
  template = require('../../../templates/NewNews.hbs')

Backbone.$ = $

module.exports = Backbone.View.extend({

  initialize: function(){
    console.info('home NewNews --- initialize')

    this.model = this.model || new model()
  },

  events:{
    'click #save' : 'new'
  },

  render: function(){
    this.template = template(this.model.attributes)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);
    return this
  },

  new: function(){
    //$('#title, #date, #description').parent().removeClass('has-error')

    var info = $('#news-form').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    doc.date = new Date()

    this.model.save(doc,{
      success: function(model){
        global.cartapacio.collections.news.add(model)
        //global.cartapacio.collections.news.sort()

        global.cartapacio.router.navigate('/news', {trigger: true})
      }
    })
  }

})


