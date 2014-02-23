require './setup'

describe 'Default CSS', ->
  describe 'on', ->
    beforeEach ->
      @load "### hi"

    it 'css', ->
      expect(@$('link[rel="stylesheet"]')).have.length 1
      expect(@$('link[rel="stylesheet"]').attr('href')).eq 'styledown.css'

    it 'js', ->
      expect(@$('script')).have.length 1
      expect(@$('script').attr('src')).eq 'styledown.js'

  describe 'off', ->
    beforeEach ->
      @load "### hi", head: ''

    it 'css', ->
      expect(@$('link[rel="stylesheet"]')).have.length 0

    it 'js', ->
      expect(@$('script')).have.length 0

