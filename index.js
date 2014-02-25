var Marked = require('marked');
var Cheerio = require('cheerio');
var extend = require('util')._extend;

module.exports = Styledown;
var Filters = Styledown.filters = {};

var addClasses    = require('./lib/filters').addClasses;
var sectionize    = require('./lib/filters').sectionize;
var unpackExample = require('./lib/filters').unpackExample;
var htmlize       = require('./lib/utils').htmlize;

/**
 * Document.
 */

function Styledown (src, options) {
  this.raw = src;
  this.options = extend(extend({}, Styledown.defaults), options || {});
  this.$ = Cheerio.load(Marked(src));

  Filters.processConfig(src, this.options);
  Filters.removeConfig(this.$);

  var pre = this.options.prefix,
      highlightHTML = this._highlightHTML.bind(this);

  addClasses(this.$, pre);
  sectionize(this.$, 'h3', { 'class': pre+'-block', prefix: pre });
  sectionize(this.$, 'h2', { 'class': pre+'-section', until: 'h1, h2', prefix: pre });

  this.$('pre').each(function () {
    unpackExample(this, pre, highlightHTML);
  });

  Filters.isolateTextBlocks(this.$, pre);
}

Styledown.defaults = {
  /**
   * HTML template
   */
  template: [
    "<!doctype html>",
    "<html>",
    "<head>",
    "<meta charset='utf-8'>",
    "<title>Styledown</title>",
    "</head>",
    "<body>",
    "</body>",
    "</html>"
  ].join("\n"),

  /**
   * Things to put into `head`
   */
  head: false,

  body: "<div sg-content></div>",

  /**
   * Prefix for classnames
   */
  prefix: 'sg',

  /**
   * Indentation spaces
   */
  indentSize: 2
};

/**
 * Shorthand for parsing.
 */

Styledown.parseSync = function (source, options) {
  return new Styledown(source, options).toHTML();
};

Styledown.parse = Styledown.parseSync;

Styledown.prototype = {
  /**
   * Converts to HTML
   */
  toHTML: function() {
    var html = this.$.html();

    if (this.options.head !== false) {
      // Unpack template
      var $ = Cheerio.load(this.options.template);
      $('body').append(htmlize(this.options.body));
      $('[sg-content]').append(html).removeAttr('sg-content');
      $('html, body').addClass(this.options.prefix);
      $('head').append(htmlize(this.options.head));

      html = $.html();
    }

    html = this._prettyprint(html);
    return html;
  },

  /**
   * Reindents HTML based on indent size option
   */

  _prettyprint: function (html) {
    var Html = require('html');
    return Html.prettyPrint(html, { indent_size: this.options.indentSize });
  },

  /**
   * Syntax highlighting helper
   */

  _highlightHTML: function (html) {
    var Hljs = require('highlight.js');

    html = this._prettyprint(html);
    html = Hljs.highlight('html', html).value;
    return html;
  }
};

/**
 * Filters mixin
 */

extend(Filters, {
  /**
   * Remove the configuration block.
   *
   * Removes the "Styleguide options" block from the DOM in `$`.
   */

  removeConfig: function ($) {
    var $h1 = $('h1#styleguide-options');
    $h1.nextUntil('h1').remove();
    $h1.remove();
  },

  /**
   * Process the configuration block
   */

  processConfig: function (src, options) {
    var Mdconf = require('./lib/mdconf');
    try {
      var data = Mdconf(src, { normalizer: 'camelcase' });
      data = (data && data.styleguideOptions);

      if (data) extend(options, data);
    } catch (e) {
      // Don't bother if mdconf fails.
    }
  },

  /**
   * Isolates text blocks
   */

  isolateTextBlocks: function ($, prefix) {
    $('.'+prefix+'-block').each(function() {
      // Check if there's an example block.
      // $('.sg-example', this).length doesn't work.
      var noExample = (this.html().indexOf(prefix+'-example') === -1);
      var noCode    = (this.html().indexOf(prefix+'-code') === -1);
      if (noExample && noCode) return;

      var $first = $('h3', this);
      var $text = $first.nextUntil('.'+prefix+'-example, .'+prefix+'-code');

      var $block = Cheerio.load('<div>');
      this.prepend($block.root());

      $block(':root').addClass(prefix + '-text');
      $block(':root').append($first);
      $block(':root').append($text);
    });
  }
});
