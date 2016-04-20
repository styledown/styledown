var each = require('../helpers/each')
var jstEngine = require('../helpers/jst_engine')

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
        part.source = part.content
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
