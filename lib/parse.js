var parse = require('./parser')

/*
 * Parses files synchronously
 */

module.exports = function (files, options) {
  var result = {
    files: {}
  }

  files.forEach(function (file) {
    var name = file.name || '[stdin]'
    result.files[name] = parse(file.data)
  })

  return result
}
