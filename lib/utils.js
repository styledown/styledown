/**
 * Get the tags and code out of the code text.
 *
 *     parseCodeText('@example\nhello')
 *     => { tag: 'example', code: 'hello' }
 *
 *     parseCodeText('hello')
 *     => { tag: null, code: 'hello' }
 */

exports.parseCodeText = function (code) {
  var m = code.trim().match(/^@([^\n]+)/);

  if (m) return { tag: m[1], code: code.substr(m[1].length+2) };
  return { tag: null, code: code };
};

/**
 * Parse tags
 */

exports.parseTags = function (str) {
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
};

/**
 * Prefixes classnames.
 *
 *     prefixClass('white', 'sg')     => 'sg-white'
 *     prefixClass('pad dark', 'sg')  => 'sg-pad sg-dark'
 */

exports.prefixClass = function (klass, prefix) {
  return klass.split(' ').map(function (n) {
    return n.length > 0 ? (prefix + '-' + n) : n;
  }).join(' ');
};

/**
 * Processes a block of text as either HTML or Jade.
 */

exports.htmlize = function (src) {
  // Mdconf processes them as arrays
  if (src.constructor === Array) src = src[0];

  if (src.substr(0, 1) === '<') {
    return src;
  } else {
    var Jade = require('jade/lib/jade');
    return Jade.render(src);
  }
};
