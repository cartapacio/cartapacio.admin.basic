'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  Form = require('backbone-forms'),
  model = require('../../models/project'),
  Template = require('../../../templates/NewProject.hbs'),
  formTemplate = require('../../../templates/NewProjectForm.hbs')

Backbone.$ = $

module.exports = Backbone.View.extend({
  el: '.main-content',

  initialize: function(){
    console.info('new project view --- initialize')

    this.project = new model()
    this.form = new Form({
      template: formTemplate,
      model: this.project
    }).render()

    this.render()
  },

  events:{
    'click #save': 'save'
  },

  render: function(){
    this.template = Template()
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);


    $('#form').html(this.form.el)

    return this
  },

  save: function(){
    console.log(this.form.commit())
    console.log(this.project)
    this.project.save()
  }
});
