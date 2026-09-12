# CLAUDE.md

Context for working on this project in Claude Code. Read this first.

## What this project is

An "Illuminated Manuscript" design system applied to a text corpus (**The Singularity Canon**).
It has two separable layers:

1. **`manuscript-ds/`** — the portable design system: theme tokens, fonts, and content-agnostic
   React primitives (`Folio`, `FolioProse`, `InstrumentPanel`, `InstrumentSearch`, `Meter`, etc.).
   This is content-agnostic. Do **not** edit it to add or change corpus content.
2. **The Canon application** — `app/canon/*`, `components/canon/*`, and the generated data in
   `lib/canon-data.ts`. This is the design system rendering the corpus.

Stack: Next.js (App Router) + Tailwind v4 + TypeScript. Fonts: Fraunces (serif display),
JetBrains Mono (instrument layer), Geist (sans). Package manager: pnpm.

## State: full corpus is wired up

`lib/canon-data.ts` is generated from the **full** corpus (104 sources, ~3.8M words), and the
reader paginates the body text into "leaves".

```bash
# index only — what production deploys:
node scripts/parse-canon.mjs ~/singularity-canon/singularity-canon.md

# index + body leaves under content/canon/ — local reading:
node scripts/parse-canon.mjs ~/singularity-canon/singularity-canon.md --with-body
```

### The rule that matters: bodies are local, never published

The corpus includes commercial books from Alex's own shelf. `content/canon/` is **gitignored and
must never be deployed**. Production ships the index only — the summaries, which are our own
writing. The app is built so this is automatic: `loadManifest()` returns `null` when the bodies are
absent and every reader page degrades to the summary view. Verify with
`git status` before any commit, and by moving `content/` aside and re-running the app.

### How bodies are chunked

Word-budget driven (~2,500 words), breaking at paragraph boundaries, preferring chapter headings
where a work has them. `chapterDepth()` picks the spine per work — the shallowest heading level
appearing at least 3 times — because headings are unreliable across this corpus: the 180k-word
Foom Debate and *Last and First Men* have none at all, while *Age of Em* has 148.
`TARGET_WORDS`/`MIN_WORDS` are **frozen**: changing them repoints every `/canon/<slug>/<leaf>` URL.

Leading extraction debris (ISBNs, copyright pages, download chrome, shredded contents lists) is
trimmed by *signature*, never by length — a length rule ate the opening of every interview
transcript, whose turns are short. Each manifest records `frontMatterDropped` so it stays auditable.

## Key files

| Path | Role |
| --- | --- |
| `scripts/parse-canon.mjs` | Turns the raw markdown export into `lib/canon-data.ts`. Format-driven. |
| `lib/canon-data.ts` | AUTO-GENERATED. Never hand-edit; regenerate with the parser. |
| `app/canon/page.tsx` | Contents/title page: search, part lens, year horizon. |
| `app/canon/[slug]/page.tsx` | Frontispiece: summary, Illuminations, "Begin reading", leaf index. |
| `app/canon/[slug]/[leaf]/page.tsx` | The reader. One leaf, dynamic; leaves are not prerendered. |
| `app/canon/search/page.tsx` | Local full-text search. Empty when bodies are absent. |
| `lib/canon-body.ts` | Server-side leaf/manifest loading. Returns null when bodies are absent. |
| `lib/canon-search.ts` | Linear in-memory scan of the leaves. No index by design. |
| `components/canon/reader.tsx` | Body typography, leaf index, leaf nav, degradation note. |
| `app/canon/chronology/page.tsx` | By-decade timeline. |
| `components/canon/chrome.tsx` | Header + nav for the Canon section. |
| `manuscript-ds/` | Portable theme + primitives. Reuse, don't fork. |
| `manuscript-ds/README.md` | Token / type / class reference and the dual-layer rule. |

## Run it

```bash
pnpm install
pnpm dev            # http://localhost:3000  → /canon
```

## Rules

- Treat `lib/canon-data.ts` as a build artifact. Change the parser or the source, then regenerate.
- Never let body text into `lib/canon-data.ts`. `app/canon/page.tsx` is a Client Component, so
  everything in that module ships to the browser. Only `wordCount` and `leafCount` ride along.
- Never commit or deploy `content/canon/`. See the rule above.
- The in-memory substring search on the contents page covers summaries and is instant at this size.
  Full-text search is a separate, local-only server scan — deliberately not an index, because one
  would be larger than the 24 MB it indexes. Revisit only if it stops feeling fast.
- Reuse `manuscript-ds` primitives for any new Canon UI so the aesthetic stays consistent. Body
  typography rides in through `FolioProse`'s existing `className` — the design system is untouched.
