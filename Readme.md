Styledown
=========

Yep.

Express integration
-------------------

``` js
var styledownHandler = require('styledown/connect');
app.use(styledownHandler({
  path: '/styleguides',
  root: Dir.cwd(),
  guides: {
    index: 'styles.md',
    forms: 'forms.md'
  }
});
```
