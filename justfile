set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

caddy := "caddy"

default: test

[unix]
dev:
    find . -type f | entr -r {{ quote(caddy) }} run

test:
    node --test test.mjs
