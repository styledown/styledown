require './setup'


describe 'Cheerio:', ->
  Cheerio = require('cheerio')

  it 'each', ->
    $ = Cheerio.load('<div><h1></h1><p>0</p><p>1</p><span></span></div>')
    $('p').each ->
      $(this).nextUntil('span')
