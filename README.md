# braskgroup.com

Static site for Brask Group. No build step, no framework, no dependencies. Edit the HTML,
commit, push; Vercel serves it.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Front page: hero, vision, areas of impact, ventures, insights, behind the company, join our mission |
| `rounds.html` | Rounds product page, plus its App Store–required privacy policy and terms |
| `privacy-policy.html` / `terms-of-service.html` | Company-level legal pages |
| `404.html` | Not-found page |
| `assets/home.css` / `assets/home.js` | The front page only — bold layout, dark hero, card grids |
| `assets/site.css` / `assets/site.js` | Every other page — the editorial document system |
| `assets/img/ventures/*.svg` | Cover artwork for ventures with no product shots of their own |
| `doctor-notes.html`, `pearls.html`, `doc-what.html`, `binaural-synth.html` | Older product pages, still on the old styling and not linked from the front page |

## Two stylesheets, on purpose

The front page and the document pages are deliberately different registers, and each owns
its own file. `home.css` is self-contained — its own reset and its own copy of the tokens —
so the two never fight over a shared class name. They stay coherent by sharing the same
type, the same palette, and the same orange.

Change a token in one and change it in the other, or the two drift apart.

## Design system

Bold-on-black up top, flat white below: a full-height dark hero with drifting geometry, then
white and near-white sections carrying lifted cards. Light mode only (no dark theme — this is
intentional, not an oversight).

- **Type** — [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) (variable,
  400–900) for headlines and body, [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
  for eyebrows, nav, category labels, tags, and the footer.
- **Colour** — white `#FFFFFF` / near-black ink `#0B0B0C` / burnt-orange accent `#C4390A` for
  text and links (AA-contrast safe), a brighter `#FF5A1F` for decorative fills and for type on
  black (the hero headline, hover states) since it doesn't clear AA on white.
- **Areas of impact** — four tones, one per area, all held at a similar darkness so they read
  as a family and all clearing AA on white: health `#C4390A`, agency `#12695A`,
  society `#1F4FA8`, horizons `#6A3EA1`. A card picks its tone with `data-area="health"` and
  the rest of the card inherits it through `--tone`.
- **Grid** — centered section headings over card grids: `.focus-grid` (4 up), `.ventures-grid`
  (3 up, with `.venture-card--lead` spanning the row and splitting inside itself).
- **Motion** — everything is an enhancement. `.reveal` elements are only hidden once `home.js`
  has run (`html.js`), so a blocked script leaves the page fully readable, and every animation
  is dropped under `prefers-reduced-motion`.

Tokens live in `:root` at the top of each stylesheet.

## Editing

**Adding or changing a venture** — copy a `.venture-card` block in `index.html`. Set
`data-area` to one of `health` / `agency` / `society` / `horizons`; that drives the category
colour. Give it a cover: a real product shot if one exists (see `.venture-image--shots` on
the Rounds card, which bleeds device screens off the bottom edge), otherwise an SVG in
`assets/img/ventures/` in the same series — tinted ground, hairline grid, one geometric
figure in the area's colour.

**Areas of impact** — the mono line at the bottom of each `.focus-card` names the venture
working in that area. Keep it pointing at something that actually exists.

**Adding the Rounds App Store link** — there's a commented-out `<a class="link">` marking the
spot in `index.html` (Ventures) and `rounds.html`. Uncomment it and drop the listing URL in.

**Nav anchors** — the front page sections are `#vision`, `#impact`, `#ventures`, `#writing`,
`#about`, `#contact`. The document pages link back to those by name, so renaming a section id
means updating `rounds.html`, `404.html`, and both legal pages too.

**Voice** — the frame is that humanity advances when people are free to build, and the first
place Brask Group works on that is medicine, where AI is already reshaping training, practice,
and delivery. Pragmatist, not evangelist: name the ambivalence clinicians feel as reasonable,
don't take a side. Never say a product uses AI unless it does. No invented metrics — Rounds
carries a `Live · App Store` tag because it is; the others carry no status claim rather than a
made-up one. No team page beyond the founder section, no "coming soon."

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
