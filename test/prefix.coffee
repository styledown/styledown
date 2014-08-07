require './setup'

describe 'Prefix', ->
  describe 'in options', ->
    beforeEach ->
      @load "## Hello\n### world\nthere", prefix: "styleguide", head: ''

    it 'classnames in stuff', ->
      expect(@$("h2").is('.styleguide')).be.true
      expect(@$("p").is('.styleguide')).be.true

    it 'classnames in body', ->
      expect(@$("html").is('.styleguide')).be.true
      expect(@$("body").is('.styleguide')).be.true

    it 'h2 section', ->
      expect(@$('.styleguide-section-hello')).have.length 1

    it 'h3 section', ->
      expect(@$('.styleguide-section-world')).have.length 1

    it 'section', ->
      expect(@$('.styleguide-section')).have.length 1

    it 'block', ->
      expect(@$('.styleguide-block')).have.length 1

  describe 'inline options', ->
    beforeEach ->
      @load "## Hello\n###world\nthere\n\n# Styleguide options\n\n* prefix: styleguide", head: ''

    it 'classnames in stuff', ->
      expect(@$("h2").is('.styleguide')).be.true
      expect(@$("p").is('.styleguide')).be.true

    it 'classnames in body', ->
      expect(@$("html").is('.styleguide')).be.true
      expect(@$("body").is('.styleguide')).be.true

    it 'h2 section', ->
      expect(@$('.styleguide-section-hello')).have.length 1

    it 'h3 section', ->
      expect(@$('.styleguide-section-world')).have.length 1

    it 'section', ->
      expect(@$('.styleguide-section')).have.length 1

    it 'block', ->
      expect(@$('.styleguide-block')).have.length 1

