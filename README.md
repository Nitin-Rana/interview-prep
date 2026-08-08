# Interview Prep Hub

Live progress dashboard for Nitin Rana's LLD and DSA interview prep — [nitinrana2011.github.io/interview-prep](#) *(update this link once GitHub Pages is live)*.

## How it works

`index.html` is a static page with no build step. It fetches and parses the actual markdown tracker files at load time:

- `LLD-Prep/00_PROGRESS_TRACKER.md`
- `DSA-Prep/00_PROGRESS_TRACKER.md`
- `DSA-Prep/03_QUESTION_TRACKER.md`
- `DSA-Prep/05_REVISION_QUEUE.md`

There is no separate data file to keep in sync. **The trackers are the database.**

## Daily workflow

1. Study, solve problems, update the trackers as normal — check off `[x]` in `03_QUESTION_TRACKER.md`, tick phase checkboxes in `00_PROGRESS_TRACKER.md`, update Current Status / Session Log.
2. Commit and push:
   ```bash
   git add -A
   git commit -m "progress: <what you did>"
   git push
   ```
3. GitHub Pages redeploys automatically (usually under a minute). Refresh the site — the numbers, bars, and rings reflect the new state.

## Local preview

Browsers block `fetch()` against `file://` paths, so opening `index.html` directly won't load data. Run a tiny local server from this folder instead:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## If you edit assets/app.js or assets/style.css

GitHub Pages serves both with cacheable headers, and browsers don't reliably
re-fetch them on a normal reload. `index.html` references them with a
`?v=N` query string (`assets/app.js?v=2`) specifically to force a fresh
fetch after a deploy — **bump that number** any time you change either
file, or visitors (including you) may silently keep running the old
version after a push. The markdown trackers themselves are fetched with
`cache: "no-store"` in `app.js`, so they always update without this.

## Structure

```
index.html              the site
assets/style.css        theming, layout, animation
assets/app.js           markdown parsing + rendering (no dependencies)
LLD-Prep/                the actual LLD tracker (source of truth)
DSA-Prep/                the actual DSA tracker (source of truth)
```

## Parser notes (if the tracker format changes)

`assets/app.js` parses markdown with regex, not a markdown library, so it's tied to the current conventions:
- `## Phase N ...` headings group checklist items in `00_PROGRESS_TRACKER.md`.
- `- [ ]` / `- [x]` / `- [~]` / `- [★]` checkbox lines (any nesting depth) are the countable units.
- `## T01 — Topic Name (30)` headings group question rows in `03_QUESTION_TRACKER.md`; rows look like `| 1 | [ ] | [Title](url) | E | C | note | Co |`.
- The Session Log and Revision Queue are parsed from their respective markdown tables.

If you restructure a tracker file's headings or table columns, check `assets/app.js` still matches.
