require './setup'

describe 'canvas block wrapping', ->
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
    expect(@$('.sg-block').eq(0).is('.sg-buttons')).true
    expect(@$('.sg-block').eq(1).is('.sg-colors')).true

