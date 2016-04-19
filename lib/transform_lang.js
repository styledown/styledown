var each = require('./each')

/*
 * Takes `data`, which is a file in styledown.parse's output, and performs
 * language transformations.
 */

module.exports = function (data, options) {
  var langs = options && options.transform
  if (!Array.isArray(langs)) return

  each(data.sections, function (section) {
    each(section.parts, function (part) {
      if (part.type === 'example' && langs.indexOf(part.language) > -1) {
        part.content = transform(part.content, part.language)
        part.language = 'html'
      }
    })
  })
}

/*
 * Transforms `input` as a language `lang` via jstransformer.
 *
 *     transform('.hello world', 'jade')
 *     => '<div class="hello">world</div>'
 */

function transform (input, lang) {
  var engine = jstEngine(lang)
  return engine.render(input).body
}

var engines = {}

/*
 * Returns a jstransformer engine for `lang`.
 *
 *     jstEngine('jade')
 */

function jstEngine (lang) {
  if (engines[lang]) return engines[lang]

  var transformer = require('jstransformer')

  // Have a special case for jade so that jstransformer-jade will be part of
  // the browserify bundle.
  if (lang === 'jade') {
    engines[lang] = transformer(require('jstransformer-jade'))
  } else {
    engines[lang] = transformer(require('jstransformer-' + lang))
  }

  return engines[lang]
}
