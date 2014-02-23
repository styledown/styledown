require './setup'

describe 'Pre tag', ->
  parseTags = Styledown.filters.parseTags

  describe 'parseTags', ->
    it 'key-value', ->
      obj = parseTags('name=hello')
      expect(obj.name).eq 'hello'

    it 'key-value duo', ->
      obj = parseTags('name=hello age=2')
      expect(obj.name).eq 'hello'
      expect(obj.age).eq '2'

    it 'key only', ->
      obj = parseTags('isolate')
      expect(obj.isolate).eq true

    it 'quoted, single', ->
      obj = parseTags("name='Johnny Cage'")
      expect(obj.name).eq 'Johnny Cage'

    it 'quoted, double', ->
      obj = parseTags('name="Johnny Cage"')
      expect(obj.name).eq 'Johnny Cage'

    it 'key + key-value', ->
      obj = parseTags('isolate name=hello')
      expect(obj.isolate).eq true
      expect(obj.name).eq 'hello'

    it 'key only, twice', ->
      obj = parseTags('isolate no-code')
      expect(obj.isolate).eq true
      expect(obj['no-code']).eq true

    it 'multiple', ->
      obj = parseTags('example name="Bruce Willis" role=actor')
      expect(obj.example).eq true
      expect(obj.name).eq "Bruce Willis"
      expect(obj.role).eq 'actor'

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
      console.log @html
