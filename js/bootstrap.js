'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  async = require('async'),
  Router = require('./router'),
  projectsCollection = require('./collections/projects'),
  cvCollection = require('./collections/CvCollection'),
  newsCollection = require('./collections/NewsCollection')

Backbone.$ = $

global.cartapacio = {
  collections: {
    projects: new projectsCollection(),
    bio: new cvCollection(),
    news: new newsCollection()
  }
}

module.exports = {
  init: function () {
    async.parallel([
        function (next){
          global.cartapacio.collections.projects.fetch({
            data: {doctype: 'project'},

            success: function(){
              next(null, 'projects fetched')
            },
            error: function(data){
              next(data, null)
            }
          })
        },
        function (next){
          global.cartapacio.collections.bio.fetch({
            data: {doctype: 'cv'},

            success: function(){
              next(null, 'cv fetched')
            },
            error: function(data){
              next(data, null)
            }
          })
        },
        function (next){
          global.cartapacio.collections.news.fetch({
            data: {doctype: 'news'},

            success: function(){
              next(null, 'news fetched')
            },
            error: function(data){
              next(data, null)
            }
          })
        }
      ],
      function (err, data){
        if(err){
          console.error(err)
        }

        global.cartapacio.router = new Router()
        Backbone.history.start()
      }
    )
  }
}



