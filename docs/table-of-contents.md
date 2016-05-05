# Table of Contents

You can create a Table of Contents page to list down pages in your site. All pages must live inside the `docs/` folder—Docpress only looks for files in the project root (eg, */README.md*) and the `docs/` folder (eg, */docs/Introduction.md*).

## Create your TOC

Create a table of contents as `README.md`. This is the table of contents: an unordered list of pages to link. Here's an example that will only have one file (your main README).

##### README.md
<!-- {.file-heading} -->

```md
Table of Contents
=================

* [Buttons](buttons.md)
* [Components](components.md)
* [Grid](grid.md)
```

<!-- ## Setting the home page -->

<!-- The first file in the TOC is *always* going to be the home page. Its title in the TOC is used as the site's main title. -->

## Nesting

To organize your pages into chapters, you can create sub-lists by indenting items that are under a certain parent. You can nest as far as you want, but it's only recommended to nest just one level down.

##### `docs/README.md`
<!-- {.file-heading} -->

```md
* [Basics](basics.md)
  * [Buttons](basics/buttons.md)
  * [Components](basics/components.md)
  * [Grid](basics/grid.md)
* [Components}(components.md)
  * [Alerts](components/alerts.md)
  * [Modals](components/modals.md)
  * [forms](components/forms.md)
```

#### Non-links
You don't need to link all pages—you can create items that are not links. Great for headings or for pages that are yet to be written.

```md
* Basics
  * [Buttons](buttons.md)
  * [Components](components.md)
  * [Grid](grid.md)
* Components
  * [Alerts](alerts.md)
  * [Modals](modals.md)
  * [forms](forms.md)
```
