var template = require('fs').readFileSync(__dirname + '/../data/template.jade', 'utf-8')
var menuTemplate = require('fs').readFileSync(__dirname + '/../data/menu.jade', 'utf-8')
var sidebarTemplate = require('fs').readFileSync(__dirname + '/../data/sidebar.jade', 'utf-8')
var jstEngine = require('./helpers/jst_engine')

/*
 * Renders. See API docs.
 */

module.exports = function render (data, file, options) {
  if (options && options.block === 'menu') {
    return renderMenu(data.toc, file)()
  }

  return renderFile(data, file, options)
}

/*
 * Renders a file.
 */

function renderFile (data, file, options) {
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
      renderToc: renderMenu(data.toc, file),
      renderSidebar: renderSidebar(renderMenu(data.toc, file))
    })
  }
  return html
}

/*
 * Renders the menu from the table of contents `toc`. `filename` is the
 * filename to be rendered.
 *
 *    var files = [ { name: 'forms.md', contents: '...' } ]
 *    var data = styledown.parse(files)
 *    styledown.render(data, 'forms.md', { section: 'menu' })
 */

function renderMenu (toc, filename) {
  var fn = jstEngine('jade').compile(menuTemplate, { pretty: true }).fn

  return function (options) {
    if (!options) options = {}
    return fn({
      toc: toc,
      active: filename,
      base: options.base || '',
      extension: 'extension' in options ? options.extension : '.html'
    })
  }
}

function renderSidebar (renderToc) {
  var fn = jstEngine('jade').compile(sidebarTemplate, { pretty: true }).fn

  return function (options) {
    if (!options) options = {}
    return fn({
      renderToc: renderToc
    })
  }
}
