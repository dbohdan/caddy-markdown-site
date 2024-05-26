set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

caddy := "caddy"

default: test

[unix]
dev:
  find . -type f | entr -r {{quote(caddy)}} run

test:
  deno test \
    --allow-env \
    --allow-net \
    --allow-read=Caddyfile \
    --allow-run \
    --allow-write=Caddyfile.test \
    test.ts \
    ;
