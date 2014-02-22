require './setup'

describe 'Sectionize', ->
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

    it 'sectionized properly', ->
      Styledown.filters.sectionize(@$, 'h2', class: 's2')

      expect(@$.html()).htmleql '''
        <p>0</p>
        <section class="s2 -first-section">
          <h2 id='first-section'>First section</h2>
          <p>1a <b>bold</b></p>
          <p>1b</p>
          <p>1c</p>
          <p>1d</p>
        </section>
        <section class="s2 -second-section">
          <h2 id='second-section'>Second section</h2>
          <p>2a</p>
          <p>2b</p>
        </section>
      '''

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

    it 'sectionized properly', ->
      Styledown.filters.sectionize(@$, 'h3', class: 's3')

      expect(@$.html()).htmleql '''
        <p>0</p>
        <section class="s3 -first-section">
          <h3 id='first-section'>First section</h3>
          <p>1a</p>
          <p>1b</p>
        </section>
        <h2 id='second-section'>Second section</h2>
        <p>2a</p>
      '''
