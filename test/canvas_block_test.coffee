require './setup'

describe 'Canvas block', ->
  beforeEach ->
    @load '''
    ### Buttons

        @example
        a.button Hello

    ### Colors

        @example
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
    expect(@$('.sg-block').eq(0).is('.sg-section-buttons')).true
    expect(@$('.sg-block').eq(1).is('.sg-section-colors')).true

