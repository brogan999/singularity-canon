"use client"

import { siteMeta } from "@/lib/atlas-data"
import { FolioLabel } from "@/components/manuscript/chrome"

export default function ManuscriptColophon() {
  return (
    <div className="max-w-2xl">
      <FolioLabel>Codex VI — Colophon</FolioLabel>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        How this codex is made
      </h1>

      <div className="mt-6 space-y-5 font-serif text-lg leading-relaxed">
        <p>
          <span className="float-left mr-2 mt-1 font-serif text-6xl font-semibold leading-[0.8] text-gild">T</span>
          his atlas is built on a single conceit: a prediction is both a piece of scripture and a piece of
          telemetry. The illuminated plate carries the meaning; the instrument margin carries the measurement.
          Only one of them speaks loudly at a time.
        </p>
        <p>
          {siteMeta.blurb} Each domain is scored for pressure — a 0–100 reading that rises with time and bends
          with the chosen trajectory. The plates are allegorical illuminations after the Renaissance masters,
          scanned and annotated by a future instrument.
        </p>
      </div>

      <section className="mt-10 border-t border-border pt-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-instrument">The two layers</h2>
        <dl className="mt-4 space-y-4 font-serif">
          <div>
            <dt className="font-semibold">The page (artifact)</dt>
            <dd className="text-muted-foreground">Illuminated plates, drop-caps, and marginalia — the loud, human layer.</dd>
          </div>
          <div>
            <dt className="font-semibold">The margin (instrument)</dt>
            <dd className="text-muted-foreground">Trajectory toggles, year scrub, and world-state meters — the thin, measured layer.</dd>
          </div>
        </dl>
      </section>

      <section className="mt-10 border-t border-border pt-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        <p>Edition v1.3 · illuminated · mockup</p>
        <p className="mt-1">{siteMeta.subtitle}</p>
      </section>
    </div>
  )
}
