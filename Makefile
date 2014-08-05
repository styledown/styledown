dist/styledown.js: lib/distribution.js
	browserify $< > $@

