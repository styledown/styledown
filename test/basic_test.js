var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('block with example', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        # Components
        ### header
        This is a header

        ~~~ example.haml
        = render 'header'
        ~~~
      `) }
  ])

  var file = out.files['components.md']
  t.true(file.title === 'Components')

  var header = file.sections.header
  t.true(header.title === 'header')
  t.true(header.depth === 3)
  t.true(header.id === 'header')
  t.true(header.parts.s1.type === 'text')
  t.true(header.parts.s1.content === '<p>This is a header</p>')
  t.true(header.parts.s2.type === 'example')
  t.true(header.parts.s2.language === 'haml')
  t.regex(header.parts.s2.content, /= render 'header'/)
})
