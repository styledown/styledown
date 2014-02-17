require './setup'

describe 'styledown', ->
  it '#parse', ->
    expect(Styledown.parse).be.function

describe 'basic markdown', ->
  beforeEach ->
    @load '''
    # Hello
    there
    '''

  it 'text', ->
    expect(@$("h1").text()).eql 'Hello'
    expect(@$("p").text()).eql 'there'

  it 'classnames', ->
    expect(@$("h1").is('.sg')).be.true
    expect(@$("p").is('.sg')).be.true

  it 'html template', ->
    expect(@html).match /doctype html/
    expect(@html).match /body/
    expect(@html).match /head/
    expect(@$("meta[charset]").attr('charset')).eql('utf-8')
    expect(@$("title").text().length).gt 0

describe 'prefix', ->
  beforeEach ->
    @load "## Hello\nthere", prefix: "styleguide"

  it 'classnames in stuff', ->
    expect(@$("h2").is('.styleguide')).be.true
    expect(@$("p").is('.styleguide')).be.true

  it 'classnames in body', ->
    expect(@$("html").is('.styleguide')).be.true
    expect(@$("body").is('.styleguide')).be.true

describe 'bare h2', ->
  beforeEach ->
    @load "## hello", bare: true

  it 'is bare with wrapping', ->
    expect(@html).htmleql '''
      <section class='sg-section hello'><h2 id='hello' class='sg'>hello</h2></section>
    '''

describe 'bare h3', ->
  beforeEach ->
    @load "### hello", bare: true

  it 'is bare with wrapping', ->
    expect(@html).htmleql '''
      <section class='sg-block hello'><h3 id='hello' class='sg'>hello</h3></section>
    '''

describe 'mixed case wrapping', ->
  beforeEach ->
    @load '''
      ### button

          button

      ## Forms
      ### input

          input
    ''', bare: true

  it 'should work', ->
    expect(@$(".sg-block.button")).have.length 1
    expect(@$(".sg-block.button > h3#button")).have.length 1
    expect(@$(".sg-block.button > .sg-code-block")).have.length 1
    expect(@$(".sg-section.forms")).have.length 1
    expect(@$(".sg-section.forms > h2#forms")).have.length 1
    expect(@$(".sg-section.forms > .sg-block.input")).have.length 1
    expect(@$(".sg-section.forms > .sg-block.input > h3#input")).have.length 1

describe 'jade', ->
  beforeEach ->
    @load '''
    ### Button

        a.button
          | Hello
    '''

  it 'sg-canvas', ->
    expect(@$(".sg-canvas").length).eql 1

  it 'example rendering', ->
    expect(@$("a.button").length).eql 1
    expect(@$("a.button").html()).eql "Hello"

describe 'wrapping', ->
  beforeEach ->
    @load '''
    ### Buttons

        a.button Hello

    ### Colors

        a.button.primary Primary button
        a.button.success Success button
    '''

  it 'sg-code', ->
    expect(@$('.sg-code').length).eq 2

  it 'sg-canvas', ->
    expect(@$('.sg-canvas').length).eq 2

  it 'block length', ->
    expect(@$('.sg-block')).have.length 2

  it 'block classnames', ->
    expect(@$('.sg-block').eq(0).is('.buttons')).true
    expect(@$('.sg-block').eq(1).is('.colors')).true

describe 'syntax highlight', ->
  beforeEach ->
    @load '''
    ### Buttons

        a.button.primary Primary button
        a.button.success Success button
    '''

  it 'should work', ->
    expect(@$('.sg-code .hljs-tag').length).gte 4
    expect(@$('.sg-code .hljs-value').length).gte 2
    expect(@$('.sg-code .hljs-attribute').length).gte 2
    expect(@$('.sg-code').html()).match /&lt;/

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
      <section class="s2 first-section">
        <h2 id='first-section'>First section</h2>
        <p>1a <b>bold</b></p>
        <p>1b</p>
        <p>1c</p>
        <p>1d</p>
      </section>
      <section class="s2 second-section">
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
      <section class="s3 first-section">
        <h3 id='first-section'>First section</h3>
        <p>1a</p>
        <p>1b</p>
      </section>
      <h2 id='second-section'>Second section</h2>
      <p>2a</p>
    '''

