require './setup'
{run, pipe, success} = require('./cli_helpers')

describe '--help', ->
  run('--help')
  success()

  it 'has no stderr', ->
    expect(result.stderr).eql ''

  it 'shows usage', ->
    expect(result.out).include '-h, --help'
    expect(result.out).include 'print usage information'

describe '--css', ->
  run('--css')
  success()

  it 'prints css', ->
    expect(result.out).include 'h2.sg'

describe '--js', ->
  run('--js')
  success()

  it 'prints js', ->
    expect(result.out).include 'document.querySelector'

describe '--version', ->
  run('--version')
  success()

  it 'prints the version', ->
    expect(result.out).include require('../package.json').version

describe 'pipe', ->
  pipe('### hi\nthere\n')
  success()

  it 'works', ->
    expect(result.out).match /<h3[^>]*>hi<\/h3>/
    expect(result.out).match /<p[^>]*>there<\/p>/

describe 'pipe --inline', ->
  pipe """
  /**
   * hi:
   * there
   */
  """, ['--inline']

  success()

  it 'works', ->
    expect(result.out).match /<h3[^>]*>hi<\/h3>/
    expect(result.out).match /<p[^>]*>there<\/p>/
