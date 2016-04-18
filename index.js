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
  var md = require('markdown-it')()
  var env = {}
  var result = {}

  var tokens = [].concat(md.parse(data, env))
  eatDocument(md, tokens, result)
  return result
}

function eatDocument (md, tokens, result) {
  while (tokens.length > 0) {
    eatSection(md, tokens, result)
  }
  return true
}

function eatSection (md, tokens, result) {
  var left = []
  var section = { }
  if (!result.sections) result.sections = {}
  result._section = section

  // h
  eatH1(md, tokens, result)
  if (!eatHeading(md, tokens, result)) return

  while (tokens.length) {
    if (eatSection(md, tokens, result)) {
      close()
      return true
    }
    left.push(tokens.shift())
  }

  close()
  return true

  function close () {
    section.content = md.renderer.render(left, md.options)
  }
}

function eatH1 (md, tokens, result) {
  var token = tokens[0]
  if (!token) return false
  if (token.type !== 'heading_open' || token.tag !== 'h1') return false

  var textToken = tokens[1]
  var txt = md.renderer.render(tokens[1].children, md.options)
  result.name = txt
  tokens.shift()
  tokens.shift()
  tokens.shift()
  return true
}

function eatHeading (md, tokens, result) {
  var token = tokens[0]
  if (!token) return false
  if (token.type !== 'heading_open') return false
  if (!(~['h1', 'h2', 'h3'].indexOf(token.tag))) return false

  var textToken = tokens[1]
  var txt = md.renderer.render(tokens[1].children)
  var section = result._section
  section.name = txt
  section.depth = token.tag

  result.sections[txt] = section
  tokens.shift()
  tokens.shift()
  tokens.shift()
  return true
}

/*
 * while (keep splicing) {
 *   if eatSpecial()
 *     process the spliced
 *     shift the tokens
 * }
 */
