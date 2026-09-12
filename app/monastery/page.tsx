"use client"

import Link from "next/link"
import { predictions, domainArt, heroArt, siteMeta } from "@/lib/atlas-data"

export default function MonasteryStart() {
  const featured = predictions[0]
  const snapshot = predictions.slice(0, 5)

  return (
    <div>
      {/* Solemn header over faint fresco */}
      <header className="relative mb-8 overflow-hidden hud-panel border border-border">
        <img
          src={heroArt.src || "/placeholder.svg"}
          alt="Renaissance fresco, faint behind archive header"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-20"
          crossOrigin="anonymous"
        />
        <div className="hud-scan relative p-6 md:p-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-instrument">
            Corpus · restricted reading room
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-tight md:text-5xl">
            The Archive of the Singularity
          </h1>
          <p className="mt-3 max-w-xl font-serif text-base italic leading-relaxed text-muted-foreground">
            A structured corpus of predictions, preserved as sacred text and read through a future
            instrument. {siteMeta.blurb}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/monastery/index"
              className="hud-panel-sm bg-primary px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-primary-foreground"
            >
              Open the index
            </Link>
            <Link
              href="/monastery/compare"
              className="hud-panel-sm border border-border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest"
            >
              Compare trajectories
            </Link>
          </div>
        </div>
      </header>

      {/* Featured folio */}
      <section className="mb-8 grid gap-0 overflow-hidden border border-border md:grid-cols-[220px_1fr]">
        <figure className="parchment relative">
          <img
            src={domainArt[featured.domains[0]].src || "/placeholder.svg"}
            alt={`Allegory plate for ${featured.claim}`}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <span className="pointer-events-none absolute inset-2 gild-frame" />
        </figure>
        <div className="bg-card p-5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-gild">
            Featured folio · {featured.timeWindow}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight">{featured.claim}</h2>
          <ul className="mt-4 space-y-1.5">
            {featured.evidence.slice(0, 3).map((e, i) => (
              <li key={i} className="flex gap-2 font-serif text-sm leading-snug text-muted-foreground">
                <span className="font-mono text-xs text-instrument">{i + 1}.</span>
                {e}
              </li>
            ))}
          </ul>
          <Link
            href={`/monastery/entries/${featured.id}`}
            className="hud-panel-sm mt-5 inline-block bg-primary px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-primary-foreground"
          >
            Open entry
          </Link>
        </div>
      </section>

      {/* Index snapshot */}
      <section>
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Index snapshot</h2>
          <Link href="/monastery/index" className="font-mono text-[0.6rem] uppercase tracking-widest text-instrument hover:underline">
            Full index ▸
          </Link>
        </div>
        <ul className="mt-2 divide-y divide-border">
          {snapshot.map((p) => (
            <li key={p.id}>
              <Link href={`/monastery/entries/${p.id}`} className="group flex items-baseline justify-between gap-4 py-3">
                <span className="font-serif text-sm leading-snug group-hover:text-instrument">{p.claim}</span>
                <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                  {p.timeWindow}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 border-t border-border pt-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        {siteMeta.subtitle} · Archive terminal · mockup
      </footer>
    </div>
  )
}
