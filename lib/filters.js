var extend        = require('util')._extend;
var parseCodeText = require('./utils').parseCodeText;
var parseTags     = require('./utils').parseTags;
var prefixClass   = require('./utils').prefixClass;
var htmlize       = require('./utils').htmlize;

/**
 * Adds classes
 */

exports.addClasses = function ($, prefix) {
  $("*").addClass(prefix);
};

/**
 * Break it apart into sections.
 *
 * Puts <h3> blocks into <section> blocks.
 */

exports.sectionize = function ($, tag, options) {
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
};

/**
 * Unpacks `pre` blocks into examples.
 */

exports.unpackExample = function (parent, pre, highlight) {
  var code = parent.text();
  var block = parseCodeText(code);
  var tags = parseTags(block.tag);

  if (tags.example) {
    var html = htmlize(block.code);
    var canvas = "<div class='"+pre+"-canvas'>"+html+"</div>";
    var codeblock = "<pre class='"+pre+"-code'>"+highlight(html)+"</pre>";
    var $block = Cheerio.load("<div class='"+pre+"-example'>" + canvas + codeblock + "</div>");

    if (tags['class']) {
      klass = prefixClass(tags['class'], pre);
      $block(':root').addClass(klass);
    }

    parent.replaceWith($block.root());
  } else {
    klass = parent.find('code').attr('class');
    var m = klass.match(/lang-([a-z]+)/);

    if (m) {
      var lang = m[1];
      var Hljs = require('highlight.js');
      parent.html(Hljs.highlight(lang, parent.text()).value);
      parent.addClass(pre+'-lang-'+lang);
      parent.addClass(pre+'-code');
    }
  }
};
