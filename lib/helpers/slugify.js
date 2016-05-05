var unidecode = require('unidecode')
var kebabcase = require('lodash.kebabcase')

/*
 * Slugifies some text. Uses the same things that markdown-it-named-headings
 * does.
 *
 *     slugify('Hello, world!')
 *     => 'hello-world'
 */

module.exports = function slugify (text) {
  return kebabcase(unidecode(text))
}
