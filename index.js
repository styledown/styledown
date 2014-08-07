var Marked = require('marked');
var Cheerio = require('cheerio');
var extend = require('util')._extend;

module.exports = Styledown;

var addClasses        = require('./lib/filters').addClasses;
var sectionize        = require('./lib/filters').sectionize;
var unpackExample     = require('./lib/filters').unpackExample;
var processConfig     = require('./lib/filters').processConfig;
var removeConfig      = require('./lib/filters').removeConfig;
var isolateTextBlocks = require('./lib/filters').isolateTextBlocks;
var htmlize           = require('./lib/utils').htmlize;
var prefixClass       = require('./lib/utils').prefixClass;

/**
 * Styledown.parse() : Styledown.parse(source, [options])
 * Generates HTML from a given `source`. Shorthand for `new
 * Styledown().toHTML()`.
 */

Styledown.parse = function (source, options) {
  return new Styledown(source, options).toHTML();
};

/***
 * Styledown() : new Styledown(source, [options])
 * Parses the source `source` into a Styledown document. `source` can be a
 * Markdown document.
 *
 *      doc = new Styledown(markdown);
 *      doc.toHTML();
 *
 * You may also use `Styledown.parse()`.
 *
 *      Styledown.parse(markdown);
 *
 * Available options are:
 *
 * ~ prefix (String): prefix for classnames. Defaults to `sg`.
 * ~ template (String): HTML template. Defaults to a simple HTML template.
 * ~ head (String): HTML to put in the head. Default to `false`.
 * ~ body (String): HTML to put in the body. Defaults to `<div sg-content></div>`.
 * ~ indentSize (Number): Number of spaces to indent. Defaults to `2`.
 */

function Styledown (src, options) {
  this.raw = src;
  this.options = extend(extend({}, Styledown.defaults), options || {});
  this.$ = Cheerio.load(Marked(src));

  var highlightHTML = this.highlightHTML.bind(this);
  var p = this.prefix.bind(this);

  processConfig(src, this.options);
  removeConfig(this.$);

  var pre = this.options.prefix;
  var $ = this.$;

  addClasses($, p);
  sectionize($, 'h3', p, { 'class': p('block') });
  sectionize($, 'h2', p, { 'class': p('section'), until: 'h1, h2' });

  $('pre').each(function () {
    unpackExample($(this), p, highlightHTML);
  });

  isolateTextBlocks(this.$, p);
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

Styledown.prototype = {

  /**
   * toHTML() : doc.toHTML()
   * Converts to HTML.
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

    html = this.prettyprint(html);
    return html;
  },

  /**
   * prettyprint() : doc.prettyprint(html)
   * (private) Reindents given `html` based on the indent size option.
   *
   *     prettyprint('<div><a>hello</a></div>')
   *     => "<div>\n  <a>hello</a>\n</div>"
   */

  prettyprint: function (html) {
    var Html = require('html');
    return Html.prettyPrint(html, { indent_size: this.options.indentSize });
  },

  /**
   * highlightHTML():
   * (private) Syntax highlighting helper
   */

  highlightHTML: function (html) {
    var Hljs = require('highlight.js');

    html = this.prettyprint(html);
    html = Hljs.highlight('html', html).value;
    return html;
  },

  /**
   * prefix():
   * (private) Prefix classnames. Takes `options.prefix` into account.
   *
   *     prefix('block')
   *     => 'sg-block'
   */

  prefix: function(klass) {
    return klass ?
      prefixClass(klass, this.options.prefix) :
      this.options.prefix;
  }
};
