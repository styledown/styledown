require './setup'

describe 'options.body', ->
  beforeEach ->
    @load '''
    ## hello
    '''

  it 'wrap in div', ->
    expect(@$('body > div')).have.length 1
    expect(@$('body > div > section')).have.length 1
