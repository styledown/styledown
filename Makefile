bin = ./node_modules/.bin
mdextract = $(bin)/mdextract
browserify = $(bin)/browserify

docs/API.md: index.js
	$(mdextract) -u $@

dist/styledown.js: lib/distribution.js
	$(browserify) $< > $@

