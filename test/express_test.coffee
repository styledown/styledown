require './setup'

describe 'Express', ->
  StyledownHandler = require('../connect')
  Request = require('supertest')
  Expect = chai.expect
  Express = require('express')

  before ->
    @app = Express()
    @app.use StyledownHandler
      root: __dirname
      guides:
        index: 'fixtures/sample.md'

  it '.css', (done) ->
    Request(@app)
      .get('/styleguides/styledown.css')
      .expect(200)
      .expect('Content-Type', 'text/css')
      .end (err, res) ->
        expect(res.text).length.gt 10
        done(err)

  it '.js', (done) ->
    Request(@app)
      .get('/styleguides/styledown.js')
      .expect(200)
      .expect('Content-Type', 'application/javascript')
      .end (err, res) ->
        expect(res.text).length.gt 10
        done(err)

  it 'index', (done) ->
    Request(@app)
      .get('/styleguides/index')
      .expect(200)
      .end (err, res) ->
        expect(res.text).match /meta charset/
        expect(res.text).match /Hello there from sample.md/
        done(err)

  it 'not found', (done) ->
    Request(@app)
      .get('/styleguides/ueeu')
      .expect(404)
      .end(done)
