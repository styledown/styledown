styledown := ../../bin/styledown

all: html html.nolayout

html:
	${styledown} *.md -t jade -o html -l layout.ejs

html.nolayout:
	${styledown} *.md -t jade -o html.nolayout

.PHONY: all html html.nolayout
