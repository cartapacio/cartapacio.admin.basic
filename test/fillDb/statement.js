'use strict';

var casper = require('casper').create(),
  lipsum = require('../proxies/lipsum')

casper.start('http://localhost:8000/#statement')

casper.thenEvaluate(function (statement){
  document.querySelector('article#statement').innerHTML = statement
}, lipsum({count: 3, units: 'paragraphs', format: 'html' })
)

casper.then(function (){
  this.click('#save')
})


casper.run();
