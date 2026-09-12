"use client"

import { years, yearCaptions, domains, domainPressure, trajectories } from "@/lib/atlas-data"
import { useMonastery } from "@/components/monastery/store"
import { ArchiveHeading } from "@/components/monastery/chrome"

export default function MonasteryChronicle() {
  const { trajectory, year, setYearIdx } = useMonastery()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <div>
      <ArchiveHeading eyebrow="Chronicle · dated record" title="The Chronicle">
        The corpus read forward in time under the {active.short} trajectory. Select a year to set the
        terminal reading.
      </ArchiveHeading>

      <ol className="relative mt-8 border-l border-border pl-6">
        {years.map((y, i) => {
          const cap = yearCaptions[y]
          const on = y === year
          const ranked = [...domains]
            .map((d) => ({ d, v: domainPressure(d, y, trajectory) }))
            .sort((a, b) => b.v - a.v)
            .slice(0, 3)
          return (
            <li key={y} className="relative pb-8 last:pb-0">
              <span
                className={`absolute -left-[1.7rem] top-1 size-3 rounded-full border ${
                  on ? "border-instrument bg-instrument" : "border-border bg-background"
                }`}
              />
              <button onClick={() => setYearIdx(i)} className="block text-left">
                <div className="flex items-baseline gap-3">
                  <span className={`font-serif text-2xl font-semibold tabular-nums ${on ? "text-instrument" : ""}`}>{y}</span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-widest text-gild">{cap.tag}</span>
                </div>
                <p className="mt-1 max-w-xl font-serif text-sm leading-relaxed text-muted-foreground">{cap.caption}</p>
                <div className="mt-2 flex flex-wrap gap-2 font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                  {ranked.map(({ d, v }) => (
                    <span key={d.id} className="border border-border px-1.5 py-0.5">
                      {d.name.split(" ")[0]} <span className="text-instrument tabular-nums">{v}</span>
                    </span>
                  ))}
                </div>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
