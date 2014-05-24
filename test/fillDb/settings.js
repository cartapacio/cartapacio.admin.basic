'use strict';

var casper = require('casper').create(),
  chance = require('../proxies/chance')

casper.start('http://localhost:8000/#settings')

casper.thenEvaluate(function (author, siteName, url, username, password, host, path){
    document.querySelector('#author').setAttribute('value', author)
    document.querySelector('#siteName').setAttribute('value', siteName)
    document.querySelector('#url').setAttribute('value', url)

    document.querySelector('#username').setAttribute('value', username)
    document.querySelector('#password').setAttribute('value', password)
    document.querySelector('#host').setAttribute('value', host)
    document.querySelector('#path').setAttribute('value', path)
  },
  chance.name(),
  chance.sentence(),
  chance.domain(),
  chance.name(),
  chance.guid(),
  chance.domain(),
  '/public'
)

casper.then(function (){
  this.click('#save')
})


casper.run();
