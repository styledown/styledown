require './setup'

describe 'Jade Templates', ->
  describe 'head', ->
    beforeEach ->
      @load '''
         hello

         # Styleguide options
         ## Head
             script(src="helloworld.js")
      '''

    it 'no errors', ->

    it 'render script', ->
      expect(@$('script[src="helloworld.js"]')).have.length 1

  describe 'body', ->
    beforeEach ->
      @load '''
         hello

         # Styleguide options
         ## head
             link
         ## body
             #hello(sg-content)
      '''

    it 'no errors', ->

    it 'render body', ->
      expect(@$('#hello')).have.length 1
