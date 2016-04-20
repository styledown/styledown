var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('toc', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents

        * [Buttons](buttons.md)
        * [Panels](panels.md)
      `) },
    { name: 'buttons.md',
      data: r(`
        # Buttons
      `) },
    { name: 'panels.md',
      data: r(`
        # Panels
      `) }
  ])

  var toc = out.toc
  console.log(toc)
})
