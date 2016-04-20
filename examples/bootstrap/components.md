Components
==========

### alert
Provide contextual feedback messages for typical user actions
with the handful of available and flexible alert messages. For inline
dismissal, use the alerts jQuery plugin.

```example.jade
.alert.alert-success
  strong Well done!
  |  Things are going well. (alert-success)
.alert.alert-info
  strong Heads up!
  |  You're a wonderful person. (alert-info)
.alert.alert-warning
  strong Warning!
  |  Check the flux capacitor. (alert-warning)
.alert.alert-danger
  strong Danger!
  |  You must construct additional pylons. (alert-danger)
```

### list-group
Simple lists and elements using `.list-group` and `.list-group-item`.

```example.jade
ul.list-group
  li.list-group-item Apple
  li.list-group-item Orange
  li.list-group-item Banana
```

#### With badges
Use `span.badge`.

```example.jade
ul.list-group
  li.list-group-item
    span.badge 23
    | Apple
  li.list-group-item
    span.badge 5
    | Orange
  li.list-group-item
    span.badge 2
    | Banana
```

### pagination

Simple pagination inspired by Rdio, great for apps and
search results. The large block is hard to miss, easily scalable, and
provides large click areas.

```example.jade
ul.pagination
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

## Panels

### panel
Panels (`.panel`) are white boxes. `.panel-body` provides the padding.

```example.jade
.panel
  .panel-body Basic panel example
```

#### panel-heading
Add `.panel-heading` for a heading.

```example.jade
.panel.panel-default
  .panel-heading Panel heading
  .panel-body Content goes here
```

#### panel-title
Use `.panel-title` to make the text bigger.

```example.jade
.panel.panel-default
  .panel-heading
    .panel-title Panel heading with title
  .panel-body Content goes here
```

#### panel-footer
Add `.panel-footer` for a footer.

```example.jade
.panel.panel-default
  .panel-body Content goes here
  .panel-footer Panel footer
```

### panel variants
Use `.panel-primary` (and so on).

```example.jade.-clear
.panel.panel-primary
  .panel-heading Primary
  .panel-body panel-primary
```

`panel-success` uses *$brand-color-success*.

```example.jade.-clear
.panel.panel-success
  .panel-heading Success
  .panel-body panel-success
```

`panel-info` uses *$brand-color-info*.

```example.jade.-clear
.panel.panel-info
  .panel-heading Info
  .panel-body panel-info
```
