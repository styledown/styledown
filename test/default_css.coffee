require './setup'

xdescribe 'Default CSS', ->
  describe 'on', ->
    beforeEach ->
      @load "### hi"

    it 'css', ->
      expect(@$).have.selector 'link'
      expect(@$).have.selector 'link[rel="stylesheet"][href="styledown.css"]'

    it 'js', ->
      expect(@$).have.selector 'script'
      expect(@$).have.selector 'script[src="styledown.js"]'

  describe 'off', ->
    beforeEach ->
      @load "### hi", head: ''

    it 'css', ->
      expect(@$).not.have.selector 'link[rel="stylesheet"]'

    it 'js', ->
      expect(@$).not.have.selector 'script'

