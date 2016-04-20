'use strict'
/* eslint-disable no-cond-assign */

const marked = require('marked')
const normalize = require('path').normalize
const stripMarkdown = require('./strip_markdown')
const assign = Object.assign

const slugify = require('./slugify')
const tocifyPage = require('./tocify_page')

/**
 * Internal: builds the table of contents out of `markdown` text.
 * It is also responsible for determining the final name of the `.md` files.
 *
 * `files` is needed to set `headings`.
 * `docs` is used to strip out paths.
 *
 *     markdown = '* [Docpress](../README.md)'
 *
 *     tocify(markdown, files, { docs: 'docs' })
 *     =>  { sections:
 *           [ { title: 'Docpress',
 *               source: 'README.md',
 *               url: 'index.html',
 *               slug: 'index',
 *               headings: headings,
 *               expand: false|true,  // true if bold
 *               sections: [ ... ] } ]
 *
 *     _.sections[0].headings
 *     => [ { title: 'Usage', depth: 2, id: 'usage' },
 *          { title: 'Installation', depth: 2, id: 'installation', headings: [
 *            { title: 'via npm', depth: 3, id: 'via-npm' },
 *            { title: 'via Bower', depth: 3, id: 'via-bower' }
 *          ]},
 *          { title: 'Thanks', depth: 2, id: 'thanks' } ]
 *
 */

module.exports = function tocify (markdown, files, options) {
  let t = new Tocify(markdown, files, options)
  return t.run()
}

/**
 * Internal: delegate of tocify()
 */

class Tocify {
  constructor (markdown, files, options) {
    this.files = files
    this.options = options || {}

    this.tokens = marked.lexer(markdown)
    this.docs = this.options.docs || 'docs'
    this.docsExpr = new RegExp('^' + this.docs + '/')

    this.urls = {}
    this.slugs = {}
    this.sources = {}
  }

  run () {
    var re = { sections: [] }
    var crumbs = [scope]
    var current = re
    var scope
    var i = 0

    this.tokens.forEach((token) => {
      switch (token.type) {
        case 'list_start':
          scope = current.sections = []
          crumbs.push(scope)
          break

        case 'text':
          current = this.itemify(token.text, i++)
          scope.push(current)
          this.urls[current.url] = current
          this.sources[current.source] = current
          this.slugs[current.slug] = current
          break

        case 'list_end':
          crumbs.pop()
          scope = crumbs[crumbs.length - 1]
          break
      }
    })

    return re
  }

  /**
   * Parses Markdown text into `title` and `source`
   *
   *     '[page](README.md)' => { title: 'page', source: 'README.md' }
   */

  parseText (text) {
    let m
    if (m = text.match(/^\[([^\]]*)\]\((.*)\)$/)) {
      return { title: stripMarkdown(m[1]), source: m[2] }
    } else if (m = text.match(/^(?:__|\*\*)\[([^\]]*)\]\((.*)\)(?:__|\*\*)$/)) {
      return { title: stripMarkdown(m[1]), source: m[2], expand: true }
    } else {
      return { title: stripMarkdown(text) }
    }
  }

  /**
   * Internal: turns a token text (like `[README](../README.md)`) into an item in
   * the table of contents. Used by `tocify()`.
   *
   * Sets:
   *
   * - `title`
   * - `source`
   * - `expand`
   * - `anchor`
   */

  itemify (text, i) {
    const item = {}
    let unique = true

    // Add `source`, `title`, `expand`
    assign(item, this.parseText(text))
    if (!item.source) return item

    // `anchor`: Adds anchor (if needed)
    assign(item, anchorize(item.source))

    // `source`: Takes care of relative (../) paths
    assign(item, absolutify(item.source, this.docs))

    if (this.sources[item.source]) {
      // If this same item exists before, reuse its URL and stuff
      let previous = this.sources[item.source]
      assign(item, { url: previous.url })
      unique = false
    } else {
      // set `url`
      item.url = this.urlify(item.source, i)
      item.url = declash(item.url, this.urls, '.html')
    }

    // set `slug`
    item.slug = slugify(item.url)
    item.slug = declash(item.slug, this.slugs, '')

    // set `headings`
    if (unique && this.files && this.files[item.source]) {
      const headings = tocifyPage(this.files[item.source].contents)
      if (headings) item.headings = headings
    }

    return item
  }

  /**
   * Converts a source filename to a URL.
   *
   *     "docs/foo/x.md" => "foo/x.html"
   */

  urlify (source, i) {
    // Use 'index.html' for the first thing on the menu, always.
    if (i === 0) return 'index.html'
    return source.replace(/\.md$/, '.html')
      .replace(/README\.html$/, 'index.html')
      .replace(this.docsExpr, '')
  }
}

/**
 * Internal: return a URL based from `baseUrl` that isn't in URLs.
 *
 *     declash('hi.html', { 'index.html': 1 }, '.html') //=> 'hi.html'
 *     declash('index.html', { 'index.html': 1 }, '.html') //=> 'index-2.html'
 */

function declash (baseUrl, urls, extension) {
  if (!urls[baseUrl]) return baseUrl

  // Separate into `basename` / `extension`
  let basename = baseUrl.substr(0, baseUrl.length - extension.length)
  let url = baseUrl

  for (let i = 2; urls[url]; i++) { url = `${basename}-${i}${extension}` }
  return url
}

/**
 * Internal: separates a link URL to URL (`source`) and `anchor`.
 *
 *     "foo.md#top" => { source: "foo.md", anchor: "#top" }
 */

function anchorize (source) {
  let m
  if (m = source.match(/^([^#]*)(#.*)$/)) {
    return { source: m[1], anchor: m[2] }
  } else {
    return {}
  }
}

/*
 * Internal: takes care of relative paths.
 *
 *     absolutify("../README.md", "docs") => "README.md"
 *     absolutify("/README.md", "docs")   => "README.md"
 */

function absolutify (source, root) {
  if (source.substr(0, 1) !== '/') {
    if (root) {
      source = normalize(root + '/' + source)
    } else {
      source = normalize(source)
    }
  }
  source = source.replace(/^\//, '')
  return { source }
}
