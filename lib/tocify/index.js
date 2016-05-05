var parseLink = require('./parse_link')
var assign = Object.assign
var slugify = require('../helpers/slugify')

module.exports = function tocify (contents) {
  var md = require('markdown-it')()

  var m, tokens = md.parse(contents)
  while (tokens.length) {
    if (m = matchList(tokens, ulFunc, liFunc)) {
      return m.payload
    } else {
      tokens = tokens.slice(1)
    }
  }

  function ulFunc (payload) {
    return { sections: payload.items }
  }

  function liFunc (payload) {
    var res = parseLink(payload.inline.content)
    if (res.source) {
      res.basename = res.source.replace(/\.md$/, '')
    }
    if (payload.list) {
      res.sections = payload.list.sections
    }
    return res
  }
}

/*
 * Matches a list. Used to take the tokens stream into an AST-like thing.
 *
 *     m = matchList(tokens)
 *     m.payload.items  // items (payloads from matchItem())
 *     m.tokens         // remaining tokens
 *
 * `liFunc` and `ulFunc` will be what will transform the payloads.
 */

function matchList (tokens, ulFunc, liFunc) {
  var m, open = tokens[0]
  if (!open || open.type !== 'bullet_list_open') return

  tokens = tokens.slice(1)
  var payload = { items: [] }

  if (!ulFunc) ulFunc = function (data) { return data }
  if (!liFunc) liFunc = function (data) { return data }

  while (tokens.length) {
    var t = tokens[0]
    if (!t) return

    if (m = matchItem(tokens, ulFunc, liFunc)) {
      payload.items.push(m.payload)
      tokens = m.tokens
    } else if (t.type === 'bullet_list_close') {
      return { tokens: tokens.slice(1), payload: ulFunc(payload) }
    } else {
      return
    }
  }
}

/*
 * Matches a list item
 *
 *     m = matchItem(tokens)
 *     m.payload.contents  // tokens
 *     m.payload.inline    // inline text token
 *     m.payload.list      // bullet list (payload from matchList())
 *     m.tokens
 */

function matchItem (tokens, ulFunc, liFunc) {
  var m, open = tokens[0]
  if (!open || open.type !== 'list_item_open') return

  tokens = tokens.slice(1)
  var payload = { contents: [] }

  while (tokens.length) {
    var t = tokens[0]
    if (!t) return

    if (m = matchList(tokens, ulFunc, liFunc)) {
      payload.list = m.payload
      tokens = m.tokens
    } else if (m = matchItem(tokens, ulFunc, liFunc)) {
      tokens = m.tokens
    } else if (t.type === 'inline') {
      payload.inline = t
      tokens = tokens.slice(1)
    } else if (t.type === 'list_item_close') {
      return {
        tokens: tokens.slice(1),
        payload: liFunc(payload)
      }
    } else {
      payload.contents.push(t)
      tokens = tokens.slice(1)
    }
  }
}
