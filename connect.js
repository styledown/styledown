var extend = require('util')._extend;
var Fs = require('fs');
var Path = require('path');
var Styledown = require('.');

/**
 * Defaults
 */

var defaults = {
  path: '/styleguides',
  root: process.cwd(),
  sources: {}
};


/**
 * Middleware
 */

function Middleware (options) {
  this.options = {};
  extend(this.options, defaults);
  extend(this.options, options);
}

Middleware.prototype = {

  /**
   * Handler
   */

  run: function (req, res, next) {
    var options = this.options;

    // No need unless it matches `path`
    if (req.path.substr(0, options.path.length) !== options.path)
      return;

    var path = req.path.substr(options.path.length + 1);
    req.subpath = path;

    if (path === 'styledown.css') {
      res.set('Content-Type', 'text/css');
      res.send(200, "body { color: #333; }");
      return;
    }

    if (path === 'styledown.js') {
      res.set('Content-Type', 'application/javascript');
      res.send(200, "alert('hi');");
      return;
    }

    if (options.guides[path]) {
      var file = Path.join(options.root, options.guides[path]);
      
      Fs.exists(file, function (exists) {
        if (!exists) next();

        Fs.readFile(file, function (err, data) {
          var src = data.toString();
          var html = Styledown.parseSync(src);
          res.send(200, html);
        });
      });
      return;
    }

    next();
  }
};

/**
 * Exports
 */

module.exports = function (options) {
  var m = new Middleware(options);

  return function (req, res, next) {
    return m.run(req, res, next);
  };
};
