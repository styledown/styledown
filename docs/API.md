Styledown API
=============

<!-- include: index.js -->

Styledown is available as a Node.js package.

```js
var Styledown = require('styledown');
```

### Styledown.parse()
> `Styledown.parse(source, [options])`

Generates HTML from a given `source`.

```js
Styledown.parse('### hello *world*');
=> "<!doctype html><html>..."
```

`source` can be a String or an Array. as a string, it's assumed to be a
Markdown document. As an array, it's assumed to be a list of files.  It's
expected that it contains objects with `name` and `data` keys.

In array mode, Styledown treats each file differently. Inline comments are
extracted from those with that end in CSS extensions (css, less, sass, etc),
while the rest are assumed to be Markdown documents.

```js
var docs = [
  { name: 'css/style.css', data: '...' },
  { name: 'config.md', data: '...' }
];

Styledown.parse(docs);
=> "<!doctype html><html>..."
```

You may pass `options` as the second parameter. Available options are:

* `prefix` *(String)* <span class='dash'>&mdash;</span> prefix for classnames. Defaults to `sg`.
* `template` *(String)* <span class='dash'>&mdash;</span> HTML template. Defaults to a simple HTML template.
* `head` *(String)* <span class='dash'>&mdash;</span> HTML to put in the head. Default to `false`.
* `body` *(String)* <span class='dash'>&mdash;</span> HTML to put in the body. Defaults to `<div sg-content></div>`.
* `indentSize` *(Number)* <span class='dash'>&mdash;</span> Number of spaces to indent. Defaults to `2`.
* `inline` *(Boolean)* <span class='dash'>&mdash;</span> if `true`, then inline CSS mode is forced.

This is shorthand for `new Styledown().toHTML()`. You can use `Styledown` as a class.

### Styledown.version

The version number in semver format.

### Styledown.defaults

The returns the default configuration file, JS file and CSS files.

```js
Styledown.defaults.conf()
Styledown.defaults.js()
Styledown.defaults.css()
```

## Styledown()
> `new Styledown(source, [options])`

Parses the source `source` into a Styledown document. `source` can be a
Markdown document.

```js
 doc = new Styledown(markdown);
 doc.toHTML();
```

You may also use `Styledown.parse()` as a shorthand.

### toHTML()
> `doc.toHTML()`

Returns the full HTML source based on the Styledown document.

```js
doc.toHTML()
=> "<!doctype html><html>..."
```

### toBareHTML()
> `doc.toBareHTML()`

Returns the bare HTML without the head/body templates.

```js
doc.toBareHTML()
=> "<div><h3>Your document</h3>..."
```

<!-- /include: index.js -->
