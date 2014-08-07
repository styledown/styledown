require './setup'

describe 'Tags', ->
  it 'one class', ->
    @load '''
      ### Hello

          @example .white
          div
    '''

    expect(@$).have.selector '.sg-example'
    expect(@$).have.selector '.sg-example.sg-white'

  it 'two classes', ->
    @load '''
      ### Hello

          @example .white .pad
          div
    '''

    expect(@$).have.selector '.sg-example'
    expect(@$).have.selector '.sg-example.sg-white.sg-pad'
