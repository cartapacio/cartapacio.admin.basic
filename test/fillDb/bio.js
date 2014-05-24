'use strict';

var casper = require('casper').create(),
  lipsum = require('../proxies/lipsum'),
  chance = require('../proxies/chance'),
  moment = require('../proxies/moment')

casper.start('http://localhost:8000/#bio')

// TODO: image not saved
casper.thenEvaluate(function (name, bio, picture){
    document.querySelector('#name').setAttribute('value', name)
    document.querySelector('#bio').innerHTML = bio
    document.querySelector('#info > div.image.form-group.col-md-10 > div.col-md-3 > img').setAttribute('src', picture)
  },
  chance.name(),
  lipsum({count: 3, units: 'paragraphs', format: 'html'}),
  'data:image/jpeg;base64,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'
)


// TODO: ugly html
casper.then(function (){
  this.click('#plus-exhibition')
})

casper.thenEvaluate(function (title, date, location){
    document.querySelector('#exhibitions > div > input:nth-child(2)').setAttribute('value', title)
    document.querySelector('#exhibitions > div > input:nth-child(4)').setAttribute('value', date)
    document.querySelector('#exhibitions > div > input:nth-child(6)').setAttribute('value', location)
  },
  chance.sentence(),
  moment(chance.date()).format('YYYY-MM-DD'),
  chance.sentence()
)

casper.then(function (){
  this.click('#plus-exhibition')
})

casper.thenEvaluate(function (title, date, location){
    document.querySelector('#exhibitions > div:nth-child(3) > input:nth-child(2)').setAttribute('value', title)
    document.querySelector('#exhibitions > div:nth-child(3) > input:nth-child(4)').setAttribute('value', date)
    document.querySelector('#exhibitions > div:nth-child(3) > input:nth-child(6)').setAttribute('value', location)
  },
  chance.sentence(),
  moment(chance.date()).format('YYYY-MM-DD'),
  chance.sentence()
)

casper.then(function (){
  this.click('#save')
})


casper.run();