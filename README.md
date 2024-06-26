# caddy-markdown-site

This project allows you to serve Markdown files as adequately good-looking
minimal web pages with the [Caddy web server](https://caddyserver.com/).  It is
not a static site generator; there is no build step.  It consists of a
configuration file (Caddyfile) and some templates.  You will need some
knowledge of Caddy to use and customize it.


## Features

* If your file is `demo/foo.md` and your domain example.com, you will be
able to access the file as both example.com/foo.md and example.com/foo with
no extension.
* `index.md` serves as a directory index (but `index.html` has priority).
* You can customize the look of your site without touching the main template.
Edit `templates/{head,header,footer}.html` to do it.  `head.html` links
the style sheet.
* An error page is shown on error.


## Screenshot

![A screenshot the index page of the demo website](screenshot.png)


## Requirements

- Caddy 2.4 or later.
- Optional:
    - [Deno](https://deno.land/) 1.31 or later to run the [tests](test.ts)
      (`just test`).
    - [entr](https://github.com/eradman/entr) for development
      (`just dev`).
    - [just](https://github.com/casey/just) to run the tasks.


## License

MIT.

[index.html](templates/index.html) derives from the
[index.html template](https://github.com/caddyserver/website/blob/1ff5103c73c921c8faa82ef3342d904a7f6a8e22/src/docs/index.html) used on the Caddy website.

[axist.min.css](templates/axist.min.css) is
[axist](https://github.com/ruanmartinelli/axist), a
[classless](https://github.com/dbohdan/classless-css) CSS library.

[photo.jpg](demo/media/photo.jpg) by Siarhei Plashchynski
[on Unsplash](https://unsplash.com/photos/6FmtLICCvxI).

> Unsplash grants you an irrevocable, nonexclusive, worldwide copyright license
> to download, copy, modify, distribute, perform, and use photos from Unsplash
> for free, including for commercial purposes, without permission from or
> attributing the photographer or Unsplash. This license does not include the
> right to compile photos from Unsplash to replicate a similar or competing
> service.
