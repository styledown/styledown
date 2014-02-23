require './setup'

describe 'jade', ->
  beforeEach ->
    @load '''
    ### Button

        @example
        a.button
          | Hello
    '''

  it 'sg-canvas', ->
    expect(@$(".sg-canvas").length).eql 1

  it 'example rendering', ->
    expect(@$("a.button").length).eql 1
    expect(@$("a.button").html()).eql "Hello"

