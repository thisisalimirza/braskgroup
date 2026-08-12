# braskgroup.com

Static site for Brask Group. No build step, no framework, no dependencies. Edit the HTML,
commit, push; Vercel serves it.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Front page: hero, vision, areas of impact, ventures, insights, behind the company, founder call-out, join our mission |
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
- **Areas of impact** — each area carries two tones: a bright one for the icon (the old site's
  colours: health `#FF6B6B`, agency `#00C4B4`, society `#4A90E2`, horizons `#7E57C2`) and the
  same hue pulled down far enough to clear AA as text, used on venture category labels. A card
  picks its pair with `data-area="health"`; the rest inherits through `--tone`.
- **Grid** — centered section headings over card grids: `.focus-grid` (4 up, or `--three`),
  `.ventures-grid` (3 up, with `.venture-card--lead` spanning the row and splitting inside
  itself), `.insights-grid` (3 up).
- **Nav** — one filled `.nav-cta` pill and a `Get Involved` dropdown. The dropdown opens on
  hover and focus in CSS; `home.js` adds click and keeps `aria-expanded` honest. Under 980px
  the whole bar becomes a drawer and the dropdown flattens into two inline items.
- **Motion** — everything is an enhancement. `.reveal` elements are only hidden once `home.js`
  has run (`html.js`), so a blocked script leaves the page fully readable, and every animation
  is dropped under `prefers-reduced-motion`.

Tokens live in `:root` at the top of each stylesheet.

## Editing

**Areas of impact are values, not a product index.** They are the frame the work is judged
against and they outlive any one venture, so nothing in those four cards names a product.
Keep it that way.

**Insights is placeholder content** waiting on a Sanity backend. The three `.insight-card`
blocks in `index.html` are hand-written stand-ins so the layout is real — each carries a
`Coming soon` date and links out to Side Effects rather than to a post that doesn't exist.
When the CMS is wired, render into the same markup: `.insight-image` (drop the
`.placeholder-wrapper` for a real `<img>`), `.insight-category`, `.insight-date`, `h3`, a
paragraph, and a `.read-more` link.

**Adding or changing a venture** — copy a `.venture-card` block in `index.html`. Set
`data-area` to one of `health` / `agency` / `society` / `horizons`; that drives the category
colour. Give it a cover: a real product shot if one exists (see `.venture-image--shots` on
the Rounds card, which bleeds device screens off the bottom edge), otherwise an SVG in
`assets/img/ventures/` in the same series — tinted ground, hairline grid, one geometric
figure in the area's colour.

**Adding the Rounds App Store link** — there's a commented-out `<a class="link">` marking the
spot in `index.html` (Ventures) and `rounds.html`. Uncomment it and drop the listing URL in.

**Nav anchors** — the front page sections are `#vision`, `#impact`, `#ventures`, `#insights`,
`#about`, `#founders`, `#contact`. Every other page links back to those by name, so renaming
a section id means updating `founders.html`, `partners.html`, `rounds.html`, `404.html`, and
both legal pages too. The nav block is duplicated across pages by hand — change one, change
all of them.

**Voice** — the frame is that humanity advances when people are free to build, and the first
place Brask Group works on that is medicine, where AI is already reshaping training, practice,
and delivery. Pragmatist, not evangelist: name the ambivalence clinicians feel as reasonable,
don't take a side. Never say a product uses AI unless it does. No invented metrics — Rounds
carries a `Live · App Store` tag because it is; the others carry no status claim rather than a
made-up one. The front page speaks to partners and peers; `founders.html` is the one place
that speaks directly to someone starting out, and `partners.html` is careful to say Brask
Group is self-funded and not raising rather than implying otherwise.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
