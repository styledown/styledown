/*
 * browserify distribution
 */

// for compatibility with console-less engines (eg, ruby)
require('console-polyfill');

(function () {
  if (!this.window) this.window = this;
  module.exports = require('../index');
  this.Styledown = require('../index');
})();
