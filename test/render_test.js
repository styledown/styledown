var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('rendering', t => {
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
  var html = styledown.render(out, 'components.md')
  t.regex(html, /<h1 id='components'>Components<\/h1>/)
  t.regex(html, /<h3 id='header'>header<\/h3>/)
  t.regex(html, /<p>This is a header<\/p>/)
})
