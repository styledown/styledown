API Reference
=============

Styledown provides a programatic API to allow you to consume your styleguides from within your web app.

```js
var styledown = require('styledown')
```

## parse

> `styledown.parse(files, options)`

Parses synchronously from given inputs. This is useful for rendering your styleguide with your own views.

The output is a JSON object; see [Schema](schema.md) for details on how it looks like.

```js
styledown.parse([
  { name: 'components.md', data: '# This is Markdown data' },
  { name: 'buttons.md', data: '...' },
])
```

## parseFiles

> `styledown.parseFiles(files, options)`

Reads files asynchronously from disk then parses them. Returns a promise.

```js
styledown.parseFiles([
  './styleguides/components.md',
  './styleguides/buttons.md'
])
.then(result => { ... })
```

## render

> `styledown.render(data, options)`

Renders to HTML, where `data` is assumed to be the output of [styledown.parse](#styledownparse).
