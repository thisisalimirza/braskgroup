# braskgroup.com

Static site for Brask Group — the name Ali Mirza ships software under. No build step,
no framework, no dependencies. Edit the HTML, commit, push; Vercel serves it.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Front page: hero, register of products, about, writing, contact |
| `rounds.html` | Rounds product page, plus its App Store–required privacy policy and terms |
| `privacy-policy.html` / `terms-of-service.html` | Company-level legal pages |
| `404.html` | Not-found page |
| `assets/site.css` | The whole design system — every page links this one file |
| `assets/site.js` | Footer year, masthead hairline, section reveal |
| `doctor-notes.html`, `pearls.html`, `doc-what.html`, `binaural-synth.html` | Older product pages, still on the old styling and not linked from the front page |

## Design system

Editorial/institutional: warm paper, ink serif, mono labels.

- **Type** — [Newsreader](https://fonts.google.com/specimen/Newsreader) for prose and
  headlines, [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) for eyebrows,
  nav, indices, and the colophon.
- **Colour** — warm paper `#FAF7F2` / ink `#1A1917` / oxblood accent `#973520`, with a full
  dark theme that follows `prefers-color-scheme` and can be forced with `data-theme` on `<html>`.
- **Grid** — an asymmetric two-column row (`.row`): a narrow mono rail carrying the section
  label, a wide column carrying the prose. Collapses to one column under 860px.
- **Products** — `.register` / `.entry`, a numbered list. Rounds takes `.entry--lead` for
  the larger treatment.

All tokens live in `:root` at the top of `assets/site.css`.

## Editing

**Adding or changing a product** — copy an `.entry` block in `index.html` and renumber the
`.entry-index` values. Nothing is generated, so what you type is what ships.

**Adding the Rounds App Store link** — there's a commented-out `<a class="link">` marking the
spot in both `index.html` and `rounds.html`. Uncomment it and drop the listing URL in.

**Voice** — plain, direct, slightly dry. Present tense, honest about scale. No mission
statement, no metrics dashboard, no "coming soon." If something isn't real yet, it doesn't go
on the page.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
