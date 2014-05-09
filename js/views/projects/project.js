'use strict';

var $ = require('jquery'),
  forms = require('browser-forms'),
  page = require('page'),
  fields = forms.fields,
  widgets = forms.widgets,
  validators = forms.validators


var newProject = function () {
  var projectForm = forms.create({
    title: fields.string({ required: true }),
    description: fields.string({
      widget: widgets.textarea()
    }),
  })

  var formEl = document.getElementById('new-project')


  $(formEl).html(projectForm.toHTML())

  projectForm.attach(formEl)

  $('#save').click(function(e){
    e.preventDefault()

    var data = {
      title: $('#id_title').val(),
      description: $('#id_description').val()
    }

    //save data
    console.log("data",data)

    page('/projects')

  })
}

// projectForm:

module.exports.newProject = newProject
