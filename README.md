# Styledown

> Write maintainable CSS styleguides using Markdown.

<!--
Styledown.js has two modes of operation:

- __Parsing to JSON__ takes your files and turns them to JSON so you can render them yourself with your favorite templating language.
- __Rendering to HTML__ takes parsing output and turns it to HTML.
-->

<br>

## CLI usage

```sh
# parsing to JSON
styledown file.md > style.json
```

<br>

API
---

### styledown.parse

> `styledown.parse(files, options)`

Parses synchronously from given inputs.

```js
styledown.parse([
  { name: 'components.md', data: '# This is Markdown data' },
  { name: 'buttons.md', data: '...' },
])
```

### styledown.readFiles

> `styledown.readFiles(files, options)`

Reads files asynchronously from disk then parses them. Returns a promise.

```js
styledown.readFiles([
  './styleguides/components.md',
  './styleguides/buttons.md'
])
.then(result => { ... })
```

<br>

Output schema
-------------

Given this input:

    # Components

    ### Top header
    This is the main header partial.

    ``` example.haml
    = render 'components/top_header'
    ```

You'll get this JSON output:

```json
{ "files":
  { "components.md":
    { "title": "Components",
      "sections":
        { "components":
          { "title": "Components",
            "depth": 1 },
          "top-header":
          { "title": "Top header",
            "depth": 3,
            "parts":
            { "s1":
              { "type": "text",
                "content": "<p>This is the main header partial.</p>" },
              "s2":
              { "type": "example",
                "language": "haml",
                "content": "= render 'components/top_header'" } } } } } } }
```

It breaks down like so:

- A styleguide has many [Files](#files).
- A file has many [Sections](#sections).
- A section has many [Parts](#parts).

### Files

> `files`

`files` is a Dictionary where the key is the filename (eg, _'components.md'_) and the value is the file.
A file has the following fields:

- `title` - The title, taken from the first *H1* tag.
- `sections` - a Dictionary

### Sections

> `files.*.sections`

`sections` is a Dictionary where the key is the section ID, and the value is the section details. A section starts from a H1, H2, or H3 heading, followed the other blocks that follow it.

- `title` - The title, taken from the first *H1* tag.
- `depth` - _1_, _2_ or _3_.
- `parts` - a Dictionary

### Section parts

> `files.*.sections.*.parts`

`parts` is a Dictionary where the key is the Part ID, and the value is the part details.

- `type` - Can be _'example'_, _'text'_, or _'code'_.
- `language`
- `content`
