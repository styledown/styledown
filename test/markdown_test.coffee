require './setup'

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

