Configuration
=============

Make a file, let's call it `config.md`. (`styledown --conf > config.md`) This
lets you define what will be in the output head/body.

This will define what's in the `<head>` of your styleguides (to link to the 
    correct css/js files), and define the body template (the element with 
      `sg-content` defines where everything goes).

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

Optional: if you would like to have the CSS and JS files in your project
instead of loaded via CDN, use:

```sh
$ styledown --css > styledown.css
$ styledown --js  > styledown.js
```

