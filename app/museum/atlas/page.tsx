"use client"

import Link from "next/link"
import { domains, domainPressure, predictionsForDomain, trajectories } from "@/lib/atlas-data"
import { useAtlas } from "@/components/museum/store"
import { SectionLabel, PressureBar } from "@/components/museum/chrome"

export default function AtlasPage() {
  const { trajectory, year } = useAtlas()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SectionLabel>Explore the atlas</SectionLabel>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Eight rooms of impact.</h1>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        Each room is a domain of life. Heat and readings below are computed for the {active.name} trajectory at {year}.
        Enter a room to read its thesis and the predictions filed under it.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {domains.map((d) => {
          const p = domainPressure(d, year, trajectory)
          const related = predictionsForDomain(d.id)
          return (
            <Link
              key={d.id}
              href={`/museum/domains/${d.id}`}
              className="flex flex-col rounded-sm border border-border bg-card p-5 transition-colors hover:border-primary"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">Pressure {p}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                  {related.length} cards
                </span>
              </div>
              <PressureBar value={p} />
              <h2 className="mt-4 font-serif text-lg font-semibold leading-tight tracking-tight">{d.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.thesis}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
