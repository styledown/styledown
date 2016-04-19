API Reference
=============

### styledown.parse

> `styledown.parse(files, options)`

Parses synchronously from given inputs.

```js
styledown.parse([
  { name: 'components.md', data: '# This is Markdown data' },
  { name: 'buttons.md', data: '...' },
])
```

### styledown.parseFiles

> `styledown.parseFiles(files, options)`

Reads files asynchronously from disk then parses them. Returns a promise.

```js
styledown.parseFiles([
  './styleguides/components.md',
  './styleguides/buttons.md'
])
.then(result => { ... })
```

### styledown.render

> `styledown.render(data, options)`

Renders to HTML, where `data` is assumed to be the output of [styledown.parse](#styledownparse).

