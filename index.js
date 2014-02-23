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
  Filters.unpackExamples(this.$, this.options, this._highlight.bind(this));
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

  _highlight: function (html) {
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

    $('pre').each(function() {
      var code = this.text();
      var block = Filters.parseCodeText(code);
      var html = htmlize(block.code);

      var canvas = "<div class='"+pre+"-canvas'>"+html+"</div>";
      var codeblock = "<pre class='"+pre+"-code'>"+highlight(html)+"</pre>";
      canvas = $.parseHTML("<div class='"+pre+"-code-block'>" + canvas + codeblock + "</div>");

      // if (padded) .sg-canvas

      var x = this.replaceWith(canvas);
    });
  },

  /**
   * Get the tags and code out of the code text
   */

  parseCodeText: function (code) {
    var m = code.trim().match(/^@(.*?)\n(.*?)$/);

    if (m) return { tag: m[1], code: m[2] };
    return { tag: null, code: code };
  },

  /**
   * Break it apart into sections
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
    var data = Mdconf(src, { normalizer: 'camelcase' });
    data = (data && data.styleguideOptions);

    if (data) extend(options, data);
  },

  /**
   * Parse tags
   */

  parseTags: function (str) {
    var m;
    var obj = {};

    while (true) {
      if (m = str.match(/^([a-z\-]+)="([^"]+)"\s*/)) {
        obj[m[1]] = m[2];
      } else if (m = str.match(/^([a-z\-]+)='([^']+)'\s*/)) {
        obj[m[1]] = m[2];
      } else if (m = str.match(/^([a-z\-]+)=([^\s]+)\s*/)) {
        obj[m[1]] = m[2];
      } else if (m = str.match(/^([a-z\-]+)\s*/)) {
        obj[m[1]] = true;
      } else {
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
