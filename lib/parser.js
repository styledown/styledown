module.exports = function parse (data) {
  var md = require('markdown-it')()
    .use(require('markdown-it-named-headers'))
  var env = {}
  var out = { title: null, sections: {} }

  var tokens = [].concat(md.parse(data, env))
  eatDocument(md, tokens, out)
  return out
}

/*
 * document := section, ...
 */

function eatDocument (md, tokens, out) {
  while (tokens.length > 0) {
    eatSection(md, tokens, out)
  }
  return true
}

/*
 * section := heading, ?
 */

function eatSection (md, tokens, out) {
  var left = []
  var section = { title: null, depth: null, parts: {} }

  eatH1(md, tokens, out)
  if (!eatHeading(md, tokens, out, section)) return

  while (tokens.length) {
    if (eatSection(md, tokens, out)) {
      return close()
    }
    left.push(tokens.shift())
  }

  return close()

  function close () {
    return eatSectionText(md, left, section)
  }
}

function eatSectionText (md, tokens, section) {
  var id = 's' + (Object.keys(section.parts).length + 1)
  section.parts[id] = {
    type: 'text',
    content: md.renderer.render(tokens, md.options)
  }
  return true
}

/*
 * sets out.title
 */

function eatH1 (md, tokens, out) {
  var token = tokens[0]
  if (!token) return false
  if (token.type !== 'heading_open' || token.tag !== 'h1') return false

  var textToken = tokens[1]
  var txt = md.renderer.render(tokens[1].children, md.options)
  out.title = txt
  return true
}

/*
 * heading := Token 'heading_open', Token 'inline', Token 'heading_close'
 */

function eatHeading (md, tokens, out, section) {
  var token = tokens[0]
  if (!token) return false
  if (token.type !== 'heading_open') return false
  if (!(~['h1', 'h2', 'h3'].indexOf(token.tag))) return false

  var textToken = tokens[1]
  var txt = md.renderer.render(tokens[1].children)
  var id = txt
  section.title = txt
  section.depth = +token.tag.substr(1) // 'h2' => 2

  out.sections[id] = section
  tokens.shift()
  tokens.shift()
  tokens.shift()
  return true
}
