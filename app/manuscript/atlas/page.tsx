"use client"

import Link from "next/link"
import { domains, domainPressure, domainArt, trajectories } from "@/lib/atlas-data"
import { useManuscript } from "@/components/manuscript/store"
import { FolioLabel, Plate, Reading } from "@/components/manuscript/chrome"

export default function ManuscriptAtlas() {
  const { trajectory, year } = useManuscript()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <div>
      <FolioLabel>Codex II — The Atlas</FolioLabel>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Eight illuminated folios
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
        Each domain is a folio: an allegorical plate above, a thesis below, and an instrument reading
        of its pressure under the {active.short} trajectory in {year}.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {domains.map((d, i) => {
          const art = domainArt[d.id]
          const pressure = domainPressure(d, year, trajectory)
          return (
            <Link
              key={d.id}
              href={`/manuscript/domains/${d.id}`}
              className="group flex flex-col border border-border bg-card/40 transition-colors hover:border-instrument/50"
            >
              <Plate src={art.src} alt={`Renaissance allegory of ${d.name}: ${art.allegory}`} allegory={art.allegory} ratio="aspect-[16/10]" />
              <div className="p-5">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                  Folio {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight group-hover:text-instrument">
                  {d.name}
                </h2>
                <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">{d.thesis}</p>
                <div className="mt-4">
                  <Reading label={`Pressure · ${year}`} value={pressure} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
