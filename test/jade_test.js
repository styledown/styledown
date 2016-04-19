var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('jade', t => {
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
})
