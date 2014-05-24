var casper = require('casper').create();
var lipsum = require('../proxies/lipsum')

casper.start('http://localhost:8000#news/new')

casper.repeat(50, function (){
  this.thenEvaluate(function (title, body){
    document.querySelector('input#title').setAttribute('value', title)
    document.querySelector('article#body').innerHTML = body

  }, lipsum(), lipsum({count: 10, units: 'paragraphs', format: 'html' }))

  this.then(function (){
    this.click('#save')
  })

  this.then(function (){
    this.open('http://localhost:8000#news/new')
  })

})

casper.run();
