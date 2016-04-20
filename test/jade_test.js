var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('transforming jade', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        # Components
        ### header
        This is a header

        ~~~ example.jade
        .hello world
        ~~~
      `) }
  ], { transform: ['jade'] })

  var example = out.files['components.md'].sections.header.parts.s2
  t.true(example.language === 'html')
  t.true(example.content === '<div class="hello">world</div>')
  t.true(example.source === '.hello world')
})

test('dont transform if not specified', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        # Components
        ### header
        This is a header

        ~~~ example.jade
        .hello world
        ~~~
      `) }
  ])

  var example = out.files['components.md'].sections.header.parts.s2
  t.true(example.language === 'jade')
  t.true(example.content === '.hello world')
})
