"use client"

import Link from "next/link"
import { domains, domainPressure, predictions, trajectories, years, yearCaptions } from "@/lib/atlas-data"
import { useAtlas } from "@/components/museum/store"
import { SectionLabel, PressureBar } from "@/components/museum/chrome"

export default function TimelinePage() {
  const { trajectory, year, setYear } = useAtlas()
  const active = trajectories.find((t) => t.id === trajectory)!

  const cardsThisYear = predictions.filter((p) => {
    const start = Number.parseInt(p.timeWindow.slice(0, 4), 10)
    const end = Number.parseInt(p.timeWindow.slice(-4), 10)
    return year >= start - 3 && year <= end + 3
  })

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SectionLabel>Timeline corridor</SectionLabel>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Scrub the decades.</h1>

      {/* Corridor */}
      <div className="mt-10 flex items-stretch gap-2 overflow-x-auto pb-2">
        {years.map((y) => {
          const isActive = y === year
          return (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`flex min-w-28 flex-1 flex-col items-start gap-2 rounded-sm border p-4 text-left transition-colors ${
                isActive ? "border-primary bg-accent" : "border-border hover:border-foreground/30"
              }`}
            >
              <span className="font-serif text-2xl font-semibold">{y === 2050 ? "2050+" : y}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[0.6rem] uppercase tracking-wider ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {yearCaptions[y].tag}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-6 max-w-2xl text-pretty font-serif text-2xl leading-relaxed">{yearCaptions[year].caption}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_18rem]">
        {/* Cards in window */}
        <section>
          <SectionLabel>In this window</SectionLabel>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {cardsThisYear.map((p) => (
              <li key={p.id}>
                <Link href={`/museum/predictions/${p.id}`} className="group flex items-center gap-4 py-4">
                  <span className="font-mono text-xs text-primary">{p.timeWindow}</span>
                  <span className="flex-1 font-serif text-lg leading-snug group-hover:text-primary">{p.claim}</span>
                </Link>
              </li>
            ))}
            {cardsThisYear.length === 0 && (
              <li className="py-4 text-sm text-muted-foreground">No cards land near this year.</li>
            )}
          </ul>
        </section>

        {/* Live readout */}
        <aside className="h-fit rounded-sm border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Domain pressure · {active.short}</p>
          <ul className="mt-4 space-y-2.5">
            {[...domains]
              .sort((a, b) => domainPressure(b, year, trajectory) - domainPressure(a, year, trajectory))
              .slice(0, 6)
              .map((d) => {
                const p = domainPressure(d, year, trajectory)
                return (
                  <li key={d.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span>{d.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{p}</span>
                    </div>
                    <div className="mt-1"><PressureBar value={p} /></div>
                  </li>
                )
              })}
          </ul>
        </aside>
      </div>
    </div>
  )
}
