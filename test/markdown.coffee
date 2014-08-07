require './setup'

describe 'Markdown', ->
  describe 'with template', ->
    beforeEach ->
      @load '''
      # Hello
      there
      ''', head: ''

    it 'text', ->
      expect(@$("h1").text()).eql 'Hello'
      expect(@$("p").text()).eql 'there'

    it 'classnames', ->
      expect(@$).have.selector 'h1.sg'
      expect(@$).have.selector 'p.sg'

    it 'html template', ->
      expect(@html).match /doctype html/
      expect(@html).match /body/
      expect(@html).match /head/
      expect(@$).have.selector 'meta[charset="utf-8"]'
      expect(@$("title").text().length).gt 0

  describe 'bare', ->
    beforeEach ->
      @load '''
      # Hello
      there
      '''

    it 'text', ->
      expect(@$("h1").text()).eql 'Hello'
      expect(@$("p").text()).eql 'there'

    it 'classnames', ->
      expect(@$).have.selector 'h1.sg'
      expect(@$).have.selector 'p.sg'

