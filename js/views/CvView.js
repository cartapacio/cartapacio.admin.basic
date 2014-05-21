'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($),
  template = require('../../templates/Cv.hbs'),
  exhibition = require('../../templates/exhibition.hbs'),
  model = require('../models/CvModel')

Backbone.$ = $

module.exports = Backbone.View.extend({

  initialize: function(){
    console.info('home Cv --- initialize')

    this.model= this.model || new model()

    console.log(this.model.attributes)
  },

  events:{
    'click #save': 'save',
    'click #plus-exhibition': 'plusExhibition'
  },

  render: function(){
    this.template = template(this.model.attributes)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);

    return this
  },

  plusExhibition: function(){
    var count = $('.exhibition').length
    $('#exhibitions').append(exhibition({class:'exhibition-'+count}))
  },

  save: function(){
    // clean validation feedback
    //$('#title, #date, #description').parent().removeClass('has-error')

    var info = $('#info').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    console.log(doc)

    // var imageInput = $('.image')
    // var images = []
    // _.each(imageInput, function(item){
    //   var t = $(item).find(':input')

    //   var image = {
    //     title: $(t[0]).val(),
    //     file: $(t[0]).closest('.image').find('img').attr('src')
    //   }

    //   images.push(image)
    // })

    // doc.images = images

    this.model.set(doc)
    //console.log(this.model.attributes.images)
    this.model.save(doc,{
      success: function(model){
        global.cartapacio.collections.bio.add(model)
        //global.cartapacio.router.navigate('/', {trigger: true})
      }
    })
  }
})


