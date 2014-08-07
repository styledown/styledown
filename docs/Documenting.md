Documenting
===========

Document your project's stylesheets with `/** ... */` comments.  Let's say this
is `css/components/your-component.scss`.

This is a Markdown block within a comment. The example blocks
are can be written as [Jade] or HTML.

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
