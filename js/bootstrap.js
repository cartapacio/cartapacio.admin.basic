'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  async = require('async'),
  Router = require('./router'),
  projects = require('./collections/projects'),
  cv = require('./collections/CvCollection'),
  news = require('./collections/NewsCollection'),
  settings = require('./collections/SettingsCollection')

Backbone.$ = $

global.cartapacio = {
  collections: {
    projects: new projects(),
    bio: new cv(),
    news: new news(),
    settings: new settings()
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
            data: {doctype: 'news', orderBy: {date: -1}},

            success: function(){
              next(null, 'news fetched')
            },
            error: function(data){
              next(data, null)
            }
          })
        },
        function (next){
          global.cartapacio.collections.settings.fetch({
            data: {doctype: 'settings'},

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



