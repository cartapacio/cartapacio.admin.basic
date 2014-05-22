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
  },

  events:{
    'click #save': 'save',
    'change .get-file': 'getFile',
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

  getFile: function(e){
    var file = e.target.files[0],
      reader  = new FileReader(),
      self = this

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      if(e.target.id === 'portrait'){
        $(e.target).closest('.image').find('img').attr({src: reader.result, 'data-src': reader.result})
        self.model.set({portrait: reader.result})
      } else {
        self.model.set({full_cv: reader.result})
      }

      console.log(self.model)
    }

  },

  save: function(){
    // clean validation feedback
    //$('#title, #date, #description').parent().removeClass('has-error')

    var info = $('#info').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    this.model.set(doc)
    //console.log(this.model.attributes.images)
    this.model.save(doc,{
      success: function(model){
        global.cartapacio.collections.bio.add(model)
        global.cartapacio.router.navigate('/', {trigger: true})
      }
    })
  }
})


