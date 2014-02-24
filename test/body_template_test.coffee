require './setup'

describe 'Body template test', ->
  beforeEach ->
    @load '''
    ## hello
    ''', head: ''

  it 'wrap in div', ->
    expect(@$).have.selector 'body > div'
    expect(@$).have.selector 'body > div > section'
