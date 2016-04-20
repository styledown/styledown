Buttons
=======

### btn
Buttons are the essence of life and the raison d'etre of UI design. Live it, love it.

```example.jade
a.btn.btn-primary Primary button
```

### btn colors

```example.jade
a.btn.btn-default Default
a.btn.btn-primary Primary
a.btn.btn-success Success
a.btn.btn-info Info
a.btn.btn-warning Warning
a.btn.btn-danger Danger
a.btn.btn-link Link
```

### btn sizes
Define sizes using `btn-lg`, `btn-sm`, and `btn-xs` classes.

```example.jade
p
  a.btn.btn-lg.btn-primary Large
  a.btn.btn-lg.btn-default btn-lg
p
  a.btn.btn-primary Default
  a.btn.btn-default Default
p
  a.btn.btn-sm.btn-primary Small
  a.btn.btn-sm.btn-default btn-sm
p
  a.btn.btn-xs.btn-primary X-Small
  a.btn.btn-xs.btn-default btn-xs
```

### btn-block
Makes buttons occupy a full width (block).

```example.jade
.well.center-block(style='max-width: 400px')
  a.btn.btn-lg.btn-block.btn-primary Block level button
  a.btn.btn-lg.btn-block.btn-default .btn-block
```

### btn-group
Wraps a series of buttons in a group.

```example.jade
.btn-group
  button.btn.btn-default Left
  button.btn.btn-default Middle
  button.btn.btn-default Right
```

### btn-toolbar
Wraps a series of button groups in a toolbar for more complex components.

```example.jade
.btn-toolbar
  .btn-group
    button.btn.btn-default Cut
    button.btn.btn-default Copy
    button.btn.btn-default Paste
  .btn-group
    button.btn.btn-default Undo
    button.btn.btn-default Redo
```
