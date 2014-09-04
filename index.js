/**
 * Styledown is available as a Node.js package.
 *
 *     var Styledown = require('styledown');
 */

var Marked = require('marked'),
    Cheerio = require('cheerio'),
    extend = require('util')._extend,
    mdextract = require('mdextract');

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
 * Generates HTML from a given `source`.
 *
 *     Styledown.parse('### hello *world*');
 *     => "<!doctype html><html>..."
 *
 * `source` can be a String or an Array. as a string, it's assumed to be a
 * Markdown document. As an array, it's assumed to be a list of files.  It's
 * expected that it contains objects with `name` and `data` keys.
 *
 * In array mode, Styledown treats each file differently. Inline comments are
 * extracted from those with that end in CSS extensions (css, less, sass, etc),
 * while the rest are assumed to be Markdown documents.
 *
 *     var docs = [
 *       { name: 'css/style.css', data: '...' },
 *       { name: 'config.md', data: '...' }
 *     ];
 *
 *     Styledown.parse(docs);
 *     => "<!doctype html><html>..."
 *
 * You may pass `options` as the second parameter. Available options are:
 *
 * ~ prefix (String): prefix for classnames. Defaults to `sg`.
 * ~ template (String): HTML template. Defaults to a simple HTML template.
 * ~ head (String): HTML to put in the head. Default to `false`.
 * ~ body (String): HTML to put in the body. Defaults to `<div sg-content></div>`.
 * ~ indentSize (Number): Number of spaces to indent. Defaults to `2`.
 * ~ inline (Boolean): if `true`, then inline CSS mode is forced.
 *
 * This is shorthand for `new Styledown().toHTML()`. You can use `Styledown` as a class.
 */

Styledown.parse = function (source, options) {
  return new Styledown(source, options).toHTML();
};

/**
 * Styledown.version:
 * The version number in semver format.
 */

Styledown.version = require('./package.json').version;

/**
 * Styledown.defaults:
 * The returns the default configuration file, JS file and CSS files.
 *
 *     Styledown.defaults.conf()
 *     Styledown.defaults.js()
 *     Styledown.defaults.css()
 */

Styledown.defaults = {
  conf: function () {
    return require('./lib/default_conf');
  },
  js: function () {
    return require('fs').readFileSync(__dirname + '/data/styledown.js');
  },
  css: function () {
    return require('fs').readFileSync(__dirname + '/data/styledown.css');
  },
};

/***
 * Styledown() : new Styledown(source, [options])
 * Parses the source `source` into a Styledown document. `source` can be a
 * Markdown document.
 *
 *      doc = new Styledown(markdown);
 *      doc.toHTML();
 *
 * You may also use `Styledown.parse()` as a shorthand.
 */

function Styledown (src, options) {
  this.options = extend(extend({}, Styledown.defaultOptions), options || {});
  this.raw = this.extract(src);
  this.$ = Cheerio.load(Marked(this.raw));

  this.process();
}

Styledown.defaultOptions = {

  /* HTML template */
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

  /* Things to put into `head` */
  head: false,

  /* Force inline mode */
  inline: false,

  /* Things to put into `body` */
  body: "<div sg-content></div>",

  /* Prefix for classnames */
  prefix: 'sg',

  /* Indentation spaces */
  indentSize: 2
};

Styledown.prototype = {

  /**
   * toHTML() : doc.toHTML()
   * Returns the full HTML source based on the Styledown document.
   *
   *     doc.toHTML()
   *     => "<!doctype html><html>..."
   */

  toHTML: function() {
    var html = this.toBareHTML();

    if (this.options.head !== false) {
      // Unpack template
      var $ = Cheerio.load(htmlize(this.options.template));
      $('body').append(htmlize(this.options.body));
      $('[sg-content]').append(html).removeAttr('sg-content');
      $('html, body').addClass(this.options.prefix);
      $('head').append(htmlize(this.options.head));

      html = $.html();
    }

    html = this.prettyprint(html, { wrap_line_length: 0 });
    return html;
  },

  /**
   * toBareHTML() : doc.toBareHTML()
   * Returns the bare HTML without the head/body templates.
   *
   *     doc.toBareHTML()
   *     => "<div><h3>Your document</h3>..."
   */

  toBareHTML: function () {
    return this.$.html();
  },

  /**
   * extract():
   * (private) extracts a Markdown source from given `src`.
   */

  extract: function (src) {
    var self = this;

    if (typeof src === 'string')
      return src;

    if (Array.isArray(src)) {
      return src.map(function (f) {
        if (self.options.inline || f.name && f.name.match(/(sass|scss|styl|less|css)$/)) {
          return mdextract(f.data, { lang: 'css' }).toMarkdown();
        } else {
            return f.data;
        }
      }).join("\n");
    }
  },

  /**
   * process() : doc.process()
   * (private) processes things. Done on the constructor.
   */

  process: function () {
    var highlightHTML = this.highlightHTML.bind(this);
    var p = this.prefix.bind(this);
    var src = this.raw;

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
  },

  /**
   * prettyprint() : doc.prettyprint(html)
   * (private) Reindents given `html` based on the indent size option.
   *
   *     doc.prettyprint('<div><a>hello</a></div>')
   *     => "<div>\n  <a>hello</a>\n</div>"
   */

  prettyprint: function (html, options) {
    var beautify = require('js-beautify').html_beautify;

    var opts = {
      indent_size: this.options.indentSize,
      wrap_line_length: 120,
      unformatted: ['pre']
    };

    // js-beautify sometimes trips when the first character isn't a <. not
    // sure... but might as well do this.
    html = html.trim();

    var output = beautify(html, extend(opts, options));

    // cheerio output tends to have a bunch of extra newlines. kill them.
    output = output.replace(/\n\n+/g, "\n\n");

    return output;
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
