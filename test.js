var test = require('ava')
var styledown = require('./index')
var r = require('redent')

test('hello', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        # Components
        ### header
        This is a header

        ~~~ haml
        @example
        = render 'header'
        ~~~
      `) }
  ])
  t.truthy(out.files['components.md'].name === 'Components')
  t.truthy(out.files['components.md'].sections.header.name === 'header')
  t.truthy(out.files['components.md'].sections.header.depth === 3)
  t.truthy(out.files['components.md'].sections.header.parts[0].type === 'text')
  t.regex(out.files['components.md'].sections.header.parts[0].content, /This is a header/)
  t.pass()
})

test('multiple blocks', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        # Components
        ### header
        This is a header

        ### footer
        This is a footer
      `) }
  ])
  console.log(require('util').inspect(out, { depth: null }))
  t.truthy(out.files['components.md'].name === 'Components')
  t.truthy(out.files['components.md'].sections.header.name === 'header')
  t.truthy(out.files['components.md'].sections.header.depth === 3)
  t.truthy(out.files['components.md'].sections.header.parts[0].type === 'text')
  t.regex(out.files['components.md'].sections.header.parts[0].content, /This is a header/)

  t.truthy(out.files['components.md'].sections.footer.name === 'footer')
  t.truthy(out.files['components.md'].sections.footer.depth === 3)
  t.truthy(out.files['components.md'].sections.footer.parts[0].type === 'text')
  t.regex(out.files['components.md'].sections.footer.parts[0].content, /This is a footer/)
  t.pass()
})
