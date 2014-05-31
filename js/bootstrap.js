'use strict';

var $ = require('jquery'),
  url = require('url'),
  Backbone = require('backbone'),
  async = require('async'),
  Router = require('./router'),
  projects = require('./collections/projects'),
  cv = require('./collections/CvCollection'),
  news = require('./collections/NewsCollection'),
  settings = require('./collections/SettingsCollection'),
  statement = require('./collections/StatementCollection'),
  config = require('./config')

Backbone.$ = $

global.cartapacio = {
  collections: {
    projects: new projects(),
    bio: new cv(),
    news: new news(),
    settings: new settings(),
    statement: new statement()
  }
}

module.exports = {
  init: function () {
    async.waterfall([
      function (callback){
          var endpoint = url.resolve(config.CARTAPACIO_SERVER, 'dbConfig')
          $.ajax({
            url: endpoint,
            success: function(data){
              if(data.status !== 404){
                callback(null)
              } else {
                global.cartapacio.router = new Router()
                Backbone.history.start()

                global.cartapacio.router.navigate('/dbConfig', {trigger: true})
              }
            }
          })
        },
        function (callback){
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
              },
              function (next){
                global.cartapacio.collections.statement.fetch({
                  data: {doctype: 'statement'},

                  success: function(){
                    next(null, 'statement fetched')
                  },
                  error: function(data){
                    next(data, null)
                  }
                })
              }
            ],
            function (err, data){
              if(err){
                throw err
              }

              callback(null)
            }
          )
        }
      ],
      function (err){
        if(err){
          throw err
        }

        global.cartapacio.router = new Router()
        Backbone.history.start()
    })

  }
}



