# Illuminated Manuscript — Design System

A portable, content-agnostic theme layer. It carries the *look* (parchment +
gold artifact layer, thin cyan HUD instrument layer) with **no coupling to any
dataset**, so you can wrap it around any corpus.

## The one rule

**Only one layer speaks loudly at a time.** The page is the *artifact*
(serif, parchment, gold, generous measure). The margins and overlays are the
*instrument* (mono, cyan, chamfered panels, thin rules). Never let the HUD
compete with the reading content — it annotates, it doesn't shout.

## Install (3 steps)

1. **Copy the folder** `manuscript-ds/` into your project.
2. **Import the stylesheet** once, after Tailwind, in your global CSS:
   ```css
   @import "tailwindcss";
   @import "../manuscript-ds/theme.css";
   ```
3. **Load the fonts** in `app/layout.tsx` and apply the theme wrapper:
   ```tsx
   import { manuscriptFontVars } from "@/manuscript-ds/fonts"

   export default function RootLayout({ children }) {
     return (
       <html lang="en" className={`${manuscriptFontVars} bg-background`}>
         <body>{children}</body>
       </html>
     )
   }
   ```
   Then add `theme-manuscript` to any wrapper (or use `<ManuscriptShell>`).

## Minimal example

```tsx
import {
  ManuscriptShell, ArtifactLayout, Folio, FolioLabel, FolioHeading, FolioProse,
  InstrumentMargin, InstrumentPanel, Meter, Plate,
} from "@/manuscript-ds"

export default function Page() {
  return (
    <ManuscriptShell>
      <ArtifactLayout
        margin={
          <InstrumentMargin>
            <InstrumentPanel title="Instrument" live>
              <Meter label="Signal" value={72} />
            </InstrumentPanel>
          </InstrumentMargin>
        }
      >
        <Folio>
          <FolioLabel>Folio I</FolioLabel>
          <FolioHeading as="h1">Your title here</FolioHeading>
          <FolioProse dropCap>
            <p>Your corpus body text…</p>
          </FolioProse>
        </Folio>
        <Folio>
          <Plate src="/your-image.png" alt="Plate" caption="Allegory" />
        </Folio>
      </ArtifactLayout>
    </ManuscriptShell>
  )
}
```

## Tokens (defined on `.theme-manuscript`)

| Token | Role |
| --- | --- |
| `--background` / `--foreground` | parchment / iron-gall ink |
| `--card` / `--card-foreground` | vellum panel / ink |
| `--primary` | instrument cyan (also `--ring`) |
| `--accent` | soft gold |
| `--destructive` | rubric red |
| `--muted` / `--muted-foreground` | quiet fills / secondary ink |
| `--border` / `--input` | hairline rules |
| `--instrument` | HUD cyan accent (→ `text-instrument`, `bg-instrument`) |
| `--gild` | gold leaf (→ `text-gild`, `bg-gild`) |
| `--radius` | `0.125rem` — near-square, bound-codex feel |

All colors are `oklch()`. Change the palette in `theme.css` and everything
downstream re-tints. `--instrument` and `--gild` are registered with Tailwind,
so opacity modifiers work: `border-instrument/40`, `bg-gild/10`, etc.

## Typography

- `font-serif` → **Fraunces** — the artifact voice (headings + body prose).
- `font-mono` → **JetBrains Mono** — the instrument voice (labels, readouts).
- `font-sans` → **Geist** — neutral fallback for dense UI.

Body prose target: `text-lg leading-relaxed`, narrow measure (`max-w-prose`).

## Signature utility classes

| Class | Effect |
| --- | --- |
| `.hud-panel` / `.hud-panel-sm` | chamfered clip-path panel shape |
| `.hud-ticks` | cyan corner ticks (top-left + bottom-right) |
| `.hud-scan` | faint horizontal scanline wash |
| `.hud-sweep` | animated scanning bar (respects reduced-motion) |
| `.instrument-grid` | fine cyan measurement grid background |
| `.parchment` | aged vignette + grain for plates |
| `.gild-frame` | gold hairline frame + inset shadow |
| `.drop-cap` | illuminated gold first-letter on first paragraph |

## Components

**Artifact layer** — `ManuscriptShell`, `ArtifactLayout` (page + sticky
margin), `Folio`, `FolioLabel`, `FolioHeading`, `FolioProse` (with `dropCap`).

**Instrument layer** — `InstrumentPanel` (with `live` sweep), `Meter`,
`InstrumentToggle<T>` (segmented control), `InstrumentScrubber` (range +
readout + caption), `InstrumentMargin` (sticky container).

**Imagery** — `Plate` (gilded framed image with gold caption).

Every component is controlled and content-agnostic — you own the state and
pass your corpus content in. Nothing imports application data.

## How to apply it to a corpus

1. Map each record to a `Folio` (label + heading + prose).
2. Put any per-record imagery in a `Plate`.
3. Lift any cross-cutting controls/metrics (filters, a date scrubber,
   score meters) into the `InstrumentMargin` as `InstrumentPanel`s.
4. Keep the reading column serif and calm; keep the margin mono and cyan.
