'use strict'

const parameterize = require('lodash.kebabcase')

/**
 * Turns a string into a normalized string that can be used for a CSS
 * id/classname.
 *
 *     slugify('/foo/bar.html')
 *     //=> 'foo-bar'
 */

module.exports = function slugify (str) {
  str = str.toLowerCase()
  str = str.replace(/\/index.html$/, '')
  str = str.replace(/.html$/, '')
  str = parameterize(str)
  str = str.replace(/[^a-zA-Z0-9\-_]/g, '')
  if (str.length) return str
}
