'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  _ = require('lodash'),
  model = require('../../models/project'),
  template = require('../../../templates/NewProject.hbs'),
  link = require('../../../templates/partials/link.hbs'),
  image = require('../../../templates/partials/image.hbs'),
  video = require('../../../templates/partials/video.hbs'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($),
  grande = require('grande-module')

require('jquery-scrollto')

Backbone.$ = $


module.exports = Backbone.View.extend({
  //el: '.main-content',

  initialize: function(){
    console.info('new project view --- initialize')

    this.model = this.model || new model()

    this.model.on('invalid', this.handleError)

    //this.render()
  },

  events:{
    'click #save': 'save',
    'click #delete': 'delete',
    'click #cancel': 'cancel',

    'click #plus-link': 'plusLink',
    'click #plus-image': 'plusImage',
    'click #plus-video': 'plusVideo',

    'click .delete-link': 'destroyLink',
    'click .delete-video': 'destroyVideo',
    'click .delete-image': 'destroyImage',

    'change .get-file': 'getImage',
    'change .video-input': 'previewVideo'
  },

  render: function(){
    this.template = template(this.model.attributes)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);

    grande.bind(this.$('#description')[0])

    return this
  },

  plusLink: function(){
    var count = $('.link').length
    $('#links').append(link({index: count}))

    $('#link-'+count).ScrollTo()
  },

  plusImage: function(){
    var count = $('.image').length
    $('#images').append(image({index: count}))

    $('#image-'+count).ScrollTo()
  },

  plusVideo: function(){
    var count = $('.video').length
    $('#videos').append(video({index: count}))

    $('#video-'+count).ScrollTo()
  },

  destroyLink: function(e){
    this.$(e.currentTarget).closest('.link').fadeOut('slow', function (){
      $(this).remove()
    })
  },

  destroyVideo: function(e){
    this.$(e.currentTarget).closest('.video').fadeOut('slow', function (){
      $(this).remove()
    })
  },

  destroyImage: function(e){
    this.$(e.currentTarget).closest('.image').fadeOut('slow', function (){
      $(this).remove()
    })
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
      $(e.target).closest('.image').find('img').attr({src: reader.result, 'data-src': reader.result})
    }

  },

  previewVideo: function(e){
    var value = $(e.target).val()
    $(e.target).parent().find('.video-preview').html(value)
  },

  save: function(){
    // clean validation feedback
    $('#title, #date, #description').parent().removeClass('has-error')

    var info = $('#info').serializeArray()
    var doc = serializer.addPairs(info).serialize()

    doc.description = this.$('#description')[0].innerHTML

    var imageInput = $('.image')
    var images = []
    _.each(imageInput, function(item){
      var t = $(item).find(':input')

      var image = {
        title: $(t[0]).val(),
        file: $(t[0]).closest('.image').find('img').attr('data-src')
      }

      if(image.file){
        images.push(image)
      }
    })

    doc.images = images

    //this.model.set(doc)
    //console.log(this.model.attributes.images)
    this.model.save(doc,{
      success: function(model){
        global.cartapacio.collections.projects.add(model)
        global.cartapacio.router.navigate('/projects', {trigger: true})
      }
    })
  },

  delete: function(){
    this.model.destroy({
      success: function(){
        global.cartapacio.router.navigate('/projects', {trigger: true})
      }
    })
  },

  cancel: function(){
    global.cartapacio.router.navigate('/projects', {trigger: true})
  }
});
