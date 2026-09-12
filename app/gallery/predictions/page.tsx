"use client"

import Link from "next/link"
import { predictions, domainArt } from "@/lib/atlas-data"

export default function GalleryCatalogue() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">Catalogue raisonné</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Every work in the collection
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
        Each prediction catalogued with its allegory, window, and divergence. Select an entry for the full
        placard.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {predictions.map((p, i) => {
          const art = domainArt[p.domains[0]]
          return (
            <Link
              key={p.id}
              href={`/gallery/predictions/${p.id}`}
              className="group flex gap-4 border border-border bg-card/40 p-3 transition-colors hover:border-instrument/50"
            >
              <div className="relative h-28 w-24 shrink-0 overflow-hidden">
                <img
                  src={art.src || "/placeholder.svg"}
                  alt={art.allegory}
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
                <span className="pointer-events-none absolute inset-1 gild-frame" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                  No. {String(i + 1).padStart(2, "0")} · <span className="text-instrument">{p.timeWindow}</span>
                </div>
                <h2 className="mt-1 font-serif text-lg font-semibold leading-snug group-hover:text-instrument">
                  {p.claim}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2 font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                  <span>Conf {p.confidence}</span>
                  <span className={p.divergence === "High" ? "text-destructive" : ""}>Div {p.divergence}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
