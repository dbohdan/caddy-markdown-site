CADDY ?= caddy

dev:
	find . -type f | entr -r $(CADDY) run

test:
	./caddy-markdown-site.test

.PHONY: dev test
