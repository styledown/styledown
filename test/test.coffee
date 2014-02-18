require './setup'

describe 'styledown', ->
  it '#parse', ->
    expect(Styledown.parse).be.function
