# Web Bangladesh — web.banglade.sh

Landing page for **Web Bangladesh**, a web & app development agency. Built to receive
paid ad traffic and convert it into **WhatsApp conversations**.

Static site — no build step, no backend. Plain HTML/CSS/vanilla JS.

## Features

- Bengali-first with a **BN/EN toggle** (persisted in `localStorage`, `?lang=en` supported)
- Quotation form: **service(s) + budget + details** (no name/phone fields)
- On submit, opens **WhatsApp** with a prefilled, structured message
- **UTM / fbclid** captured and appended to the WhatsApp message (ad attribution)
- **GA4** (`G-GD6MTYS28E`) + **Meta Pixel** conversion events (`Lead`, `Contact`, `ViewContent`)
- Mobile-first, clean agency design; floating WhatsApp button
- SEO/OG tags + JSON-LD

## Files

```
index.html                # single-page site
assets/css/style.css      # all styles
assets/js/i18n.js         # English strings (Bengali defaults live in the HTML)
assets/js/main.js         # config, i18n, form -> WhatsApp, tracking
assets/img/logo.svg       # brand mark
assets/img/favicon.svg
```

## Configuration

Edit the `CONFIG` object at the top of `assets/js/main.js`:

| Key | Description |
|---|---|
| `whatsapp` | WhatsApp number in international format, no `+` (default `8801324229999`) |
| `email` | Contact email shown on the page |
| `ga4` | GA4 measurement ID (also set in the `index.html` `<head>` snippet) |
| `metaPixel` | Meta Pixel ID — **empty by default**; set it to enable FB Pixel tracking |

## Run locally

```bash
python3 -m http.server 8091
# open http://localhost:8091
```

## Deploy

Static — serve `index.html` with any web server (nginx, Caddy, Cloudflare Pages).
Point `web.banglade.sh` (A/CNAME) at the host and route it where needed
(e.g. a `resty-route` preset or the MySQL `domain` table).

## Roadmap

- Real portfolio projects
- Meta Pixel ID wiring + test events
- Optional lead storage (small API) if WhatsApp-only intake is not enough
