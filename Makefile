CADDY ?= caddy

dev:
	find . -type f | entr -r $(CADDY) run

test:
	deno test \
	    --allow-read=Caddyfile \
	    --allow-env \
	    --allow-net \
	    --allow-run \
	    --allow-write=Caddyfile.test \
	    test.ts \

.PHONY: dev test
