
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

About inline mode
-----------------

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

