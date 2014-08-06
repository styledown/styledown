Fancy style guide
=================

Buttons
-------

Add a class of `.button` to a `<button>` or `<a>` element, and use a size 
modifier (small, large, etc) and an appearance modifier (primary, success).

### Normal button

Use the `.button` class.

    @example
    a.button Confirm
    = " "
    a.button.primary Success

### Button sizes

Use the `.button` class.

    @example
    a.button.small Confirm
    = " "
    a.button.large Success

JavaScript
----------

### jQuery

This is an example with jQuery:

``` javascript
var Foo = {
  start: function() {
    /* do things */;
    alert("Hi", 2);
  }
};

$(function onload() {});

```

Dropdown menus
--------------

### Menu item

They look like this:

    @example .padded
    .dropdown-menu
      ul
        li
          a(href='#') Home

Tables
------

### Simple table

Use `.table` on a table.

    @example .padded
    table.table
      tr
        th One
        th Two
        th Three
      tr
        td Hello there
        td World
        td Yes

Forms
-----

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.

### Radio buttons

Vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.


    @example .padded
    form.form
      label.radio
        input(type='radio')
        span Radio button 1
      br

      label.radio
        input(type='radio')
        span Radio button 2

Labels
------

### Subtle text
`span.subtle-text` - Use sparingly.

    @example
    .subtle-text Subtle text

### Time stamp
`span.time-stamp` - Did something happen at a specific time? Tell people when 
with this style.

    @example
    .time-stamp 2 hours ago

### Labels
Labels or tags that you can append inline with text.

    @example
    .ylabel Bruce Lee

# Styleguide options

### Head
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.rawgit.com/rstacruz/styledown/v0.3.0/data/styledown.css">

### Body
    div.styleguide
      div(sg-content)
