## v1.0.2 - January 15, 2015

 * Fix `console` errors of `dist/styledown.js` in certain JS runtimes

## v1.0.1 - September 4, 2014

 * Allow overriding templates from the configuration.

## v1.0.0 - August 13, 2014

 * Version bump. No changes.

## v0.7.0 - August 8, 2014

 * Changed GitHub URL to https://github.com/styledown/styledown, and updated all 
 URLs in the docs accordingly.
 * The default conf (`styledown --conf`) now includes a `<meta name='viewport'>` 
 tag for responsiveness.

## v0.6.1 - August 7, 2014

 * Make examples with long lines have more readable code by wrapping them.

## v0.6.0 - August 7, 2014

 * Added the `--output` option.
 * Show an error when `styledown FILE` is invoked with an invalid file.
 * Update the HTML indentation library.

## v0.5.0 - August 7, 2014

 * CSS: improve appearance of code examples.
 * CSS: make the layout responsive.
 * Document the API.
 * Make the documentation more readable by breaking it apart into files.
 * Update the `Styledown.parse` API to accept arrays of files too.

## v0.4.1 - August 6, 2014

 * Update examples. No other changes.

## v0.4.0 - August 6, 2014

 * Implement some JavaScript, which you can get via `styledown --js`.
 * HTML code is now hidden by default. (Requires the use of JS)

## v0.3.0 - August 6, 2014

 * Remove the undocumented Express/Connect middleware.
 * Add more examples.
 * (internal) Upgrade Cheerio from 0.13 to 0.17.
 * (internal) Upgrade Jade from 1.1 to 1.5.
 * (internal) Make Styledown compatible with Ruby. A rubygem should be out soon.

## v0.2.1 - August 5, 2014

 * Use inline CSS mode by default when used with CSS files.

## v0.2.0 - August 5, 2014

 * Implement `--help` and `--version`.
 * Implement opening a file via `styledown FILE`.
 * Implement `--inline` mode.

## v0.1.0-pre - March 4, 2014

Initial release.
