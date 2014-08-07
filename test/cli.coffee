require './setup'
{run, pipe, success} = require('./helpers/cli')
{randomfile} = require('./helpers/file')
fs = require('fs')

describe 'CLI:', ->
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

  describe '--output', ->
    fname = randomfile()

    run "test/fixtures/basic-1.md -o #{fname}"
    success()

    after ->
      fs.unlinkSync(fname) if fs.existsSync(fname)

    it 'creates an output file', ->
      expect(fs.existsSync(fname)).eql true

    it 'puts things in the output file', ->
      data = fs.readFileSync(fname, 'utf-8')
      expect(data).match /<h3[^>]*>One<\/h3>/
      expect(data).match /<p[^>]*>one one one<\/p>/

    it 'prints status in stderr', ->
      expect(result.stderr).include fname

  describe 'using a single .md filename', ->
    run 'test/fixtures/basic-1.md'
    success()

    it 'works', ->
      expect(result.out).match /<h3[^>]*>One<\/h3>/
      expect(result.out).match /<p[^>]*>one one one<\/p>/

  describe 'using two .md files', ->
    run 'test/fixtures/basic-1.md test/fixtures/basic-2.md'
    success()

    it 'produces output based on the first file', ->
      expect(result.out).match /<h3[^>]*>One<\/h3>/
      expect(result.out).match /<p[^>]*>one one one<\/p>/

    it 'produces output based on the second file', ->
      expect(result.out).match /<h3[^>]*>Two<\/h3>/
      expect(result.out).match /<p[^>]*>two two two<\/p>/

  describe 'using .md an .css together', ->
    run 'test/fixtures/basic-1.md test/fixtures/inline.css'
    success()

    it 'produces output based on the first file', ->
      expect(result.out).match /<h3[^>]*>One<\/h3>/
      expect(result.out).match /<p[^>]*>one one one<\/p>/

    it 'produces output based on the second file', ->
      expect(result.out).match /<h3[^>]*>Inline<\/h3>/
      expect(result.out).match /<p[^>]*>inline inline inline<\/p>/
