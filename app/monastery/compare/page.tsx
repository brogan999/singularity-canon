"use client"

import { useState } from "react"
import Link from "next/link"
import { trajectories, domains, predictions, domainPressure, type TrajectoryId } from "@/lib/atlas-data"
import { useMonastery } from "@/components/monastery/store"
import { ArchiveHeading } from "@/components/monastery/chrome"

export default function MonasteryCompare() {
  const { year } = useMonastery()
  const [a, setA] = useState<TrajectoryId>("race")
  const [b, setB] = useState<TrajectoryId>("governed")
  const tA = trajectories.find((t) => t.id === a)!
  const tB = trajectories.find((t) => t.id === b)!

  function Picker({ value, onChange, side }: { value: TrajectoryId; onChange: (t: TrajectoryId) => void; side: string }) {
    return (
      <div>
        <p className="font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">{side}</p>
        <div className="mt-1 flex gap-1.5">
          {trajectories.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`hud-panel-sm px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider transition-colors ${
                value === t.id ? "bg-instrument text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.short}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <ArchiveHeading eyebrow="Concordance · side by side" title="Compare trajectories">
        Set two readings of the corpus against each other. Pressure is evaluated at {year}.
      </ArchiveHeading>

      <div className="flex flex-wrap gap-6">
        <Picker value={a} onChange={setA} side="Column A" />
        <Picker value={b} onChange={setB} side="Column B" />
      </div>

      {/* Domain pressure concordance */}
      <section className="mt-8">
        <h2 className="border-b border-border pb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Domain pressure at {year}
        </h2>
        <div className="mt-3 space-y-3">
          {domains.map((d) => {
            const va = domainPressure(d, year, a)
            const vb = domainPressure(d, year, b)
            return (
              <div key={d.id} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-1.5 flex-1 justify-end bg-border">
                      <div className="h-full bg-instrument" style={{ width: `${va}%` }} />
                    </div>
                    <span className="w-6 shrink-0 font-mono text-[0.6rem] tabular-nums text-instrument">{va}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 shrink-0 font-mono text-[0.6rem] tabular-nums text-gild">{vb}</span>
                    <div className="h-1.5 flex-1 bg-border">
                      <div className="h-full bg-gild" style={{ width: `${vb}%` }} />
                    </div>
                  </div>
                </div>
                <span className="w-28 shrink-0 text-right font-serif text-xs text-muted-foreground">{d.name}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[0.55rem] uppercase tracking-widest">
          <span className="text-instrument">{tA.short}</span>
          <span className="text-gild">{tB.short}</span>
        </div>
      </section>

      {/* Prediction delta concordance */}
      <section className="mt-10">
        <h2 className="border-b border-border pb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Reading concordance
        </h2>
        <div className="mt-3 space-y-4">
          {predictions.map((p) => (
            <div key={p.id} className="border border-border">
              <Link href={`/monastery/entries/${p.id}`} className="block border-b border-border bg-card px-4 py-2 font-serif text-sm font-semibold hover:text-instrument">
                {p.claim}
              </Link>
              <div className="grid gap-0 md:grid-cols-2">
                <div className="border-b border-border p-4 md:border-b-0 md:border-r">
                  <p className="font-mono text-[0.55rem] uppercase tracking-widest text-instrument">{tA.short}</p>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{p.delta[a]}</p>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[0.55rem] uppercase tracking-widest text-gild">{tB.short}</p>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{p.delta[b]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
