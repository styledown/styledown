Output schema
=============

Given this input:

    # Components

    ### Top header
    This is the main header partial.

    ``` example.haml
    = render 'components/top_header'
    ```

## Sample output

You'll get this JSON output:

```json
{ "files":
  { "components.md":
    { "title": "Components",
      "name": "components.md",
      "sections":
        { "components":
          { "id": "components",
            "title": "Components",
            "depth": 1 },
          "top-header":
          { "id": "top-header",
            "title": "Top header",
            "depth": 3,
            "parts":
            { "s1":
              { "type": "text",
                "language": "html",
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

## Files

> `files`

`files` is a Dictionary where the key is the filename (eg, _'components.md'_) and the value is the file.
A file has the following fields:

- `name` - The filename
- `title` - The title, taken from the first *H1* elemnet.
- `sections` - a Dictionary

## Sections

> `files.*.sections`

`sections` is a Dictionary where the key is the section ID, and the value is the section details. A section starts from a H1, H2, or H3 heading, followed the other blocks that follow it.

- `id`
- `title` - The title, taken from the *H2* or *H3* element that started the section.
- `depth` - _1_, _2_ or _3_.
- `parts` - a Dictionary

## Parts

> `files.*.sections.*.parts`

`parts` is a Dictionary where the key is the Part ID, and the value is the part details.

- `id`
- `type` - Can be _'example'_, _'text'_, or _'code'_.
- `language`
- `content`
- `source` - If it was transpiled, the original source will be stored here.
