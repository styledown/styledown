var extend = require('util')._extend;

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
