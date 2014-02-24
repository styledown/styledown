require './setup'

describe 'Pretty Print', ->
  describe 'default', ->
    beforeEach ->
      @load "### Hello\n\n    @example\n    div", head: ''

    it 'should work', ->

    it 'indent <head>', ->
      expect(@html).match /\n  <head/

    it 'indent <body>', ->
      expect(@html).match /\n  <body/

    it 'indent .sg-section-hello', ->
      expect(@html).match /\n {6}<section class="sg-block sg-section-hello/

    it 'indent .sg-canvas', ->
      expect(@html).match /\n {10}<div class="sg-canvas/

  describe 'custom indentSize', ->
    beforeEach ->
      @load "### Hello\n\n    @example\n    div", indentSize: 4, head: ''

    it 'should work', ->

    it 'indent <head>', ->
      expect(@html).match /\n {4}<head/

    it 'indent <body>', ->
      expect(@html).match /\n {4}<body/

    it 'indent .sg-section-hello', ->
      expect(@html).match /\n {12}<section class="sg-block sg-section-hello/

    it 'indent .sg-canvas', ->
      expect(@html).match /\n {20}<div class="sg-canvas/

  xdescribe 'custom indentSize, no head', ->
