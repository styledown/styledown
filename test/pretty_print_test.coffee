require './setup'

describe 'Pretty Print', ->
  beforeEach ->
    @load "### Hello\n\n    div"

  it 'should work', ->
    console.log @html

  it 'indent <head>', ->
    expect(@html).match /\n  <head/

  it 'indent <body>', ->
    expect(@html).match /\n  <body/

  it 'indent .sg-section-hello', ->
    expect(@html).match /\n {6}<section class="sg-block sg-section-hello/

  it 'indent .sg-canvas', ->
    expect(@html).match /\n {10}<div class="sg-canvas/
