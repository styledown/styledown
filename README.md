```
file = {
  name: 'buttons.md',
  data: '...'
}

styledown([ file ])

files:
  components.md:
    title: Components
    sections:
      header:
        - type: text
          content: <p>This is a header</p>
        - type: figure
          language: none
          content: <p>This is a header</p>
```

## API

### styledown.parse

> `styledown.parse(files, options)`

Parses a bunch of files synchronously from given inputs.

```js
styledown.parse([
  { name: 'components.md', data: '...' },
  { name: 'buttons.md', data: '...' },
])
```

### styledown.readFiles

> `styledown.readFiles(files, options)`

Parses a bunch of files asynchronously from disk. Returns a promise.

```js
styledown.readFiles([
  './styleguides/components.md',
  './styleguides/buttons.md'
])
.then(result => { ... })
```
