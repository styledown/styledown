var parse = require('./parser')
var transformLang = require('./transform_lang')

/*
 * Parses files synchronously
 */

module.exports = function (files, options) {
  var result = {
    files: {}
  }

  files.forEach(function (file) {
    var name = file.name || '[stdin]'
    var data = parse(file.data)
    transformLang(data, options)
    result.files[name] = data
  })

  return result
}
