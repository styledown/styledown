require './setup'

describe 'prefix', ->
  beforeEach ->
    @load "## Hello\nthere", prefix: "styleguide"

  it 'classnames in stuff', ->
    expect(@$("h2").is('.styleguide')).be.true
    expect(@$("p").is('.styleguide')).be.true

  it 'classnames in body', ->
    expect(@$("html").is('.styleguide')).be.true
    expect(@$("body").is('.styleguide')).be.true

