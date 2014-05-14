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

    this.project.on('invalid', this.handleError)

    this.render()
  },

  events:{
    'click #save': 'save',
    'click #plus-link': 'plusLink',
    'click #plus-image': 'plusImage',
    'click #plus-video': 'plusVideo',
    'change .get-file': 'getImage'
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

  handleError: function(model, err){
    _.each(err, function (item){
      $('#'+item.id).parent().toggleClass('has-error')
    })
  },

  getImage: function(e){
    var file = e.target.files[0],
      reader  = new FileReader()

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      $(e.target).closest('.image').find('img').attr('src', reader.result)
    }

  },

  save: function(){
    // clean validation feedback
    $('#title, #date, #description').parent().removeClass('has-error')

    var info = $('#info').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    var imageInput = $('.image')
    var images = []
    _.each(imageInput, function(item){
      var t = $(item).find(':input')

      var image = {
        tile: $(t[0]).val(),
        file: $(t[0]).closest('.image').find('img').attr('src')
      }

      images.push(image)
    })

    doc.images = images

    this.project.set(doc)
    //console.log(this.project.attributes.images)
    this.project.save()
  }
});
