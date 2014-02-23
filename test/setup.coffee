global.chai = require('chai')
global.assert = chai.assert
global.expect = chai.expect
chai.should()

beforeEach -> global.sinon = require('sinon').sandbox.create()
afterEach  -> global.sinon.restore()

global.Styledown = require '.'
global.Cheerio = require 'cheerio'

before ->
  @load = (html, options={}) ->
    @sd = new Styledown(html, options)
    @html = @sd.toHTML()
    @$ = Cheerio.load(@html)

chai.Assertion.addMethod 'htmleql', (val, msg) ->
  a = Cheerio.load(@_obj, normalizeWhitespace: true).html()
  b = Cheerio.load(val, normalizeWhitespace: true).html()
  a = a.replace(/>\s*</g, '><').trim()
  b = b.replace(/>\s*</g, '><').trim()

  @assert(
    a == b,
    'expected #{this} to equal #{exp}',
    'expected #{this} to not equal #{exp}',
    b,
    a,
    true)
