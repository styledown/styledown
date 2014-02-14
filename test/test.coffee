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

describe 'bare', ->
  beforeEach ->
    @load "## hello", bare: true

  it 'has no template', ->
    expect(@html).not.match /doctype html/
    expect(@html).not.match /body/
    expect(@html).not.match /head/

  it 'is bare', ->
    expect(@html).match /^\s*<h2 /
    expect(@html).match /<\/h2>\s*$/

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
