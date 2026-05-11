# AGENTS.md

## Cursor Cloud specific instructions

This is a **zero-dependency static HTML website** (Brask Group marketing site). There is no build step, no package manager, no framework, and no tests.

### Running the dev server

```bash
python3 -m http.server 8000
```

This serves the site at `http://localhost:8000`. All `.html` files in the repo root are directly accessible (e.g. `/rounds.html`, `/privacy-policy.html`).

### Key facts

- No linter, test runner, or build tool is configured for this repo.
- The only JavaScript is a one-liner in `index.html` that sets the copyright year in the footer.
- Fonts are loaded from Google Fonts CDN; the site degrades gracefully without network access.
- Vercel Web Analytics script is embedded but non-functional in local dev (expected).
- The `CNAME` file maps to `braskgroup.com` for GitHub Pages deployment.
