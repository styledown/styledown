var template = require('fs').readFileSync(__dirname + '/../data/template.jade', 'utf-8')
var menuTemplate = require('fs').readFileSync(__dirname + '/../data/menu.jade', 'utf-8')
var jstEngine = require('./helpers/jst_engine')

module.exports = function render (data, file, options) {
  var fn = jstEngine('jade').compile(template, { pretty: true }).fn

  var fileData = data.files[file]
  if (!file) throw new Error("No data for file '" + file + "'")
  var html = fn({ file: fileData })

  if (options && options.layout) {
    var layout = jstEngine(options.layoutEngine || 'ejs').compile(options.layout).fn
    html = layout({
      body: html,
      file: fileData,
      toc: data.toc,
      renderToc: renderMenu(data.toc, file)
    })
  }
  return html
}

function renderMenu (toc, filename) {
  var fn = jstEngine('jade').compile(menuTemplate, { pretty: true }).fn
  return function (options) {
    if (!options) options = {}
    return fn({
      toc: toc,
      active: filename,
      base: options.base || '',
      extension: options.extension || '.html'
    })
  }
}
