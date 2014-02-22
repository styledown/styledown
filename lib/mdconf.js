
/**
 * Module dependencies.
 */

var md = require('marked');

/**
 * Parse the given `str` of markdown.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Object}
 * @api public
 */

module.exports = function(str, options){
  options = options || {};

  options = {
    normalizer: options.normalizer || 'spaced'
  };

  var normalize = normalizers[options.normalizer];
  var toks = md.lexer(str);
  var conf = {};
  var keys = [];
  var depth = 0;
  var inlist = false;

  toks.forEach(function(tok){
    switch (tok.type) {
      case 'heading':
        while (depth-- >= tok.depth) keys.pop();
        keys.push(normalize(tok.text));
        depth = tok.depth;
        break;
      case 'list_item_start':
        inlist = true;
        break;
      case 'list_item_end':
        inlist = false;
        break;
      case 'text':
        put(conf, keys, tok.text, normalize);
        break;
      case 'code':
        put(conf, keys, tok.text, normalize, true);
        break;
    }
  });

  return conf;
};

/**
 * Add `str` to `obj` with the given `keys`
 * which represents the traversal path.
 *
 * @param {Object} obj
 * @param {Array} keys
 * @param {String} str
 * @param {Function} normalize
 * @api private
 */

function put(obj, keys, str, normalize, code) {
  var target = obj;
  var last;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    last = target;
    target[key] = target[key] || {};
    target = target[key];
  }

  // code
  if (code) {
    if (!Array.isArray(last[key])) last[key] = [];
    last[key].push(str);
    return;
  }

  var i = str.indexOf(':');

  // list
  if (-1 == i) {
    if (!Array.isArray(last[key])) last[key] = [];
    last[key].push(str.trim());
    return;
  }

  // map
  var key = normalize(str.slice(0, i));
  var val = str.slice(i + 1).trim();
  target[key] = val;
}

/**
 * Normalize `str`.
 */

function normalize(str) {
  return str.replace(/\s+/g, ' ').toLowerCase().trim();
}

var normalizers = {
  spaced: function(str) {
    return str.replace(/\s+/g, ' ').toLowerCase().trim();
  },
  camelcase: function(str) {
    return str.toLowerCase().replace(/\s+([^\s])/g, function(_, char) { return char.toUpperCase(); }).trim();
  }
};
