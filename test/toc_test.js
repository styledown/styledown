var test = require('ava')
var styledown = require('../index')
var r = require('redent')
var tocify = require('../lib/tocify')

test('generates toc', t => {
  var output = styledown.parse([
    { name: 'README.md',
      contents: r(`
        # Table of Contents

        * [Buttons](buttons.md)
        * [Panels](panels.md)
      `) },
    { name: 'buttons.md',
      contents: r(`
        # Buttons
      `) },
    { name: 'panels.md',
      contents: r(`
        # Panels
      `) }
  ])

  var expected =
    { toc:
       { sections:
          [ { title: 'Buttons',
              source: 'buttons.md',
              basename: 'buttons' },
            { title: 'Panels',
              source: 'panels.md',
              basename: 'panels' } ] } }

  t.deepEqual(output.toc, expected.toc)
})

test('loltoc', t => {
  var output = tocify(r(`
    # Table of Contents

    * [Home](index.md)
    * Document
      * [Index](index.md)
  `))

  var expected =
    { sections:
       [ { title: 'Home',
           source: 'index.md',
           basename: 'index' },
         { title: 'Document',
           sections:
            [ { title: 'Index',
                source: 'index.md',
                basename: 'index' } ] } ] }

  t.deepEqual(output, expected)
})
