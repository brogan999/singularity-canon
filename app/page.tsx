import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteMeta } from "@/lib/atlas-data"

const mockups = [
  {
    href: "/museum",
    index: "01",
    title: "Museum of Futures",
    metaphor: "Exhibit + guided tour",
    vibe: "Clean, editorial, art-directed. A curated exhibit with placards and rooms.",
    best: "Getting mainstream, curious readers to finish the page and trust you.",
    swatches: ["oklch(0.975 0.004 250)", "oklch(0.2 0.015 265)", "oklch(0.43 0.14 264)"],
    surface: "oklch(0.975 0.004 250)",
    ink: "oklch(0.2 0.015 265)",
    accent: "oklch(0.43 0.14 264)",
    font: "font-serif",
    pages: ["Home", "Atlas", "Domain rooms", "Predictions", "Trajectories", "Timeline", "About"],
  },
  {
    href: "/control-room",
    index: "02",
    title: "Control Room",
    metaphor: "Instrument panel + live world-state",
    vibe: "Operational dashboard, cinematic. Feels like monitoring a system.",
    best: "Power users who want falsifiable, structured — not vibes.",
    swatches: ["oklch(0.16 0.017 250)", "oklch(0.82 0.15 75)", "oklch(0.74 0.11 205)"],
    surface: "oklch(0.16 0.017 250)",
    ink: "oklch(0.92 0.012 240)",
    accent: "oklch(0.82 0.15 75)",
    font: "font-mono",
    pages: ["Overview", "Domains", "Domain readouts", "Predictions", "Trajectories", "Methods"],
  },
  {
    href: "/dossier",
    index: "03",
    title: "Dossier / Field Manual",
    metaphor: "Tabs, stamps, structured library",
    vibe: "Investigative binder: tabs, footnotes, a declassified aesthetic.",
    best: "Large corpus and readers who want to study and reference.",
    swatches: ["oklch(0.9 0.028 88)", "oklch(0.26 0.022 60)", "oklch(0.48 0.19 27)"],
    surface: "oklch(0.9 0.028 88)",
    ink: "oklch(0.26 0.022 60)",
    accent: "oklch(0.48 0.19 27)",
    font: "font-mono",
    pages: ["Start Here", "Index", "Compare", "Timeline", "About", "Entry + domain files"],
  },
]

// New directions to explore, all in the archival / printed-reference family.
const explorations = [
  {
    href: "/ledger",
    index: "04",
    title: "The Ledger",
    metaphor: "Actuarial register + double-entry",
    vibe: "A bound risk ledger: ruled rows, navy ink, red figures for volatile entries, running tallies.",
    signature: "Ruled double-entry register with a red margin rule",
    swatches: ["oklch(0.95 0.025 168)", "oklch(0.32 0.06 250)", "oklch(0.5 0.21 25)"],
    surface: "oklch(0.95 0.025 168)",
    ink: "oklch(0.32 0.06 250)",
    accent: "oklch(0.5 0.21 25)",
    font: "font-serif",
  },
  {
    href: "/brief",
    index: "05",
    title: "Declassified Brief",
    metaphor: "Intelligence assessment + redaction",
    vibe: "A newsprint memo: classification banners, key judgments, source reports with hover-to-reveal redaction.",
    signature: "Redaction bars that declassify on hover",
    swatches: ["oklch(0.915 0.006 90)", "oklch(0.2 0.004 60)", "oklch(0.5 0.2 25)"],
    surface: "oklch(0.915 0.006 90)",
    ink: "oklch(0.2 0.004 60)",
    accent: "oklch(0.5 0.2 25)",
    font: "font-serif",
  },
  {
    href: "/notebook",
    index: "06",
    title: "Field Notebook",
    metaphor: "Naturalist's specimen catalog",
    vibe: "A hand-annotated journal on graph paper: specimen plates, inked sparklines, margin notes in the field.",
    signature: "Graph paper + tipped-in specimen plates",
    swatches: ["oklch(0.955 0.022 142)", "oklch(0.42 0.09 205)", "oklch(0.53 0.13 42)"],
    surface: "oklch(0.955 0.022 142)",
    ink: "oklch(0.42 0.09 205)",
    accent: "oklch(0.53 0.13 42)",
    font: "font-serif",
  },
]

// Dual-layer direction: sacred Renaissance artifact + sci-fi instrument/HUD.
const duals = [
  {
    href: "/manuscript",
    index: "07",
    title: "Illuminated Manuscript",
    metaphor: "Sacred text + HUD margins",
    vibe: "A parchment codex being scanned by a future instrument. Scroll turns folios; the thin cyan margin holds the controls.",
    signature: "Loud parchment page, sparse instrument margin",
    swatches: ["oklch(0.925 0.03 84)", "oklch(0.27 0.03 58)", "oklch(0.58 0.13 202)"],
    surface: "oklch(0.925 0.03 84)",
    ink: "oklch(0.27 0.03 58)",
    accent: "oklch(0.58 0.13 202)",
    font: "font-serif",
    pages: ["Codex", "Atlas", "Domain folios", "Marginalia", "Codices", "Chronology", "Colophon"],
  },
  {
    href: "/gallery",
    index: "08",
    title: "Renaissance Gallery",
    metaphor: "Framed paintings + holographic labels",
    vibe: "A dim gallery where each classical painting is a prediction cluster and the future UI is the docent — hover a frame to summon its plaque.",
    signature: "Holographic HUD plaque on hover",
    swatches: ["oklch(0.19 0.012 56)", "oklch(0.9 0.02 82)", "oklch(0.78 0.13 196)"],
    surface: "oklch(0.19 0.012 56)",
    ink: "oklch(0.9 0.02 82)",
    accent: "oklch(0.78 0.13 196)",
    font: "font-serif",
    pages: ["Foyer", "Rooms", "Room detail", "Catalogue", "Timeline", "About"],
  },
  {
    href: "/monastery",
    index: "09",
    title: "Monastery Archive Terminal",
    metaphor: "Sacred dossier + sci-fi console",
    vibe: "A monastic reading room rebuilt as a command terminal: solemn corpus, book-tab nav, and a live terminal strip of year, trajectory, and meters.",
    signature: "Book-tab archive + live terminal strip",
    swatches: ["oklch(0.16 0.016 242)", "oklch(0.88 0.03 84)", "oklch(0.75 0.12 196)"],
    surface: "oklch(0.16 0.016 242)",
    ink: "oklch(0.88 0.03 84)",
    accent: "oklch(0.75 0.12 196)",
    font: "font-serif",
    pages: ["Start Here", "Index", "Entry files", "Domain files", "Chronicle", "Compare", "Colophon"],
  },
]

export default function HubPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {siteMeta.name} — Homepage concepts
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Nine ways into one map of the future.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Six concepts are now built as complete multi-page sites — the original three plus the
            dual-layer trio that collides a sacred Renaissance artifact layer with a sci-fi instrument
            layer — alongside three archival single-page explorations. Every one renders from the same
            content model: a timeline, trajectories, eight impact domains, and structured prediction cards.
          </p>
        </header>

        <Link
          href="/canon"
          className="group mt-12 flex flex-col justify-between gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/40 sm:flex-row sm:items-center"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Design system, applied to a real corpus
            </p>
            <p className="mt-3 text-pretty text-lg font-medium leading-snug">
              The Illuminated Manuscript theme dressing The Singularity Canon — 104 forecasts,
              arguments, and fictions rendered as an illuminated volume with a live instrument margin.
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
            Open the Canon
            <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>

        <div className="mt-16 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Full multi-page sites
          </h2>
          <span className="font-mono text-xs text-muted-foreground/60">01 — 03</span>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {mockups.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                      {m.index}
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>

                  <div
                    className="mt-6 flex h-28 items-end gap-2 overflow-hidden rounded-md p-3"
                    style={{ backgroundColor: m.surface }}
                  >
                    <span
                      className={`${m.font} text-2xl font-semibold leading-none`}
                      style={{ color: m.ink }}
                    >
                      Aa
                    </span>
                    <div className="ml-auto flex gap-1.5">
                      {m.swatches.map((s, i) => (
                        <span
                          key={i}
                          className="size-6 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: s }}
                        />
                      ))}
                    </div>
                  </div>

                  <h2 className="mt-6 text-xl font-semibold tracking-tight">{m.title}</h2>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
                    {m.metaphor}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.vibe}</p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Best for</p>
                  <p className="mt-1 text-sm leading-relaxed">{m.best}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.pages.map((pg) => (
                      <span key={pg} className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                        {pg}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            New directions to explore — dossier family
          </h2>
          <span className="font-mono text-xs text-muted-foreground/60">04 — 06</span>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {explorations.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                      {m.index}
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>

                  <div
                    className="mt-6 flex h-28 items-end gap-2 overflow-hidden rounded-md p-3"
                    style={{ backgroundColor: m.surface }}
                  >
                    <span
                      className={`${m.font} text-2xl font-semibold leading-none`}
                      style={{ color: m.ink }}
                    >
                      Aa
                    </span>
                    <div className="ml-auto flex gap-1.5">
                      {m.swatches.map((s, i) => (
                        <span
                          key={i}
                          className="size-6 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: s }}
                        />
                      ))}
                    </div>
                  </div>

                  <h2 className="mt-6 text-xl font-semibold tracking-tight">{m.title}</h2>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
                    {m.metaphor}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.vibe}</p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">
                    Signature element
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">{m.signature}</p>
                  <span className="mt-4 inline-block rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                    Single-page concept
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Dual-layer — sacred artifact + sci-fi instrument
          </h2>
          <span className="font-mono text-xs text-muted-foreground/60">07 — 09</span>
        </div>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
          The &quot;monks vs. machines&quot; contrast: Renaissance frescoes and illuminated pages
          (the human meaning-making layer) collided with chamfered HUD panels, scanlines, and
          telemetry (the posthuman capability layer). Only one layer is ever loud at a time.
        </p>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {duals.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/40"
              >
                <div>
                  {/* real artifact + instrument preview */}
                  <div className="relative h-36 overflow-hidden border-b border-border">
                    <img
                      src="/atlas/hero-fresco.png"
                      alt="Renaissance fresco preview of the dual-layer concept"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      crossOrigin="anonymous"
                    />
                    <span
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.25) 3px 4px)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-3">
                      <span
                        className="font-mono text-[0.6rem] uppercase tracking-[0.2em]"
                        style={{ color: m.accent }}
                      >
                        Artifact + instrument
                      </span>
                      <ArrowUpRight className="size-4 text-white/80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                        {m.index}
                      </span>
                      <div className="flex gap-1.5">
                        {m.swatches.map((s, i) => (
                          <span
                            key={i}
                            className="size-4 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: s }}
                          />
                        ))}
                      </div>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold tracking-tight">{m.title}</h2>
                    <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
                      {m.metaphor}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.vibe}</p>
                  </div>
                </div>

                <div className="mx-6 mb-6 border-t border-border pt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">
                    Signature element
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">{m.signature}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.pages.map((pg) => (
                      <span key={pg} className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                        {pg}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-20 rounded-lg border border-border bg-card p-6 md:p-10">
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Shared component system
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            All three homepages are buildable from the same reusable modules, so the content model
            never has to be rewritten to try a different style.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Trajectory toggle (global state)",
              "Year / timeline scrubber",
              "Domain tile with heat + top predictions",
              "Prediction card + evidence drawer",
              "Compare view (A / B)",
              "Index table (filters + sort)",
            ].map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-foreground/60">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground">
          <p>{siteMeta.subtitle}</p>
          <p className="font-mono text-xs">Mockups — not final content</p>
        </footer>
      </div>
    </main>
  )
}
