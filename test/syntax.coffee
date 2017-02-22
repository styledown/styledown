require './setup'

describe 'Syntax highlight', ->
  describe 'non-examples', ->
    beforeEach ->
      @load '''
      ``` html
      <div>hello</div>
      ```
      '''

    it 'should work', ->

    it 'intact text', ->
      expect(@$('pre').text().trim()).eq "<div>hello</div>"

    it 'highlight', ->
      expect(@$).have.selector 'pre .hljs-tag'
      expect(@$).have.selector 'pre .hljs-title'

    it 'set correct pre class', ->
      expect(@$).have.selector 'pre.sg-lang-html'


  describe 'examples', ->
    beforeEach ->
      @load '''
      ### Buttons

          @example
          a.button.primary Primary button
          a.button.success Success button
      '''

    it 'should work', ->

    it 'should highlight', ->
      expect(@$('.sg-code .hljs-tag').length).gte 4
      expect(@$('.sg-code .hljs-value').length).gte 2
      expect(@$('.sg-code .hljs-attribute').length).gte 2
      expect(@$('.sg-code').html()).match /&lt;/

  describe 'case insensitive code examples', ->
    beforeEach ->
      @load '''
      ### hello

          @example
          <div myAngularAttribute="true"></div>
      ''', caseSensitive: false

    it 'keeps the original case', ->
      expect(@$('[myAngularAttribute]').length).eq 0
      expect(@$('[myangularattribute]').length).eq 1

  describe 'case sensitive code examples', ->
    beforeEach ->
      @load '''
      ### hello

          @example
          <div myAngularAttribute="true"></div>
      ''', caseSensitive: true

    it 'keeps the original case', ->
      expect(@$('[myAngularAttribute]').length).eq 1
      expect(@$('[myangularattribute]').length).eq 0

