module.exports = function tocify (contents) {
  var md = require('markdown-it')()

  var tokens = md.parse(contents)
  var depth = 0
  console.log(tokens.slice(5, 8).map(t => t.type))
  var html = md.renderer.render(tokens.slice(5, 8), md.options)
  console.log(require('util').inspect(html, { depth: null, colors: true }))
  tokens.forEach(function (token, i) {
    console.log(token.type)
    if (token.type === 'bullet_list_open') {
      depth++
    } else if (token.type === 'bullet_list_close') {
      depth--
    } else if (token.type === 'list_item_open') {
      // eat until list_item_close
    } else {
    }
  })

  return {}
}

function eatList (tokens) {
  var token = tokens[0]
  if (!token || token.type !== 'bullet_list_open') return

  tokens.shift()

  while (tokens.length > 0) {
    eatListItem(tokens)
  }

  return true
}

function eatListItem (tokens) {
  var token = tokens[0]
  if (!token || token.type !== 'list_item_open') return
}
