require './setup'

describe 'Text block', ->
  it 'ignore when no example', ->
    @load '''
      ### Example
      hello

      hi

      world
    '''

    expect(@$).not.have.selectors [
      '.sg-block > .sg-text'
      '.sg-block > .sg-text + .sg-example'
    ]

  it 'should work', ->
    @load '''
      ### Example
      hello

      hi

      world

          @example
          div x
    '''

    expect(@$).have.selectors [
      '.sg-block'
      '.sg-block > .sg-text'
      '.sg-block > .sg-text > h3#example'
      '.sg-block > .sg-text > p'
      '.sg-block > .sg-text > p+p+p'
      '.sg-block > .sg-text + .sg-example'
    ]

  it 'leave inlines alone', ->
    @load '''
      ### Example

      `a` - foo *b* **c**

          @example
          div x
    '''

    expect(@$).have.selectors [
      '.sg-block'
      '.sg-block > .sg-text'
      '.sg-block > .sg-text > h3#example'
      '.sg-block > .sg-text > p'
      '.sg-block > .sg-text > p > code'
      '.sg-block > .sg-text > p > strong'
      '.sg-block > .sg-text > p > em'
      '.sg-block > .sg-text + .sg-example'
    ]

  it 'account for code', ->
    @load '''
      ### Example
      hello

      hi

      world

      ``` javascript
      alert('ok')
      ```
    '''

    expect(@$).have.selectors [
      '.sg-block'
      '.sg-block > .sg-text'
      '.sg-block > .sg-text > h3#example'
      '.sg-block > .sg-text > p'
      '.sg-block > .sg-text > p+p+p'
      '.sg-block > .sg-text + pre.sg-code'
    ]

