# caddy-markdown-site

This project is a proof of concept showing how you can serve Markdown files
as reasonably good-looking minimal web pages
with just the [Caddy](https://caddyserver.com/) web server.
It is not a static site generator; there is no build step.
The project consists of a Caddy configuration file (Caddyfile), HTML [templates](https://caddyserver.com/docs/caddyfile/directives/templates), and CSS files.
You will need some knowledge of Caddy to use and customize the project.
Expect a lot of work, and possibly insurmountable barriers, if you decide to adapt it for anything but a simple website.


## Screenshot

![A screenshot the index page of the demo website.](screenshot.png)


## Requirements

- Caddy 2.4 or later.
- Optional:
    - [Deno](https://deno.land/) 1.31 or later to run the [tests](test.ts)
      (`just test`).
    - [entr](https://github.com/eradman/entr) for development
      (`just dev`).
    - [just](https://github.com/casey/just) to run the tasks.


## Features

- If your page file is `demo/foo.md` and your domain example.com,
  you will be able to access the file as example.com/foo with no extension and example.com/foo.md.
- `index.md` serves as the directory index (but `index.html` takes priority).
- You can customize the look of your site without touching the main template.
  Edit `templates/{head,header,footer}.html` to do it.
  `head.html` links to the style sheets.
- An error page is shown on error.


## Front matter

Markdown page files can include Caddy template
[front matter](https://caddyserver.com/docs/modules/http.handlers.templates#splitfrontmatter)
in JSON, TOML, or YAML.
The front matter sets variables that configure how a page is presented.

The following variables are recognized:

- `lang`: the [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) HTML global attribute.
  If not specified, defaults to an empty string.
- `text_dir`: the [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) HTML global attribute.
  Defaults to `auto`.
- `title`: The page title.
  Defaults to the request path.

### Example

```none
---
lang: en
title: Greeting
---
Hello, world!
```


## License

MIT.

[`index.html`](templates/index.html) derives from the
[`index.html` template](https://github.com/caddyserver/website/blob/1ff5103c73c921c8faa82ef3342d904a7f6a8e22/src/docs/index.html) used on the Caddy website.

[`axist.css`](templates/axist.css) is [axist](https://github.com/ruanmartinelli/axist),
a [classless](https://github.com/dbohdan/classless-css) CSS stylesheet.

[`photo.jpg`](demo/media/photo.jpg) is by Siarhei Plashchynski
[on Unsplash](https://unsplash.com/photos/6FmtLICCvxI).

> Unsplash grants you an irrevocable, nonexclusive, worldwide copyright license
> to download, copy, modify, distribute, perform, and use photos from Unsplash for free,
> including for commercial purposes, without permission from or attributing the photographer or Unsplash.
> This license does not include the right to compile photos from Unsplash
> to replicate a similar or competing service.
