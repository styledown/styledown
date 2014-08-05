require './setup'

describe 'Pre tag', ->
  {parseTags, parseCodeText} = require('../lib/utils')

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

    it 'starts with spaces', ->
      obj = parseTags('  isolate no-code')
      expect(obj.isolate).eq true
      expect(obj['no-code']).eq true

    it 'multiple', ->
      obj = parseTags('example name="Bruce Willis" role=actor')
      expect(obj.example).eq true
      expect(obj.name).eq "Bruce Willis"
      expect(obj.role).eq 'actor'

    it 'classes', ->
      obj = parseTags('example .padded')
      expect(obj.class).eq 'padded'

    it 'classes, multiple, spaced', ->
      obj = parseTags('example .padded .a .b')
      expect(obj.class).eq 'padded a b'

    it 'classes, multiple, no spaces', ->
      obj = parseTags('example .padded.a.b')
      expect(obj.class).eq 'padded a b'

  describe 'parseCodeText', ->
    it 'with tags', ->
      out = parseCodeText '''
        @example width=500
        div.button
      '''

      expect(out.tag).eql 'example width=500'
      expect(out.code).eql 'div.button'

    it 'no tags', ->
      out = parseCodeText '''
        div.button
      '''

      expect(out.tag).null
      expect(out.code).eql 'div.button'

  describe 'converting examples', ->
    beforeEach ->
      @load '''
      ### hello

          @example
          div.button
      '''

    it 'generates <pre> tags', ->
      expect(@$).have.selector 'pre'

    it 'makes a <pre> HTML code', ->
      expect(@$("pre").text()).eql '<div class="button"></div>'
