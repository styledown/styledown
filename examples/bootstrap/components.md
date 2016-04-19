Components
==========

### alert
Provide contextual feedback messages for typical user actions
with the handful of available and flexible alert messages. For inline
dismissal, use the alerts jQuery plugin.

```example.jade
.alert.alert-success
  strong Well done!
  |  Things are going well.
.alert.alert-info
  strong Heads up!
  |  You're a wonderful person.
```

### pagination

Simple pagination inspired by Rdio, great for apps and
search results. The large block is hard to miss, easily scalable, and
provides large click areas.

```example.jade
.pagination
li
  a(href='#')!= "&laquo;"
li
  a(href='#') 1
li
  a(href='#') 2
li
  a(href='#') 3
li
  a(href='#') 4
li
  a(href='#')!= "&raquo;"
```

### pager
By default, it centers links.

```example.jade.padded
ul.pager
  li
    a Previous
  li
    a Next
```

### label
Used for labelling things that need labels.

```example.jade
<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```

### breadcrumbs
Indicate the current page's location within a navigational hierarchy.
Separators are automatically added in CSS through *:before* and *content*.

```example.jade
ol.breadcrumb
  li
    a Home
  li
    a Library
   li.active
    | Data
```
