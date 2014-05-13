'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  _ = require('lodash'),
  model = require('../../models/project'),
  template = require('../../../templates/NewProject.hbs'),
  link = require('../../../templates/newProject/link.hbs'),
  image = require('../../../templates/newProject/image.hbs'),
  video = require('../../../templates/newProject/video.hbs'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($)

Backbone.$ = $


module.exports = Backbone.View.extend({
  el: '.main-content',

  initialize: function(){
    console.info('new project view --- initialize')

    this.project = new model()

    this.render()
  },

  events:{
    'click #save': 'save',
    'click #plus-link': 'plusLink',
    'click #plus-image': 'plusImage',
    'click #plus-video': 'plusVideo'
  },

  render: function(){
    this.template = template(this.project.attributes)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);

    return this
  },

  plusLink: function(){
    var count = $('.link').length
    $('#links').append(link({class:'link-'+count}))
  },

  plusImage: function(){
    var count = $('.image').length
    $('#images').append(image({class:'image-'+count}))
  },

  plusVideo: function(){
    var count = $('.video').length
    $('#videos').append(video({class:'image-'+count}))
  },

  save: function(){
    var info = $('#info').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    var imageInput = $('.image')
    var images = []
    _.each(imageInput, function(item){
      var t = $(item).children(':input')

      var image = {
        tile: $(t[0]).val(),
        file: $(t[1]).val()
      }

      images.push(image)
    })

    doc.images = images

    this.project.set(doc)
    console.log(doc)
  }
});
