var Marked = require('marked');
var Cheerio = require('cheerio');
var extend = require('util')._extend;

module.exports = Styledown;
var Filters = Styledown.filters = {};

/**
 * Document.
 */

function Styledown (src, options) {
  this.raw = src;
  this.options = extend(extend({}, Styledown.defaults), options || {});
  this.$ = Cheerio.load(Marked(src));

  Filters.processConfig(src, this.options);
  Filters.removeConfig(this.$);

  var pre = this.options.prefix;

  Filters.addClasses(this.$, this.options);
  Filters.sectionize(this.$, 'h3', { 'class': pre+'-block', prefix: pre });
  Filters.sectionize(this.$, 'h2', { 'class': pre+'-section', until: 'h1, h2', prefix: pre });
  Filters.unpackExamples(this.$, this.options, this._highlightHTML.bind(this));
}

Styledown.defaults = {
  /**
   * Disable template if true
   */
  bare: false,

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
  head: [
    '<link rel="stylesheet" href="styledown.css" type="text/css">',
    '<script src="styledown.js"></script>'
  ].join("\n"),

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

    if (!this.options.bare) {
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
   * Adds HTML classnames to things
   */

  addClasses: function ($, options) {
    var prefix = options.prefix;

    $("*").addClass(prefix);
  },

  /**
   * Unpacks `pre` blocks into examples.
   */

  unpackExamples: function ($, options, highlight) {
    var pre = options.prefix;
    var klass;

    $('pre').each(function() {
      var code = this.text();
      var block = Filters.parseCodeText(code);
      var tags = Filters.parseTags(block.tag);

      if (tags.example) {
        var html = htmlize(block.code);
        var canvas = "<div class='"+pre+"-canvas'>"+html+"</div>";
        var codeblock = "<pre class='"+pre+"-code'>"+highlight(html)+"</pre>";
        var $block = Cheerio.load("<div class='"+pre+"-example'>" + canvas + codeblock + "</div>");

        if (tags['class']) {
          klass = Filters.prefixClass(tags['class'], pre);
          $block(':root').addClass(klass);
        }

        this.replaceWith($block.root());
      } else {
        klass = this.find('code').attr('class');
        var m = klass.match(/lang-([a-z]+)/);

        if (m) {
          var lang = m[1];
          var Hljs = require('highlight.js');
          this.html(Hljs.highlight(lang, this.text()).value);
          this.addClass(pre+'-lang-'+lang);
        }
      }
    });
  },

  /**
   * Prefixes classnames.
   *
   *     prefixClass('white', 'sg')     => 'sg-white'
   *     prefixClass('pad dark', 'sg')  => 'sg-pad sg-dark'
   */

  prefixClass: function (klass, prefix) {
    return klass.split(' ').map(function (n) {
      return n.length > 0 ? (prefix + '-' + n) : n;
    }).join(' ');
  },

  /**
   * Get the tags and code out of the code text.
   *
   *     parseCodeText('@example\nhello')
   *     => { tag: 'example', code: 'hello' }
   *
   *     parseCodeText('hello')
   *     => { tag: null, code: 'hello' }
   */

  parseCodeText: function (code) {
    var m = code.trim().match(/^@([^\n]+)/);

    if (m) return { tag: m[1], code: code.substr(m[1].length+2) };
    return { tag: null, code: code };
  },

  /**
   * Break it apart into sections.
   *
   * Puts <h3> blocks into <section> blocks.
   */

  sectionize: function ($, tag, options) {
    options = extend({
      'class': '',
      'until': 'h1, h2, h3, section',
      'prefix': ''
    }, options);

    $(tag).each(function (i) {
      var $heading = this;
      var $extras = $heading.nextUntil(options.until);
      $heading.before("<section class='"+options.class+"'>");

      var $div = $("section."+options.class).eq(-1);
      $div.addClass(options.prefix + '-section-' + $heading.attr('id'));
      $div.append($heading.remove());
      $div.append($extras.remove());
    });
  },

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
   * Parse tags
   */

  parseTags: function (str) {
    if (typeof str !== 'string') return {};

    var m;
    var obj = {};
    str = str.trim();

    while (true) {
      if (m = str.match(/^\.([a-z\-]+)\s*/)) {
        if (!obj["class"]) obj["class"] = [];
        obj["class"].push(m[1]);
      } else if (m = str.match(/^([a-z\-]+)="([^"]+)"\s*/)) {
        obj[m[1]] = m[2];
      } else if (m = str.match(/^([a-z\-]+)='([^']+)'\s*/)) {
        obj[m[1]] = m[2];
      } else if (m = str.match(/^([a-z\-]+)=([^\s]+)\s*/)) {
        obj[m[1]] = m[2];
      } else if (m = str.match(/^([a-z\-]+)\s*/)) {
        obj[m[1]] = true;
      } else {
        if (obj["class"]) obj["class"] = obj["class"].join(' ');
        return obj;
      }

      // Trim
      str = str.substr(m[0].length);
    }
  }
});

function htmlize (src) {
  // Mdconf processes them as arrays
  if (src.constructor === Array) src = src[0];

  if (src.substr(0, 1) === '<') {
    return src;
  } else {
    var Jade = require('jade');
    return Jade.render(src);
  }
}
