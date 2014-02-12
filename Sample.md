Fancy style guide
=================

    ~ head:
    <link rel="stylesheet" href="mystyles.css">

Typography
----------

### Basic text (.formatted)

    h2 Formatted text example
    p Lorem ipsum dolor sit amet

### Heading type (+heading-type)

    .heading-type(style="font-size: 24pt")
      | Hello there, world

### Lite heading type (+lite-heading-type)

    .lite-heading-type
      | Create new venues today

### Section headings

    # background=white width=500px
    .heading.section
      .content
        .actions
          a.button.primary Action here
      h1 Content here

Forms
-----

### Form

    form.form

### Radio buttons

    form.form
      label.radio
        input(type='radio')
        span Radio button 1
      br
      label.radio
        input(type='radio')
        span Radio button 2

Buttons
-------

### Normal button

Use the `.button` class.

    a.button Confirm
    a.button.primary Success

Color palette
-------------

 * $orange - #382092

-----

Output:

<h2 class='sg'>Typography</h2>

<h3 class='sg'>Basic text <code>.formatted</code></h3>
<p class='sg'>Here's some basic things.</p>

<div class="sg-example">
  <h2>Formatted text example</h2>
  <p>Lorem ipsum dolor sit amet</p>
</div>
