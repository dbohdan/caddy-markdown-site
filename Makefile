CADDY ?= caddy

dev:
	find . -type f | entr -r $(CADDY) run

test:
	deno test \
	    --allow-env \
	    --allow-net \
	    --allow-read=Caddyfile \
	    --allow-run \
	    --allow-write=Caddyfile.test \
	    test.ts \

.PHONY: dev test
