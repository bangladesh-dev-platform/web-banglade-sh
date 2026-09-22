# Web Bangladesh — web.banglade.sh

Landing page for **Web Bangladesh**, a web & app development agency.
Built for **paid ad traffic**: short, focused, mobile-first, and designed to turn
visitors into **WhatsApp conversations** or phone calls as fast as possible.

Static site — no build step, no backend. Plain HTML/CSS/vanilla JS.

## Features

- Bengali-first with a **BN/EN toggle** (persisted in `localStorage`, `?lang=en` supported)
- **Immediate contact** — prominent WhatsApp + call CTAs in the hero and a dedicated contact panel (no forms)
- **Compact services** list, brief "why us" cards, short FAQ — minimal scroll so ad traffic doesn't get lost
- **UTM / fbclid** captured and appended to the prefilled WhatsApp message (ad attribution)
- **GA4** (`G-GD6MTYS28E`) + **Meta Pixel** conversion events (`Lead`, `Contact`, `ViewContent`)
- Floating WhatsApp button, sticky header, SEO/OG tags

## Files

```
index.html                # single-page site
assets/css/style.css      # all styles
assets/js/i18n.js         # English strings (Bengali defaults live in the HTML)
assets/js/main.js         # config, i18n, WhatsApp/call CTAs, tracking
assets/img/logo.svg       # brand mark
assets/img/favicon.svg
assets/img/og.png         # 1200x630 social/WhatsApp share image
```

Facebook ad creatives + suggested copy live in [`ads/`](ads/).


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

- Wire the Meta Pixel ID + test events before running ads
- Real project screenshots / client logos (optional social proof)
