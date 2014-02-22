require './setup'

describe 'Wrapping', ->
  describe 'bare h2', ->
    beforeEach ->
      @load "## hello", bare: true

    it 'is bare with wrapping', ->
      expect(@$(".sg-section > h2#hello")).have.length 1
      expect(@$(".sg-section > h2#hello.sg")).have.length 1
      expect(@$(".sg-section.sg-section-hello")).have.length 1
      expect(@$(".sg-section:root")).have.length 1

  describe 'bare h3', ->
    beforeEach ->
      @load "### hello", bare: true

    it 'is bare with wrapping', ->
      expect(@$(".sg-block > h3#hello")).have.length 1
      expect(@$(".sg-block > h3#hello.sg")).have.length 1
      expect(@$(".sg-block.sg-section-hello")).have.length 1
      expect(@$(".sg-block:root")).have.length 1

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
      expect(@$(".sg-block.sg-section-button")).have.length 1
      expect(@$(".sg-block.sg-section-button > h3#button")).have.length 1
      expect(@$(".sg-block.sg-section-button > .sg-code-block")).have.length 1
      expect(@$(".sg-section.sg-section-forms")).have.length 1
      expect(@$(".sg-section.sg-section-forms > h2#forms")).have.length 1
      expect(@$(".sg-section.sg-section-forms > .sg-block.sg-section-input")).have.length 1
      expect(@$(".sg-section.sg-section-forms > .sg-block.sg-section-input > h3#input")).have.length 1


