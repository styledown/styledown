var template = require('fs').readFileSync(__dirname + '/../data/template.ejs', 'utf-8')
var jstEngine = require('./helpers/jst_engine')

module.exports = function render (data, file, options) {
  var ejs = jstEngine('ejs')

  var fileData = data.files[file]
  if (!file) throw new Error("No data for file '" + file + "'")
  var html = ejs.render(template, {}, { file: fileData }).body

  if (options && options.layout) {
    var layout = ejs.compile(options.layout)
    html = layout({ body: html, file: fileData })
  }
  return html
}
