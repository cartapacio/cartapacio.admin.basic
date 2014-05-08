'use strict';

var $ = require('jquery'),
 Backbone = require('backbone')

Backbone.$ = $

module.exports = Backbone.Router.extend({
  routes:{
    '': 'index'
  },

  index: function(){
    console.info('router -- home')
  }
})
