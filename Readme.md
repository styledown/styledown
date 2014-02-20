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
  source: {
    all: 'styles.md'
  }
});
```
