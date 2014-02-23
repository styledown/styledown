require './setup'

describe 'Tags', ->
  it 'one class', ->
    @load '''
      ### Hello

          @example .white
          div
    '''

    expect(@$).have.selector '.sg-code-block'
    expect(@$).have.selector '.sg-code-block.sg-white'

  it 'two classes', ->
    @load '''
      ### Hello

          @example .white .pad
          div
    '''

    expect(@$).have.selector '.sg-code-block'
    expect(@$).have.selector '.sg-code-block.sg-white.sg-pad'
