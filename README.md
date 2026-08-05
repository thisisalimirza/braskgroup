# braskgroup.com

Static site for Brask Group. No build step, no framework, no dependencies. Edit the HTML,
commit, push; Vercel serves it.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Front page: hero, approach/thesis, portfolio, writing, how we operate, founder, contact |
| `rounds.html` | Rounds product page, plus its App Store–required privacy policy and terms |
| `privacy-policy.html` / `terms-of-service.html` | Company-level legal pages |
| `404.html` | Not-found page |
| `assets/site.css` | The whole design system — every page links this one file |
| `assets/site.js` | Footer year, masthead hairline, section reveal |
| `doctor-notes.html`, `pearls.html`, `doc-what.html`, `binaural-synth.html` | Older product pages, still on the old styling and not linked from the front page |

## Design system

VC-editorial: flat white, black ink, one orange accent, light mode only (no dark theme —
this is intentional, not an oversight).

- **Type** — [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) (variable,
  400–900) for headlines and body, [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
  for eyebrows, nav, product indices, AI-disclosure tags, and the colophon.
- **Colour** — white `#FFFFFF` / near-black ink `#0B0B0C` / burnt-orange accent `#C4390A` for
  text and links (AA-contrast safe), a brighter `#FF5A1F` reserved for decorative fills only
  (the wordmark mark, underlines, hover borders) since it doesn't clear AA on its own as text.
- **Grid** — an asymmetric two-column row (`.row`): a narrow mono rail carrying the section
  label, a wide column carrying the prose. Collapses to one column under 860px.
- **Portfolio** — `.register` / `.entry`, a numbered list. Rounds takes `.entry--lead` for
  the larger treatment. Each entry carries a `.tag` disclosing whether it uses AI
  (`.tag--ai`, orange) or not (plain `.tag`, gray) — this is load-bearing, not decorative:
  see Voice below.

All tokens live in `:root` at the top of `assets/site.css`.

## Editing

**Adding or changing a product** — copy an `.entry` block in `index.html` and renumber the
`.entry-index` values. Give it an honest `.tag` (`.tag--ai` only if it actually uses AI
meaningfully). Nothing is generated, so what you type is what ships.

**Adding the Rounds App Store link** — there's a commented-out `<a class="link">` marking the
spot in `index.html` (Portfolio entry and Contact) and `rounds.html`. Uncomment it and drop
the listing URL in.

**Voice** — the thesis is that AI is reshaping medicine and Brask Group builds the parts of
that worth wanting, one problem at a time ("brick by brick" — used once, in Approach, not
repeated elsewhere). Pragmatist, not evangelist: name the ambivalence clinicians feel about
AI as reasonable, don't take a side. Never say a product uses AI unless it does — the
plain-AI-disclosure tags in Portfolio exist specifically so a skeptical clinician can check
and find no overclaiming. No metrics dashboard, no team page beyond the founder section, no
"coming soon."

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
