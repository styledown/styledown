module.exports = function parse (data) {
  var md = require('markdown-it')()
    .use(require('markdown-it-named-headings'))
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
    eatSection(md, tokens, out) ||
    eatLeftover(md, tokens)
  }
  return true
}


/*
 * Eat tokens that are before a heading, they should be discarded
 */

function eatLeftover (md, tokens) {
  tokens.shift()
}

/*
 * section := heading, ?
 */

function eatSection (md, tokens, out) {
  var left = []
  var section = { id: null, title: null, depth: null, parts: {} }

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
    return eatSectionParts(md, left, section)
  }
}

function eatSectionParts (md, tokens, section) {
  var left = []

  while (tokens.length) {
    var token = tokens[0]
    if (token.type === 'fence') {
      procSectionText(md, left, section)
      eatSectionFence(md, tokens, section)
      left = []
    } else {
      left.push(tokens.shift())
    }
  }

  procSectionText(md, left, section)
  return true
}

function procSectionText (md, tokens, section) {
  if (tokens.length === 0) return
  var id = 's' + (Object.keys(section.parts).length + 1)
  section.parts[id] = {
    type: 'text',
    id: id,
    content: md.renderer.render(tokens, md.options).trim()
  }
  return true
}

function eatSectionFence (md, tokens, section) {
  var id = 's' + (Object.keys(section.parts).length + 1)
  var example = parseExampleInfo(tokens[0].info.trim())

  if (example) {
    section.parts[id] = {
      type: 'example',
      language: example.language,
      class: example.class,
      content: tokens[0].content.trim()
    }
  } else {
    section.parts[id] = {
      type: 'code',
      language: tokens[0].info.trim(),
      content: tokens[0].content.trim()
    }
  }

  tokens.shift()
  return true
}

function parseExampleInfo (str) {
  var m = str.match(/^example\.([^\.]+)((?:\.[^\.]+)*)$/)
  if (m) {
    return {
      language: m[1],
      class: (m[2] || '.').substr(1).split('.').join(' ')
    }
  }
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
  var id = getAttr(token, 'id')
  section.id = id
  section.title = txt
  section.depth = +token.tag.substr(1) // 'h2' => 2

  out.sections[id] = section
  tokens.shift()
  tokens.shift()
  tokens.shift()
  return true
}

function getAttr (token, attr) {
  var attrs = token.attrs || []
  for (var i = 0, len = attrs.length; i < len; i++) {
    var attr = attrs[i]
    if (attr[0] === 'id') return attr[1]
  }

  throw new Error('Styledown.parse: no ID for heading')
}
