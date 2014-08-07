require './setup'

describe 'Styledown.defaultconf', ->
  conf = null

  beforeEach ->
    conf = Styledown.defaults.conf()

  it 'is based on the version', ->
    version = Styledown.version
    expect(conf).include "styledown/v" + version

  it 'works', ->
    expect(conf).be.a 'string'

  it 'has cdn urls', ->
    expect(conf).include 'cdn.rawgit.com/'
