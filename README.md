## CLI usage

```
styledown file.md > style.json
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

## Output format

```yaml
files:
  'components.md':
    title: Components
    sections:
      header:
        content: Components
        depth: 1
        parts:
          s1:
            type: text
            content: <p>This is a header</p>
          s2:
            type: figure
            language: none
            content: <p>This is a header</p>
```

### Files

`files` is a Dictionary where the key is the filename (eg, _'components.md'_) and the value is the file.
A file has the following fields:

- `title` - The title, taken from the first *H1* tag.
- `sections` - a Dictionary

### Sections

`sections` is a Dictionary where the key is the section ID, and the value is the secction.

- `title` - The title, taken from the first *H1* tag.
- `parts` - a Dictionary
