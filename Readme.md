Styledown
=========

A markdown dialect to help you write CSS styleguides efficiently.

[![Status](https://travis-ci.org/rstacruz/styledown.png?branch=master)](https://travis-ci.org/rstacruz/styledown)

Installation
------------

``` bash
$ npm install -g styledown
$ styledown --help
```

Usage
-----

Styledown supports 2 modes of operation: Markdown mode (default) and Inline mode 
(`-i` or `--inline`).

__Markdown mode:__ Use Styledown to generate an `.html` styleguide from one or 
more `.md` files.

```
$ mdextract styles.md > styleguide.html
```

__Inline mode:__ Generate an `.html` styleguide from one or more CSS files with 
inline comments. (You can use less/styl/sass here, too.)

```
$ mdextract -i *.css > styleguide.html
```

Markdown format
---------------

All Markdown documents are also Styledown documents. That is, all of Markdown 
will work. Styledown implements a few extensions that helps you create 
styleguides.

__Example blocks:__ Write your CSS documentation with an `h3`, and a code block 
that begins with `@example`.

``` markdown
### Button

Create your buttons with a `.button` class.

    @example
    <a class="button">Button</a>
    <a class="button primary">Button</a>
```

__Jade examples:__ Jade is also supported. It's auto-detected for you when you 
want Jade or HTML. This allows you to write simpler example code.

``` markdown
### Tables

Tables have a class `.table`.

    @example
    table.table
      tr
        td Item 1
        td Item 2
        td Item 3
```

Example
-------

Example blocks are transformed into `div.sg-example` blocks, containing a 
`.sg-canvas` (the actual HTML example) and `.sg-code` (with the HTML source).

#### Input

``` markdown
Consider this example:

    @example
    <a class="button">Button</a>
    <a class="button primary">Button</a>
```

#### Output

``` html
<p>Consider this example:</p>

<div class="sg-example">
  <!-- Actual HTML code is rendered here in `.sg-canvas` -->
  <div class="sg-canvas">
    <a class="button">Button</a>
    <a class="button primary">Button</a>
  </div>

  <!-- Syntax-highlighted source code here in `.sg-code` -->
  <pre class="sg-code">
    &lt;a class="button"&gt;...
  </pre>
</div>
```

### Syntax highlighting

Syntax highlighting comes for free, without any client-side code. Simply 
surround your code in a code fence, and it will be highlighted via 
[highlight.js].

#### Input

    See this code:

    ``` javascript
    $(function() {
      alert("Hello");
    });
    ```

#### Output

``` html
<p>See this code:</p>

<pre class="sg-lang-javascript">
$(<span class='hljs-function'>function</span>() {
   alert(<span class='hljs-string'>"hello"</span>);
});
</pre>
```

### Also

 * Sections
 * blocks
 * Syntax highlighting
 * Example blocks

Usage
-----

### Command line

``` bash
$ styledown Styles.md > index.html
```

### Node.js

``` js
var Styledown = require('styledown');
Styledown.parse(string);
```

### Node.js - Express

Use the middleware.

``` js
var styledownHandler = require('styledown/connect');
app.use(styledownHandler({
  path: '/styleguides',
  root: Dir.cwd(),
  guides: {
    index: 'styles.md',
    forms: 'forms.md'
  }
});
```

### Ruby

To come soon.

### Ruby - Rails

Middleware to come soon.

Getting started
---------------

Write your files in Markdown.

License
-------

Released under the MIT License. Copyright (c) 2014 Rico Sta. Cruz.

> Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
>
> The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
