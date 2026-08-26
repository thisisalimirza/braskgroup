# braskgroup.com

Static site for Brask Group. No build step, no framework, no dependencies. Edit the HTML,
commit, push; Vercel serves it.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Front page: hero, what this is, Brask Studio, what I've built, Capital Alpha, about, contact |
| `founders.html` | For Founders — the pitch to people building something, and how to start |
| `partners.html` | For Partners — institutions, operators, and capital partners |
| `rounds.html` | Rounds product page, plus its App Store–required privacy policy and terms |
| `privacy-policy.html` / `terms-of-service.html` | Company-level legal pages |
| `404.html` | Not-found page |
| `assets/home.css` / `assets/home.js` | Front page, Founders, Partners — bold layout, dark hero, card grids |
| `assets/site.css` / `assets/site.js` | Rounds, legal, 404 — the editorial document system |
| `assets/img/ventures/*.svg` | Cover artwork for ventures with no product shots of their own |
| `doctor-notes.html`, `pearls.html`, `doc-what.html`, `binaural-synth.html` | Older product pages, still on the old styling and not linked from the front page |

## Two stylesheets, on purpose

The marketing pages and the document pages are deliberately different registers, and each
owns its own file. `home.css` is self-contained — its own reset and its own copy of the
tokens — so the two never fight over a shared class name. They stay coherent by sharing the
same type, the same palette, and the same orange.

Change a token in one and change it in the other, or the two drift apart.

## Design system

Bold-on-black up top, flat white below: a dark hero with drifting geometry, then white
sections carrying soft-shadowed cards. White, not off-white — the only thing separating one
section from the next is the barely-there crosshatch on `.section-pattern`. Light mode only
(no dark theme — this is intentional, not an oversight).

- **Type** — [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) (variable,
  400–900) for headlines and body, [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
  for eyebrows, nav, category labels, tags, and the footer.
- **Colour** — white `#FFFFFF` / near-black ink `#0B0B0C` / burnt-orange accent `#C4390A` for
  text and links (AA-contrast safe), a brighter `#FF5A1F` for decorative fills and for type on
  black (the hero headline, hover states) since it doesn't clear AA on white.
- **Card tones** — four named tones, each with a bright value for icons (health `#FF6B6B`,
  agency `#00C4B4`, society `#4A90E2`, horizons `#7E57C2`) and the same hue pulled down far
  enough to clear AA as text. A card picks its pair with `data-area="health"`; the rest
  inherits through `--tone`. On the front page these are colour only — the names are a
  leftover from the old "areas of impact" framing and no longer label anything. They still
  label the cards on `founders.html` and `partners.html`.
- **Grid** — centered section headings over card grids: `.focus-grid` (4 up, or `--three`),
  `.ventures-grid` (3 up, with `.venture-card--lead` spanning the row and splitting inside
  itself), `.insights-grid` (3 up).
- **Nav** — one filled `.nav-cta` pill, pointing at Brask Studio on the front page. Under
  980px the whole bar becomes a drawer. `founders.html` and `partners.html` also carry a
  `Get Involved` dropdown: it opens on hover and focus in CSS, `home.js` adds click and keeps
  `aria-expanded` honest, and the drawer flattens it into two inline items.
- **Motion** — everything is an enhancement. `.reveal` elements are only hidden once `home.js`
  has run (`html.js`), so a blocked script leaves the page fully readable, and every animation
  is dropped under `prefers-reduced-motion`.

Tokens live in `:root` at the top of each stylesheet.

## Editing

**`founders.html` and `partners.html` are not linked from the front page.** They still exist,
still work, and are still in the sitemap — they just carry the older "we back ambitious
founders" pitch, which reads against the front page's voice. Decide what they should be
before wiring them back into the nav.

**Insights came off the front page.** `.insight-card` and `.insights-grid` are still in
`home.css` for whenever there's a real feed to render — three cards, `.insight-image`,
`.insight-category`, `.insight-date`, `h3`, a paragraph, and a `.read-more` link.

**Adding or changing a venture** — copy a `.venture-card` block in `index.html`. Set
`data-area` to one of `health` / `agency` / `society` / `horizons`; that drives the category
colour. Give it a cover: a real product shot if one exists (see `.venture-image--shots` on
the Rounds card, which bleeds device screens off the bottom edge), otherwise an SVG in
`assets/img/ventures/` in the same series — tinted ground, hairline grid, one geometric
figure in the area's colour.

**Adding the Rounds App Store link** — there's a commented-out `<a class="link">` marking the
spot in `index.html` (Ventures) and `rounds.html`. Uncomment it and drop the listing URL in.

**Nav anchors** — the front page sections are `#what`, `#studio`, `#ventures`,
`#capital-alpha`, `#about`, `#contact`. Every other page links back to those by name, so renaming
a section id means updating `founders.html`, `partners.html`, `rounds.html`, `404.html`, and
both legal pages too. The nav block is duplicated across pages by hand — change one, change
all of them.

**Voice** — first person, matched to the Brask Studio site: short, factual sentences, no
mission language. Brask Group is one system — Studio's client work pays for the experiments,
the experiments become Studio's proof of work — not a portfolio of four companies. Say what a
thing is and who uses it, then stop. Never say a product uses AI unless it does. No invented
metrics — Rounds carries a `Live · App Store` tag because it is; the numbers on the other
cards are real counts, so change them when they change, and give a venture no status claim
rather than a made-up one. `founders.html` and `partners.html` still speak in the older,
grander register; they are not linked from the front page for that reason.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
