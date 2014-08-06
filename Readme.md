Styledown
=========

<img src="cdn.rawgit.com/rstacruz/styledown/b48d80b/examples/screenshot.png" align="right" width="300">

Write maintainable CSS styleguides efficiently using a Markdown.<br>
**[See this example][example]** generated from [these sources][example source].

[![Status](https://travis-ci.org/rstacruz/styledown.png?branch=master)](https://travis-ci.org/rstacruz/styledown)

Installation
------------

``` bash
$ npm install -g styledown
$ styledown --help
```

[![npm version](https://badge.fury.io/js/styledown.svg)](https://npmjs.org/package/styledown "View this project on npm")

[example]: http://cdn.rawgit.com/rstacruz/styledown/v0.3.0/examples/bootstrap/index.html
[example source]: https://github.com/rstacruz/styledown/tree/master/examples/bootstrap

Quickstart guide
----------------

Here's a generic guide on getting started with Styledown on any project. We're
gonna assume that you're using Sass and that your project bundles all CSS files
into one file.

Let's assume that your files are in `css/`, and that your final styleguide will
be in `public/styleguide.html`.

```
                    Example setup

.----------------------.     .---------------------.
| css/                 |     |                     |
|   components/        |     |  public/            |
|     button.scss      | ==> |    styleguide.html  |
|     forms.scss       |     |                     |
|     whatever.scss    |     |                     |
'----------------------'     '---------------------'
```

#### Step 1: Document

Document your project's stylesheets with `/** ... */` comments.  Let's say this
is `css/components/your-component.scss`.

This is a Markdown block encapsulated within `/** ... */`. The example blocks
are auto-detected to be [Jade] templates and will be handled accordingly.

The first line should be the name of the block being documented, ending in `:`.

```css
/**
 * Component name:
 * `.your-component-here` - documentation on what your
 * component is goes here. Markdown is encouraged.
 *
 *     @example
 *     div.your-component-here
 *       h3 Sample code
 *       p goes here
 */

.your-component-here {
  display: block;
  ...
}
```

#### Step 2: Configure

Create a file and call it something like `css/styledown/extras.css`. This will
define what's in the `<head>` of your styleguides (to link to the correct CSS/JS
files), and define the body template (the element with `sg-content` defines
where everything goes).

```css
/**
 * # Styleguide options
 *
 * ### Head
 *
 *     link(rel="stylesheet" href="/assets/application.css")
 *     link(rel="stylesheet" href="/assets/styledown.css")
 *
 * ### Body
 *
 *     h1 My Awesome Styleguides
 *     div#styleguides(sg-content)
 */
```

The first one (`application.css`) should point to your project's concatenated
stylesheets. The second one (`styledown.css`) should point to the default
Styledown stylesheets.

So, put the default Styledown stylesheets in your project. Put this whereever
convenient. Just make sure that the styleguides links to this (see above).

```bash
$ styledown --css > css/styledown/styledown.css
```

#### Step 3: Build

Invoke `styledown` to generate an HTML file. (Mkae sure that the extras.css is
passed on the end, since anything after the "Styleguide options" heading is ignored.)

```bash
$ styledown -i css/components/*.css css/styledown/*.css > public/styleguides.html
```

#### Enjoy!

Now open `public/styleguides.html` in your browser.

Usage
-----

Styledown generates `.html` styleguides. It can take CSS files or Markdown 
files.

__Inline CSS mode:__ Parses comments from CSS files. This is what happens when 
you pass .css, .sass, .scss, .less and .styl files.

```
$ mdextract *.css > styleguide.html
```

__Markdown mode:__ Takes a Markdown files.

```
$ mdextract styles.md > styleguide.html
```

Markdown format
---------------

All Markdown documents are also Styledown documents. That is, all of Markdown 
will work. Styledown implements a few extensions that helps you create 
styleguides.

__Example blocks:__ Write your CSS documentation with an `h3`, and a code block 
that begins with `@example`.

``` markdown
<!-- markdown.md -->
### Button

Create your buttons with a `.button` class.

    @example
    <a class="button">Button</a>
    <a class="button primary">Button</a>
```

``` css
<!-- style.css -->
/**
 * Button:
 * Create your buttons with a `.button` class.
 * 
 *     @example
 *     <a class="button">Button</a>
 *     <a class="button primary">Button</a>
 */
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
[Jade]: http://jade-lang.com/
