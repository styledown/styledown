API Reference
=============

Styledown provides a programatic API to allow you to consume your styleguides from within your web app.

```js
var styledown = require('styledown')
```

## parse

> `styledown.parse(files, options)`

Parses synchronously from given inputs. This is useful for rendering your styleguide with your own views.

The parameter `files` is an array of objects. Each object should have these keys:

- `name` *(String)* - The source filename.
- `contents` *(String)* - The raw contents of the file.

The output is a JSON object; see [Schema](schema.md) for details on how it looks like.

```js
styledown.parse([
  { name: 'components.md', contents: '# This is Markdown data' },
  { name: 'buttons.md', contents: '...' },
])
```

## parseFiles

> `styledown.parseFiles(files, options)`

Reads files asynchronously from disk then parses them. Returns a promise, which yields the same data structure as [styledown.parse](#styledownparse). See [Schema](schema.md) for details on how it looks like.

```js
styledown.parseFiles([
  './styleguides/components.md',
  './styleguides/buttons.md'
])
.then(result => { ... })
```

## render

> `styledown.render(data, filename, options)`

Renders to HTML, where `data` is assumed to be the output of [styledown.parse](#styledownparse). The parameter `filename` is the filename to be rendered. The result is HTML as a string.

```js
var data = styledown.parse([
  { name: 'buttons.md', contents: /*snip*/ }
])

var result = styledown.render(data, filename)
```

These options may be given (all optional):

- `layout` *(String)* - the contents of the layout to be used. Can be an [ejs][] or [jade][] template, or anything supported by [jstransformer].
- `layoutEngine` *(String)* - the jstransformer engine to use; defaults to `'ejs'`.

You can use custom jstransformer engines by specifying `layoutEngine`. By overriding it, tt's assumed to be loading the npm package `jstransformer-<engine>`.

[ejs]: https://www.npmjs.com/package/ejs
[jade]: https://www.npmjs.com/package/jade
[jstransformer]: https://www.npmjs.com/package/jstransformer
