var template = require('fs').readFileSync(__dirname + '/../data/template.html', 'utf-8')

module.exports = function render (data, options) {
  var ejs = require('ejs')
  var fn = ejs.compile(template)
  return fn(data)
}
