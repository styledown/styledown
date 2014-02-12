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
    "<html class='-sm'>",
    "<head>",
    "<meta charset='utf-8'>",
    "<title>Styledown</title>",
    "<link rel='stylesheet' href='styledown.css'>",
    "</head>",
    "<body sm-body class='-sm'>",
    "</body>",
    "</html>"
  ].join("\n"),

  /**
   * Things to put into `head`
   */
  head: "",
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
      var $ = Cheerio.load(this.options.template);
      $('[sm-body]').append(html).removeAttr('sm-body');
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
    $("*").addClass('-sm');
  },

  /**
   * Unpacks `pre` blocks into examples.
   */

  _unpackExamples: function($) {
    $('pre').each(function() {
      var code = $(this).text();
      var html = Jade.render(code);
      var x = $(this).replaceWith("<div class='-sm-example'>"+html);
    });
  }
};

extend(Styledown.prototype, Filters);
