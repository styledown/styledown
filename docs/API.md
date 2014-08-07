<!-- include: ../index.js -->

### Styledown.parse()
> `Styledown.parse(source, [options])`

Generates HTML from a given `source`. Shorthand for `new
Styledown().toHTML()`.

## Styledown()
> `new Styledown(source, [options])`

Parses the source `source` into a Styledown document. `source` can be a
Markdown document.

```js
 doc = new Styledown(markdown);
 doc.toHTML();
```

You may also use `Styledown.parse()`.

```js
 Styledown.parse(markdown);
```

Available options are:

* `prefix` *(String)* <span class='dash'>&mdash;</span> prefix for classnames. Defaults to `sg`.
* `template` *(String)* <span class='dash'>&mdash;</span> HTML template. Defaults to a simple HTML template.
* `head` *(String)* <span class='dash'>&mdash;</span> HTML to put in the head. Default to `false`.
* `body` *(String)* <span class='dash'>&mdash;</span> HTML to put in the body. Defaults to `<div sg-content></div>`.
* `indentSize` *(Number)* <span class='dash'>&mdash;</span> Number of spaces to indent. Defaults to `2`.

HTML template

Things to put into `head`

Prefix for classnames

Indentation spaces

### toHTML()
> `doc.toHTML()`

Converts to HTML.

<!-- /include: ../index.js -->
