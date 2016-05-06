var parse = require('./parse/parser')
var transformLang = require('./parse/transform_lang')
var basename = require('path').basename
var dirname = require('path').dirname
var tocify = require('./tocify')

/*
 * Parses files synchronously
 */

module.exports = function (files, options) {
  var result = {
    files: {}
  }

  files.forEach(function (file) {
    var name = file.name || '[stdin]'
    var raw = file.contents || file.data || ''
    if (basename(name) === 'README.md') {
      result.toc = tocify(raw, {}, { base: dirname(name) })
    } else {
      var data = parse(raw, name)
      transformLang(data, options)
      result.files[name] = data
    }
  })

  return result
}
