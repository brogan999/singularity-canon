"use client"

import { years, yearCaptions, domains, domainPressure, domainArt, trajectories } from "@/lib/atlas-data"
import { useGallery } from "@/components/gallery/store"

export default function GalleryTimeline() {
  const { trajectory, year, setYear } = useGallery()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">The procession</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Walk the years
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
        A corridor of years under {active.short} lighting. The most-lit room in each year is the one under
        greatest pressure.
      </p>

      <div className="mt-10 space-y-4">
        {years.map((y) => {
          const cap = yearCaptions[y]
          const on = y === year
          const lead = [...domains]
            .map((d) => ({ d, v: domainPressure(d, y, trajectory) }))
            .sort((a, b) => b.v - a.v)[0]
          const art = domainArt[lead.d.id]
          return (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`hud-panel flex w-full items-center gap-4 border p-4 text-left transition-colors ${
                on ? "border-instrument bg-card" : "border-border hover:border-instrument/50"
              }`}
            >
              <div className="relative h-20 w-16 shrink-0 overflow-hidden">
                <img src={art.src || "/placeholder.svg"} alt={art.allegory} className="h-full w-full object-cover" crossOrigin="anonymous" />
                <span className="pointer-events-none absolute inset-1 gild-frame" />
              </div>
              <div className="flex shrink-0 items-baseline gap-2 md:w-40">
                <span className={`font-serif text-3xl font-semibold tabular-nums ${on ? "text-instrument" : ""}`}>{y}</span>
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-gild">{cap.tag}</span>
              </div>
              <p className="min-w-0 flex-1 font-serif text-sm leading-relaxed text-muted-foreground">{cap.caption}</p>
              <span className="hidden shrink-0 font-mono text-[0.6rem] uppercase tracking-widest text-instrument sm:inline">
                {lead.d.name.split(" ")[0]} {lead.v}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
