require './setup'

describe 'bare h2', ->
  beforeEach ->
    @load "## hello", bare: true

  it 'is bare with wrapping', ->
    expect(@html).htmleql '''
      <section class='sg-section hello'><h2 id='hello' class='sg'>hello</h2></section>
    '''

describe 'bare h3', ->
  beforeEach ->
    @load "### hello", bare: true

  it 'is bare with wrapping', ->
    expect(@html).htmleql '''
      <section class='sg-block hello'><h3 id='hello' class='sg'>hello</h3></section>
    '''

describe 'mixed case wrapping', ->
  beforeEach ->
    @load '''
      ### button

          button

      ## Forms
      ### input

          input
    ''', bare: true

  it 'should work', ->
    expect(@$(".sg-block.button")).have.length 1
    expect(@$(".sg-block.button > h3#button")).have.length 1
    expect(@$(".sg-block.button > .sg-code-block")).have.length 1
    expect(@$(".sg-section.forms")).have.length 1
    expect(@$(".sg-section.forms > h2#forms")).have.length 1
    expect(@$(".sg-section.forms > .sg-block.input")).have.length 1
    expect(@$(".sg-section.forms > .sg-block.input > h3#input")).have.length 1


