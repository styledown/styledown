Styledown
=========

Yep.

Installation
------------

``` sh
$ npm install -g styledown
```

Usage
-----

### Command line

``` sh
$ styledown < Styles.md > index.html
```

### Node.js

``` js
var Styledown = require('styledown');
Styledown.parse(string);
```

### Node.js - Express

Use the middleware.

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

### Ruby

To come soon.

### Ruby - Rails

Middleware to come soon.

Getting started
---------------

Write your files in Markdown.
