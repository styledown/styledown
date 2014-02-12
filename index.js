var Marked = require('marked');
var Jade = require('jade');
var extend = require('util')._extend;

var Styledown = module.exports;

/**
 * Parses a document.
 */

Styledown.parse = function(src) {
  return new Document(src).toHTML();
};

Styledown.Document = Document;

/**
 * Document
 */

function Document(src) {
  this.raw = src;
  var html = Marked(src);
  this.$ = require('cheerio').load(html);

  this._addClasses(this.$);
  this._unpackExamples(this.$);
}

Document.prototype = {
  toHTML: function() {
    return this.$.html();
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

extend(Document.prototype, Filters);

