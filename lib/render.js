var template = require('fs').readFileSync(__dirname + '/../data/template.html', 'utf-8')

module.exports = function render (data, file, options) {
  var ejs = require('ejs')
  var fn = ejs.compile(template)
  var fileData = data.files[file]
  if (!file) throw new Error("No data for file '" + file + "'")
  var html = fn({ file: fileData })

  if (options && options.layout) {
    var layout = ejs.compile(options.layout)
    html = layout({ body: html, file: fileData })
  }
  return html
}
