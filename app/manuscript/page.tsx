"use client"

import Link from "next/link"
import { ScrollText } from "lucide-react"
import {
  domains,
  predictions,
  domainPressure,
  domainArt,
  heroArt,
  trajectories,
} from "@/lib/atlas-data"
import { useManuscript } from "@/components/manuscript/store"
import { FolioLabel, Plate, Reading } from "@/components/manuscript/chrome"

export default function ManuscriptHome() {
  const { trajectory, year } = useManuscript()
  const active = trajectories.find((t) => t.id === trajectory)!
  const folioDomains = domains.slice(0, 4)

  return (
    <div>
      {/* Title folio */}
      <section className="mb-10">
        <FolioLabel>Codex I — Folio recto</FolioLabel>
        <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          The Singularity: An Illustrated Scenario Atlas
        </h1>
        <p className="mt-5 max-w-xl text-pretty font-serif text-lg italic leading-relaxed text-muted-foreground">
          An illuminated account of how machine intelligence may reshape economy, culture, and power —
          read as scripture, scanned as instrument.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/manuscript/atlas"
            className="hud-panel-sm bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground"
          >
            Open the atlas
          </Link>
          <Link
            href="/manuscript/trajectories"
            className="hud-panel-sm border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest"
          >
            Compare codices
          </Link>
        </div>
      </section>

      {/* Featured illumination */}
      <figure className="parchment gild-frame relative overflow-hidden">
        <img
          src={heroArt.src || "/placeholder.svg"}
          alt="Renaissance fresco of two hands reaching across a divide, an allegory of creation"
          className="aspect-[16/9] w-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="pointer-events-none absolute left-0 top-0 p-4">
          <span className="hud-panel-sm inline-block bg-background/80 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-instrument backdrop-blur">
            Plate · {heroArt.allegory}
          </span>
        </div>
        <figcaption className="flex items-center justify-between border-t border-border bg-card px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
          <span>Illumination — after the masters</span>
          <span className="text-instrument">Scanned {year} · {active.short}</span>
        </figcaption>
      </figure>

      {/* Folios preview */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <h2 className="font-serif text-2xl font-semibold">The eight folios</h2>
          <Link
            href="/manuscript/atlas"
            className="font-mono text-[0.65rem] uppercase tracking-widest text-instrument hover:underline"
          >
            See all ▸
          </Link>
        </div>
        <div className="mt-6 space-y-14">
          {folioDomains.map((d, i) => {
            const art = domainArt[d.id]
            const pressure = domainPressure(d, year, trajectory)
            const flip = i % 2 === 1
            return (
              <article key={d.id} className="grid items-center gap-8 md:grid-cols-2">
                <div className={flip ? "md:order-2" : ""}>
                  <Plate src={art.src} alt={`Renaissance allegory of ${d.name}: ${art.allegory}`} allegory={art.allegory} />
                </div>
                <div className={flip ? "md:order-1" : ""}>
                  <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
                    <ScrollText className="size-3.5 text-instrument" />
                    Folio {String(i + 2).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight">{d.name}</h3>
                  <p className="mt-4 font-serif text-lg leading-relaxed">
                    <span className="float-left mr-2 mt-1 font-serif text-6xl font-semibold leading-[0.8] text-gild">
                      {d.thesis.charAt(0)}
                    </span>
                    {d.thesis.slice(1)}
                  </p>
                  <div className="mt-5">
                    <Reading label={`Pressure · ${year} · ${active.short}`} value={pressure} />
                  </div>
                  <Link
                    href={`/manuscript/domains/${d.id}`}
                    className="mt-4 inline-block font-mono text-[0.65rem] uppercase tracking-widest text-instrument hover:underline"
                  >
                    Read folio ▸
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Marginalia preview */}
      <section className="mt-14 border-t border-border pt-8">
        <FolioLabel>Marginalia — receipts &amp; footnotes</FolioLabel>
        <ol className="mt-4 space-y-3">
          {predictions.slice(0, 3).map((p, i) => (
            <li key={p.id} className="flex gap-3 font-serif text-sm leading-relaxed">
              <span className="shrink-0 font-mono text-xs text-instrument">{i + 1}.</span>
              <Link href={`/manuscript/predictions/${p.id}`} className="hover:text-instrument">
                {p.claim} <span className="italic text-muted-foreground">— {p.evidence[0]}</span>
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href="/manuscript/predictions"
          className="mt-5 inline-block font-mono text-[0.65rem] uppercase tracking-widest text-instrument hover:underline"
        >
          All marginalia ▸
        </Link>
      </section>
    </div>
  )
}
