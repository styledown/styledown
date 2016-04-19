var test = require('ava')
var styledown = require('./index')
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
  // console.log(require('util').inspect(out, { depth: null }))
  t.truthy(out.files['components.md'].title === 'Components')
  t.truthy(out.files['components.md'].sections.header.title === 'header')
  t.truthy(out.files['components.md'].sections.header.depth === 3)
  t.truthy(out.files['components.md'].sections.header.parts.s1.type === 'text')
  t.truthy(out.files['components.md'].sections.header.parts.s1.content === '<p>This is a header</p>')
  t.truthy(out.files['components.md'].sections.header.parts.s2.type === 'example')
  t.truthy(out.files['components.md'].sections.header.parts.s2.language === 'haml')
  t.regex(out.files['components.md'].sections.header.parts.s2.content, /= render 'header'/)
  t.pass()
})

test('block with code and class', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        ### header
        This is a header

        ~~~ example.haml.a.b
        = render 'header'
        ~~~
      `) }
  ])
  t.truthy(out.files['components.md'].sections.header.parts.s1.type === 'text')
  t.truthy(out.files['components.md'].sections.header.parts.s1.content === '<p>This is a header</p>')
  t.truthy(out.files['components.md'].sections.header.parts.s2.type === 'example')
  t.truthy(out.files['components.md'].sections.header.parts.s2.language === 'haml')
  t.truthy(out.files['components.md'].sections.header.parts.s2.class === 'a b')
  t.regex(out.files['components.md'].sections.header.parts.s2.content, /= render 'header'/)
  t.pass()
})

test('slugifying', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        ### shared/header (top)
        This is a header
        ~~~
      `) }
  ])
  t.truthy('shared-header-top' in out.files['components.md'].sections)
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
  // console.log(require('util').inspect(out, { depth: null }))
  t.truthy(out.files['components.md'].title === 'Components')
  t.truthy(out.files['components.md'].sections.header.title === 'header')
  t.truthy(out.files['components.md'].sections.header.depth === 3)
  t.truthy(out.files['components.md'].sections.header.parts.s1.type === 'text')
  t.regex(out.files['components.md'].sections.header.parts.s1.content, /This is a header/)

  t.truthy(out.files['components.md'].sections.footer.title === 'footer')
  t.truthy(out.files['components.md'].sections.footer.depth === 3)
  t.truthy(out.files['components.md'].sections.footer.parts.s1.type === 'text')
  t.regex(out.files['components.md'].sections.footer.parts.s1.content, /This is a footer/)
  t.pass()
})

test('parseFiles', async t => {
  var out = await styledown.parseFiles([
    'examples/bootstrap/forms.md',
    'examples/bootstrap/components.md'
  ])

  t.truthy(out.files['examples/bootstrap/forms.md'].title === 'Forms')
  t.truthy(out.files['examples/bootstrap/components.md'].title === 'Components')
})

test('parseFiles failure', async t => {
  try {
    var out = await styledown.parseFiles([ 'xxx.xxx' ])
  } catch (e) {
    t.regex(e.message, /ENOENT: no such file or directory/)
  }
})
