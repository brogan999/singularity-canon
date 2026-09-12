"use client"

import { siteMeta } from "@/lib/atlas-data"
import { ArchiveHeading } from "@/components/monastery/chrome"

export default function MonasteryColophon() {
  return (
    <div className="max-w-2xl">
      <ArchiveHeading eyebrow="Colophon · on the making" title="On this archive" />

      <div className="space-y-5 font-serif text-lg leading-relaxed text-muted-foreground">
        <p>
          The Archive treats every prediction as a preserved manuscript entry: dated, catalogued, cross-referenced,
          and amended. The reading room is solemn and text-first; the instrument that reads it lives in the terminal
          strip along the right margin.
        </p>
        <p>
          {siteMeta.blurb} Each entry carries evidence, a counter-reading, and three trajectory readings. Pressure
          logs are computed 0–100, rising with time and bending with the selected trajectory.
        </p>
      </div>

      <section className="mt-10 border-t border-border pt-6">
        <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-instrument">The two layers</h2>
        <dl className="mt-4 space-y-4 font-serif">
          <div>
            <dt className="font-semibold text-foreground">The corpus (artifact)</dt>
            <dd className="text-muted-foreground">Solemn manuscript entries, plates, and marginalia — the archive itself.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">The terminal (instrument)</dt>
            <dd className="text-muted-foreground">Year scrub, trajectory, and world-state meters — the machine reading the archive.</dd>
          </div>
        </dl>
      </section>

      <section className="mt-10 border-t border-border pt-6">
        <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-instrument">Changelog</h2>
        <ul className="mt-3 space-y-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
          <li>v1.3 — amended labor-displacement window after new task-exposure data.</li>
          <li>v1.2 — added compute-accord entry and counter-readings.</li>
          <li>v1.1 — first full corpus with trajectory readings.</li>
        </ul>
      </section>

      <p className="mt-10 border-t border-border pt-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        {siteMeta.subtitle} · Archive terminal · mockup
      </p>
    </div>
  )
}
