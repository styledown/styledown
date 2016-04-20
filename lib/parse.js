var parse = require('./parse/parser')
var transformLang = require('./parse/transform_lang')

/*
 * Parses files synchronously
 */

module.exports = function (files, options) {
  var result = {
    files: {}
  }

  files.forEach(function (file) {
    var name = file.name || '[stdin]'
    var data = parse(file.data, name)
    transformLang(data, options)
    result.files[name] = data
  })

  return result
}
