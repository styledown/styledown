var marked = require('marked')

/*
 * Styledown
 */

module.exports = function styledown (files, options) {
  var result = {
    files: {}
  }

  files.forEach(function (file) {
    var name = file.name || '[stdin]'
    result.files[name] = buildFile(file.data)
  })

  return result
}

function buildFile (data) {
  var tokens = marked.lexer(data)
  var result = {
    name: null,
    sections: {}
  }
  var section

  tokens.forEach(function (t) {
    // h1
    if (t.type === 'heading' && t.depth === 1) {
      result.name = t.text
    }

    // h1...h6 { type: 'heading', depth: 3, text: 'header' }
    if (t.type === 'heading') {
      var id = slugify(t.text)
      section = { type: 'text', depth: t.depth, heading: t.text }
      result.sections[id] = section
    }
  })

  return result
}

function slugify (str) {
  return str.toLowerCase()
}
