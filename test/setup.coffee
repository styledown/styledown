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
    @html = Styledown.parse(html, options)
    @$ = Cheerio.load(@html)

