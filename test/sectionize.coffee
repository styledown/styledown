require './setup'

describe 'Sectionize', ->
  {sectionize} = require('../lib/filters')
  pre = (s) -> s

  describe 'sectionize filter, simple', ->
    beforeEach ->
      @$ = Cheerio.load '''
        <p>0</p>
        <h2 id='first-section'>First section</h2>
        <p>1a <b>bold</b></p>
        <p>1b</p>
        <p>1c</p>
        <p>1d</p>
        <h2 id='second-section'>Second section</h2>
        <p>2a</p>
        <p>2b</p>
      ''', normalizeWhitespace: true
      sectionize(@$, 'h2', pre, class: 's2')

    it 'left the <p> alone', ->
      expect(@$('p:root')).have.length 1

    it 'correct section 1', ->
      expect(@$('section')).have.length 2
      expect(@$('section.s2')).have.length 2
      expect(@$('section.section-first-section')).have.length 1

    it 'section 1 contents', ->
      expect(@$('section.section-first-section').text()).eql 'First section1a bold1b1c1d'
      expect(@$('section.section-first-section > h2')).have.length 1
      expect(@$('section.section-first-section > p')).have.length 4

    it 'section 2 contents', ->
      expect(@$('section.section-second-section').text()).eql 'Second section2a2b'
      expect(@$('section.section-second-section > h2')).have.length 1
      expect(@$('section.section-second-section > p')).have.length 2

  describe 'sectionize filter, mixed headings', ->
    beforeEach ->
      @$ = Cheerio.load '''
        <p>0</p>
        <h3 id='first-section'>First section</h3>
        <p>1a</p>
        <p>1b</p>
        <h2 id='second-section'>Second section</h2>
        <p>2a</p>
      ''', normalizeWhitespace: true
      sectionize(@$, 'h3', pre, class: 's3')

    it 'left the <p> alone', ->
      expect(@$('p:root')).have.length 2

    it 'correct section 1', ->
      expect(@$('section')).have.length 1
      expect(@$('section.s3')).have.length 1
      expect(@$('section.section-first-section')).have.length 1

    it 'section 1 contents', ->
      expect(@$('section.section-first-section').text()).eql 'First section1a1b'
