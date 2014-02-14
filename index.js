var Marked = require('marked');
var Jade = require('jade');
var Cheerio = require('cheerio');
var extend = require('util')._extend;

module.exports = Styledown;

/**
 * Document.
 */

function Styledown(src, options) {
  this.raw = src;
  this.options = extend(extend({}, Styledown.defaults), options || {});
  this.$ = Cheerio.load(Marked(src));

  this._addClasses(this.$);
  this._unpackExamples(this.$);
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
    "<link rel='stylesheet' href='styledown.css'>",
    "</head>",
    "<body sg-content>",
    "</body>",
    "</html>"
  ].join("\n"),

  /**
   * Things to put into `head`
   */
  head: "",

  /**
   * Prefix for classnames
   */
  prefix: 'sg',
};

/**
 * Shorthand for parsing.
 */

Styledown.parse = function (source, options) {
  return new Styledown(source, options).toHTML();
};

Styledown.prototype = {
  toHTML: function() {
    var html = this.$.html();

    if (!this.options.bare) {
      // Unpack template
      var $ = Cheerio.load(this.options.template);
      $('[sg-content]').append(html).removeAttr('sg-content');
      $('html, body').addClass(this.options.prefix);
      $('head').append(this.options.head);

      html = $.html();
    }

    return html;
  },
};

/**
 * Filters mixin
 */

var Filters = {
  /**
   * Adds HTML classnames to things
   */

  _addClasses: function($) {
    var prefix = this.options.prefix;

    $("*").addClass(prefix);
  },

  /**
   * Unpacks `pre` blocks into examples.
   */

  _unpackExamples: function($) {
    var pre = this.options.prefix;

    $('pre').each(function() {
      var code = $(this).text();
      var html = Jade.render(code);

      var canvas = "<div class='"+pre+"-canvas'>"+html+"</div>";
      var codeblock = "<pre class='"+pre+"-code'>"+highlight(html)+"</pre>";
      canvas = "<div class='"+pre+"-code-block'>" + canvas + codeblock + "</div>";

      var x = $(this).replaceWith(canvas);
    });
  }
};

extend(Styledown.prototype, Filters);

/**
 * Syntax highlight?
 */

function highlight (html) {
  var Html = require('html');
  var Hljs = require('highlight.js');

  html = Html.prettyPrint(html, { indent_size: 2 });
  html = Hljs.highlight('html', html).value;
  return html;
}
