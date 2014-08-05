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

[![npm version](https://badge.fury.io/js/styledown.svg)](https://npmjs.org/package/styledown "View this project on npm")

Usage
-----

Styledown supports 2 modes of operation: Markdown mode (default) and Inline mode 
(`-i | --inline`).

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

Syntax highlighting
-------------------

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

Inline mode
-----------

You can put your Styledown definitions inline in your CSS files. Use
JavaDoc-style `/** ... */` comment blocks, and begin your block with a line that
ends in `:`.

The rest of the syntax is the same as in the default Markdown mode.

```css
/**
 * Section name:
 * `.your-section-here` - documentation on what your section is.
 *
 *     @example
 *     div.your-section-here
 *       h3 Sample code
 *       p goes here
 */

.your-section-here {
  display: block;
  ...
}
```

Use `styledown -i` to generate an HTML.

```bash
$ styledown -i *.css > styleguides.html
```

Thanks
------

**Styledown** © 2013+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/styledown/contributors
[highlight.js]: http://highlightjs.org/
