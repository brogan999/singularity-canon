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

## Your job here: combine the design system with the FULL corpus

The data currently in `lib/canon-data.ts` was generated from the **lite** edition (metadata +
summaries for 104 sources, body text dropped). The task is to regenerate it from the **full**
corpus export (more sources + full body text). This is a **data-layer** task — the theme and the
pages do not change.

Full instructions are in `CANON-INTEGRATION.md`. Short version:

```bash
# metadata + summaries only (lean, bundled):
node scripts/parse-canon.mjs path/to/full-corpus.md

# also extract full body text to content/canon/<slug>.md, on-demand:
node scripts/parse-canon.mjs path/to/full-corpus.md --with-body
```

Then wire `bodyPath` into the folio reader (`app/canon/[slug]/page.tsx`) — see the guide.

## Key files

| Path | Role |
| --- | --- |
| `scripts/parse-canon.mjs` | Turns the raw markdown export into `lib/canon-data.ts`. Format-driven. |
| `lib/canon-data.ts` | AUTO-GENERATED. Never hand-edit; regenerate with the parser. |
| `app/canon/page.tsx` | Contents/title page: search, part lens, year horizon. |
| `app/canon/[slug]/page.tsx` | Folio reader for one source. Server Component — can read body files. |
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
- Don't inline full body text into `lib/canon-data.ts` — it bloats the client bundle. Use
  `--with-body` (files under `content/canon/`) or a database, and load per-slug on demand.
- The in-memory substring search in `app/canon/page.tsx` is fine for summaries. For full-text
  search across bodies, swap it for a real index (Postgres FTS or a search service).
- Reuse `manuscript-ds` primitives for any new Canon UI so the aesthetic stays consistent.
