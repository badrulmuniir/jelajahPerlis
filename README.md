# Jelajah Perlis

A responsive, static tourism website for Perlis, Malaysia. Plain HTML, CSS and JavaScript (ES modules). No frameworks, no build step.

## Run locally

ES modules need an HTTP server (opening the files directly with `file://` will not work):

```sh
python -m http.server 8000
# or: npx serve
```

Then open http://localhost:8000.

## Structure

- `index.html`, `attractions.html`, `attraction.html?id=<slug>`, `plan.html`, `about.html`, `404.html`
- `css/`: `base.css` (variables, reset), `components.css`, `pages.css` (page styles + print)
- `js/`: `main.js` (header/footer, nav, theme), `ui.js` (shared card rendering), one script per page, `storage.js` (localStorage helpers)
- `data/attractions.js`, `data/itineraries.js`: all content. Add a place by adding one object.

## Content rules

No unverified facts are published as fact. Unknown values are `TODO: verify ...` strings in the data files and appear on the site as "To be confirmed". Every open item is tracked in `CONTENT_TODO.md`. Image sources go in `CREDITS.md`. Images are placeholders for now.

## Deploy (GitHub Pages)

1. Push the repo to GitHub.
2. Settings → Pages → Source: deploy from branch `main`, folder `/ (root)`.
3. All paths are relative, so the site works under `https://<user>.github.io/<repo>/`.
4. Replace the placeholder base URL in `sitemap.xml` and `robots.txt` with the real one.

Netlify: drag the folder in or point it at the repo; no build command and publish directory `/`.

Note: `404.html` uses relative paths, so its styling can break for missing URLs nested more than one folder deep.
