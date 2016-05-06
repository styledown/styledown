var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('block with code and class', t => {
  var out = styledown.parse([
    { name: 'components.md',
      contents: r(`
        ### header
        This is a header

        ~~~ example.haml.a.b
        = render 'header'
        ~~~
      `) }
  ])
  var header = out.files['components.md'].sections.header
  t.true(header.parts.s1.type === 'text')
  t.true(header.parts.s1.content === '<p>This is a header</p>')
  t.true(header.parts.s2.type === 'example')
  t.true(header.parts.s2.language === 'haml')
  t.true(header.parts.s2.class === 'a b')
  t.regex(header.parts.s2.content, /= render 'header'/)
})

test('slugifying', t => {
  var out = styledown.parse([
    { name: 'components.md',
      contents: r(`
        ### shared/header (top)
        This is a header
        ~~~
      `) }
  ])
  t.true('shared-header-top' in out.files['components.md'].sections)
  t.pass()
})

test('multiple blocks', t => {
  var out = styledown.parse([
    { name: 'components.md',
      contents: r(`
        # Components
        ### header
        This is a header

        ### footer
        This is a footer
      `) }
  ])
  // console.log(require('util').inspect(out, { depth: null }))
  t.true(out.files['components.md'].title === 'Components')
  t.true(out.files['components.md'].sections.header.title === 'header')
  t.true(out.files['components.md'].sections.header.depth === 3)
  t.true(out.files['components.md'].sections.header.parts.s1.id === 's1')
  t.true(out.files['components.md'].sections.header.parts.s1.type === 'text')
  t.regex(out.files['components.md'].sections.header.parts.s1.content, /This is a header/)

  t.true(out.files['components.md'].sections.footer.title === 'footer')
  t.true(out.files['components.md'].sections.footer.depth === 3)
  t.true(out.files['components.md'].sections.footer.parts.s1.id === 's1')
  t.true(out.files['components.md'].sections.footer.parts.s1.type === 'text')
  t.regex(out.files['components.md'].sections.footer.parts.s1.content, /This is a footer/)
  t.pass()
})

test('parseFiles', async t => {
  var out = await styledown.parseFiles([
    '../examples/bootstrap/forms.md',
    '../examples/bootstrap/components.md'
  ])

  t.true(out.files['../examples/bootstrap/forms.md'].title === 'Forms')
  t.true(out.files['../examples/bootstrap/components.md'].title === 'Components')
})

test('parseFiles failure', async t => {
  try {
    var out = await styledown.parseFiles([ 'xxx.xxx' ])
  } catch (e) {
    t.regex(e.message, /ENOENT: no such file or directory/)
  }
})

test('file with nothing', t => {
  var out = styledown.parse([
    { name: 'components.md',
      contents: '' }
  ])
  t.true(out.files['components.md'].title === null)
  t.deepEqual(out.files['components.md'].sections, {})
})


test('discard things without headings', t => {
  var out = styledown.parse([
    { name: 'components.md',
      contents: 'hello' }
  ])
  t.true(out.files['components.md'].title === null)
  t.deepEqual(out.files['components.md'].sections, {})
})
