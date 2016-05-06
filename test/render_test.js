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

test('rendering TOC', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * [Components](components.md)
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])
  var html = styledown.render(out, 'components.md', {
    layout: '<%- renderToc() %>'
  })

  t.regex(html, /<ul class="styleguide-menu">/)
  t.regex(html, /<li class="styleguide-menu-item -level-1">/)
  t.regex(html, /<a href="components.html"/)
})

test('rendering TOC with custom extensions', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * [Components](components.md)
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])

  var html = styledown.render(out, 'components.md', {
    layout: '<%- renderToc({ extension: "" }) %>'
  })

  t.regex(html, /<a href="components"/)
})

test('rendering TOC via render()', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * [Components](components.md)
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])
  var html = styledown.render(out, 'components.md', { block: 'menu' })

  t.regex(html, /<ul class="styleguide-menu">/)
  t.regex(html, /<li class="styleguide-menu-item -level-1">/)
  t.regex(html, /<a href="components.html"/)
})
