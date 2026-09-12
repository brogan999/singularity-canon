"use client"

import { years, yearCaptions, domains, domainPressure, trajectories } from "@/lib/atlas-data"
import { useManuscript } from "@/components/manuscript/store"
import { FolioLabel } from "@/components/manuscript/chrome"

export default function ManuscriptChronology() {
  const { trajectory, year, setYearIdx } = useManuscript()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <div>
      <FolioLabel>Codex V — Chronology</FolioLabel>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        The scanned years
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
        The codex read forward in time under the {active.short} trajectory. Select a year to set the
        active reading.
      </p>

      <ol className="mt-10 space-y-6">
        {years.map((y, i) => {
          const cap = yearCaptions[y]
          const on = y === year
          // top three domains by pressure this year
          const ranked = [...domains]
            .map((d) => ({ d, v: domainPressure(d, y, trajectory) }))
            .sort((a, b) => b.v - a.v)
            .slice(0, 3)
          return (
            <li key={y}>
              <button
                onClick={() => setYearIdx(i)}
                className={`hud-panel flex w-full flex-col gap-3 border p-5 text-left transition-colors md:flex-row md:items-center ${
                  on ? "border-instrument bg-card" : "border-border hover:border-instrument/50"
                }`}
              >
                <div className="flex shrink-0 items-baseline gap-3 md:w-48">
                  <span className={`font-serif text-4xl font-semibold tabular-nums ${on ? "text-instrument" : ""}`}>{y}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-gild">{cap.tag}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-base leading-relaxed">{cap.caption}</p>
                  <div className="mt-2 flex flex-wrap gap-2 font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                    {ranked.map(({ d, v }) => (
                      <span key={d.id} className="border border-border px-1.5 py-0.5">
                        {d.name.split(" ")[0]} <span className="text-instrument tabular-nums">{v}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
