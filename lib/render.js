var template = require('fs').readFileSync(__dirname + '/../data/template.ejs', 'utf-8')
var jstEngine = require('./helpers/jst_engine')

module.exports = function render (data, file, options) {
  var ejs = jstEngine('ejs')
  var fn = ejs.compile(template).fn

  var fileData = data.files[file]
  if (!file) throw new Error("No data for file '" + file + "'")
  var html = fn({ file: fileData })

  if (options && options.layout) {
    var layout = ejs.compile(options.layout).fn
    html = layout({ body: html, file: fileData })
  }
  return html
}
