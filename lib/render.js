var templatePath = require('path').join(__dirname, '..', 'data', 'template.html')
var template = require('fs').readFileSync(templatePath, 'utf-8')

module.exports = function render (data, options) {
  var ejs = require('ejs')
  var fn = ejs.compile(template)
  return fn(data)
}
