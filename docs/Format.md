Markup format
=============

All Markdown documents are also Styledown documents. That is, all of Markdown 
will work. Styledown implements a few extensions that helps you create 
styleguides.

__Example blocks:__ Write your CSS documentation with an `h3`, and a code block 
that begins with `@example`.

``` markdown
<!-- markdown.md (Markdown mode) -->
### Button

Create your buttons with a `.button` class.

    @example
    <a class="button">Button</a>
    <a class="button primary">Button</a>
```

``` css
<!-- style.css (Inline mode) -->
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
<!-- markdown.md (Markdown mode) -->
### Tables

`.table` - tables are styled nicely for you. Just add the class `.table`.

    @example
    table.table
      tr
        td Item 1
        td Item 2
        td Item 3
```

``` css
<!-- style.css (Inline mode) -->
/**
 * Tables:
 * `.table` - tables are styled nicely for you. Just add the class `.table`.
 * 
 *     @example
 *     table.table
 *       tr
 *         td Item 1
 *         td Item 2
 *         td Item 3
 */
```
