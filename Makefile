bin = ./node_modules/.bin
mdextract = $(bin)/mdextract
browserify = $(bin)/browserify
js_files = $(wildcard lib/*.js ./*.js)

docs/API.md: index.js
	$(mdextract) -u $@

dist: dist/styledown.js

dist/styledown.js: lib/distribution.js $(js_files)
	$(browserify) $< > $@

.PHONY: dist
