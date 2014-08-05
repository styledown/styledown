var extend        = require('util')._extend;
var parseCodeText = require('./utils').parseCodeText;
var parseTags     = require('./utils').parseTags;
var prefixClass   = require('./utils').prefixClass;
var htmlize       = require('./utils').htmlize;

/**
 * Adds classes
 */

exports.addClasses = function ($, pre) {
  $("*").addClass(pre());
};

/**
 * Break it apart into sections.
 *
 * Puts <h3> blocks into <section> blocks.
 */

exports.sectionize = function ($, tag, pre, options) {
  options = extend({
    'class': '',
    'until': 'h1, h2, h3, section',
  }, options);

  $(tag).each(function (i) {
    var $heading = $(this);
    var $extras = $heading.nextUntil(options.until);
    $heading.before("<section class='"+options.class+"'>");

    var $div = $("section."+options.class).eq(-1);
    $div.addClass(pre('section-' + $heading.attr('id')));
    $div.append($heading.remove());
    $div.append($extras.remove());
  });
};

/**
 * Unpacks `pre` blocks into examples.
 */

exports.unpackExample = function (parent, pre, highlight) {
  var Cheerio = require('cheerio');
  var code = parent.text();
  var block = parseCodeText(code);
  var tags = parseTags(block.tag);

  if (tags.example) {
    var html = htmlize(block.code);
    var canvas = "<div class='"+pre('canvas')+"'>"+html+"</div>";
    var codeblock = "<pre class='"+pre('code')+"'>"+highlight(html)+"</pre>";
    var $block = Cheerio.load("<div class='"+pre('example')+"'>" + canvas + codeblock + "</div>");

    if (tags['class']) {
      klass = pre(tags['class']);
      $block(':root').addClass(klass);
    }

    parent.after($block.root());
    parent.remove();
  } else {
    klass = parent.find('code').attr('class');
    var m = klass.match(/lang-([a-z]+)/);

    if (m) {
      var lang = m[1];
      var Hljs = require('highlight.js');
      parent.html(Hljs.highlight(lang, parent.text()).value);
      parent.addClass(pre('lang-'+lang));
      parent.addClass(pre('code'));
    }
  }
};

/**
 * Remove the configuration block.
 *
 * Removes the "Styleguide options" block from the DOM in `$`.
 */

exports.removeConfig = function ($) {
  var $h1 = $('h1#styleguide-options');
  $h1.nextUntil('h1').remove();
  $h1.remove();
};

/**
 * Process the configuration block
 */

exports.processConfig = function (src, options) {
  var Mdconf = require('./mdconf');
  try {
    var data = Mdconf(src, { normalizer: 'camelcase' });
    data = (data && data.styleguideOptions);

    if (data) extend(options, data);
  } catch (e) {
    // Don't bother if mdconf fails.
  }
};

/**
 * Isolates text blocks
 */

exports.isolateTextBlocks = function ($, pre) {
  var Cheerio = require('cheerio');

  $('.'+pre('block')).each(function() {
    var $this = $(this);
    // Check if there's an example block.
    // $('.sg-example', this).length doesn't work.
    var noExample = ($this.html().indexOf(pre('example')) === -1);
    var noCode    = ($this.html().indexOf(pre('code')) === -1);
    if (noExample && noCode) return;

    var $first = $('h3', this);
    var $text = $first.nextUntil('.'+pre('example')+', .'+pre('code'));

    var $block = Cheerio.load('<div>');
    $this.prepend($block.root());

    $block(':root').addClass(pre('text'));
    $block(':root').append($first);
    $block(':root').append($text);
  });
};
