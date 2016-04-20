var engines = {}

/*
 * Returns a jstransformer engine for `lang`, where it may be a language or a
 * filename.
 *
 *     jstEngine('jade')
 *     jstEngine('foo.jade')
 */

module.exports = function jstEngine (lang) {
  lang = getExtension(lang)
  if (engines[lang]) return engines[lang]

  var transformer = require('jstransformer')

  // Have a special case for jade/ejs so that jstransformer-jade will be part
  // of the browserify bundle.
  if (lang === 'jade') {
    engines[lang] = transformer(require('jstransformer-jade'))
  } else if (lang === 'ejs') {
    engines[lang] = transformer(require('jstransformer-ejs'))
  } else {
    engines[lang] = transformer(require('jstransformer-' + lang))
  }

  return engines[lang]
}

/*
 * Internal: get extension of a given file. If it has no extension, just return
 * it as is.
 *
 *     getExtension('jade')      => 'jade'
 *     getExtension('foo.jade')  => 'jade'
 */

function getExtension (lang) {
  if (~lang.indexOf('.')) {
    return lang.replace(/^.*\.([^\.]+)$/, '$1')
  } else {
    return lang
  }
}
