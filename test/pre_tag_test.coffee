require './setup'

describe 'Pre tag', ->
  describe 'parseCodeText', ->
    it 'with tags', ->
      out = Styledown.filters.parseCodeText '''
        @example width=500
        div.button
      '''

      expect(out.tag).eql 'example width=500'
      expect(out.code).eql 'div.button'

    it 'no tags', ->
      out = Styledown.filters.parseCodeText '''
        div.button
      '''

      expect(out.tag).null
      expect(out.code).eql 'div.button'

  describe 'tag parsing', ->
    beforeEach ->
      @load '''
      ### hello

          @ example
          div.button
      '''

    it 'should work', ->
      expect(@$).have.selector 'pre'

    it 'no tags', ->
      expect(@$("pre").text()).eql '<div class="button"></div>'
