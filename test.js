var test = require('ava')
var styledown = require('./index')
var r = require('redent')

test('hello', t => {
  var out = styledown([
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
  console.log(require('util').inspect(out, { depth: null }))
  t.pass()
})
