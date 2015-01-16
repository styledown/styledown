Styledown
=========

Write maintainable CSS styleguides efficiently using a Markdown.
**[See example ▸][example]**

[![Example](https://cdn.rawgit.com/styledown/styledown/81a1d9c/examples/screenshot.png)][example]

[![Status](http://img.shields.io/travis/styledown/styledown/master.svg?style=flat)](https://travis-ci.org/styledown/styledown "See test builds")

Installation
------------

``` bash
$ npm install -g styledown
$ styledown --help
```

[![npm version](http://img.shields.io/npm/v/styledown.svg?style=flat)](https://npmjs.org/package/styledown "View this project on npm")

[example]: http://cdn.rawgit.com/styledown/styledown/v1.0.2/examples/bootstrap/index.html

How it works
------------

Styledown is made to work in most web development setups. It doesn't favor any 
framework or language or any preprocessor.

 * [Document][doc] your CSS files with inline comments, or as a separate `.md` file.
 * Create a file with styleguide [configuration][conf].
 * Invoke `styledown *.css > styleguide.html`.
 * Enjoy your styleguide! Read more about the [format][fmt].

[doc]: docs/Documenting.md
[conf]: docs/Configuration.md
[fmt]: docs/Format.md

Quickstart guide
----------------

Here's a generic guide on getting started with Styledown on any project. We're
gonna assume that you're using Sass and that your project bundles all CSS files
into one file.

Let's assume that your files are in `css/`, and that your final styleguide will
be in `public/styleguide.html`.

```
                    Example setup

.----------------------.     .---------------------.
| css/                 |     |                     |
|     config.md        |     |  public/            |
|     button.scss      | ==> |    styleguide.html  |
|     forms.scss       |     |                     |
|     whatever.scss    |     |                     |
'----------------------'     '---------------------'
```

#### Step 1: Document

Document your project's stylesheets with inline comments, or as separate `.md`
files.

```css
/**
 * Component name:
 * `.your-component-here` - documentation on what your
 * component is goes here. Markdown is encouraged.
 *
 *     @example
 *     div.your-component-here
 *       h3 Sample code
 *       p goes here
 */

.your-component-here {
  display: block;
  ...
}
```

Read more: **[Documenting ▸](docs/Documenting.md)**

#### Step 2: Configure

Make a file, let's call it `config.md`. (`styledown --conf > config.md`) This
lets you define what will be in the output head/body.

```markdown
# Styleguide options

### Head

    link(rel="stylesheet" href="/assets/application.css")
    link(rel='stylesheet' href='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.css')
    script(src='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.js')

### Body

    h1 My Awesome Styleguides
    div#styleguides(sg-content)
```

The first one (`application.css`) should point to your project's concatenated
stylesheets. The second and third one (`styledown.css` and `styledown.js`)
point to the default Styledown CSS/JS files.

Read more: **[Configuration ▸](docs/Configuration.md)**

#### Step 3: Build

Invoke `styledown` to generate an HTML file. (Mkae sure that the extras.css is
passed on the end, since anything after the "Styleguide options" heading is ignored.)

```bash
$ styledown -i css/*.css css/config.md > public/styleguides.html
```

#### Enjoy!

Now open `public/styleguides.html` in your browser.

Usage
-----

Styledown generates `.html` styleguides. It can take CSS files or Markdown 
files, or a combination of the two.

__Inline CSS mode:__ Parses comments from CSS files. This is what happens when 
you pass .css, .sass, .scss, .less and .styl files.

```
$ styledown *.css > styleguide.html
```

__Markdown mode:__ Takes Markdown files.

```
$ styledown *.md > styleguide.html
```

Markup format
-------------

Read more: **[Markup format ▸](docs/Format.md)**

## :copyright:

**Styledown** © 2013+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/styledown/styledown/contributors
[highlight.js]: http://highlightjs.org/
[Jade]: http://jade-lang.com/
