'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($),
  grande = require('grande-module'),
  template = require('../../templates/Cv.hbs'),
  exhibition = require('../../templates/partials/exhibition.hbs'),
  model = require('../models/CvModel')

require('jquery-scrollto')

Backbone.$ = $

module.exports = Backbone.View.extend({

  initialize: function(){
    console.info('home Cv --- initialize')

    this.model = this.model || new model()
  },

  events:{
    'click #save': 'save',
    'click .delete-exhibition': 'destroyExhibition',
    'change .get-file': 'getFile',
    'click #plus-exhibition': 'plusExhibition'
  },

  render: function(){
    this.template = template(this.model.attributes)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);

    grande.bind(this.$('#bio')[0])

    return this
  },

  plusExhibition: function(){
    var count = $('.exhibition').length
    $('#exhibitions').append(exhibition({id:count}))

    $('#exhibition-'+count).ScrollTo()
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
    }

  },

  save: function(){
    // clean validation feedback
    //$('#title, #date, #description').parent().removeClass('has-error')

    var info = $('#info').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    doc.bio = this.$('#bio')[0].innerHTML

    //console.log(this.model.attributes.images)
    this.model.save(doc,{
      success: function(model){
        global.cartapacio.collections.bio.add(model)
        global.cartapacio.router.navigate('/', {trigger: true})
      }
    })
  },

  destroyExhibition: function(e){
    this.$(e.currentTarget).closest('.exhibition').fadeOut('slow', function (){
      $(this).remove()
    })
  },
})


