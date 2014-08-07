bin = ./node_modules/.bin
mdextract = $(bin)/mdextract

docs/API.md: index.js
	mdextract -u $@

dist/styledown.js: lib/distribution.js
	browserify $< > $@

