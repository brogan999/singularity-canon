"use client"

import { useState } from "react"
import { domains, domainPressure, predictions, trajectories, years, type TrajectoryId } from "@/lib/atlas-data"
import { SectionTitle } from "@/components/dossier/chrome"

export default function DossierCompare() {
  const [a, setA] = useState<TrajectoryId>("race")
  const [b, setB] = useState<TrajectoryId>("governed")
  const [onlyDiff, setOnlyDiff] = useState(false)
  const [year, setYear] = useState<number>(2035)

  const rows = domains
    .map((d) => {
      const pa = domainPressure(d, year, a)
      const pb = domainPressure(d, year, b)
      return { d, pa, pb, diff: Math.abs(pa - pb) }
    })
    .filter((r) => (onlyDiff ? r.diff >= 8 : true))

  const ta = trajectories.find((t) => t.id === a)!
  const tb = trajectories.find((t) => t.id === b)!

  return (
    <section>
      <SectionTitle n="D">Compare · side by side</SectionTitle>
      <p className="mt-2 text-xs text-muted-foreground">Domain pressure read at {year}.</p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
        <TrajPicker label="A" value={a} onChange={setA} />
        <TrajPicker label="B" value={b} onChange={setB} />
        <label className="flex items-center gap-2">
          <span className="font-bold">Year</span>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="border border-foreground/40 bg-background px-2 py-1.5 outline-none">
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
        <label className="ml-auto flex items-center gap-2">
          <input type="checkbox" checked={onlyDiff} onChange={(e) => setOnlyDiff(e.target.checked)} />
          Show only differences
        </label>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-foreground/40 bg-foreground/40">
        <div className="bg-secondary p-3 text-xs font-bold uppercase tracking-wider">A · {ta.short}</div>
        <div className="bg-secondary p-3 text-xs font-bold uppercase tracking-wider">B · {tb.short}</div>
        {rows.map(({ d, pa, pb, diff }) => {
          const highlight = diff >= 8
          return (
            <div key={d.id} className="contents">
              <div className={`bg-card p-3 ${highlight ? "border-l-2 border-primary" : ""}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">{d.name}</span>
                  <span className={highlight ? "text-primary" : "text-muted-foreground"}>{pa}</span>
                </div>
                <div className="mt-1.5 h-1 bg-muted"><div className="h-full bg-foreground/70" style={{ width: `${pa}%` }} /></div>
              </div>
              <div className={`bg-card p-3 ${highlight ? "border-l-2 border-primary" : ""}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">{d.name}</span>
                  <span className={highlight ? "text-primary" : "text-muted-foreground"}>{pb}</span>
                </div>
                <div className="mt-1.5 h-1 bg-muted"><div className="h-full bg-foreground/70" style={{ width: `${pb}%` }} /></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Claim-level divergence */}
      <div className="mt-10">
        <SectionTitle n="D.2">How claims diverge</SectionTitle>
        <ul className="mt-4 space-y-3">
          {predictions.filter((p) => p.divergence === "High").map((p) => (
            <li key={p.id} className="border border-foreground/40 bg-card p-4 text-sm">
              <p className="font-bold leading-snug">{p.claim}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="border-l-2 border-foreground/40 pl-3">
                  <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">A · {ta.short}</p>
                  <p className="mt-1 leading-relaxed">{p.delta[a]}</p>
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">B · {tb.short}</p>
                  <p className="mt-1 leading-relaxed">{p.delta[b]}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TrajPicker({ label, value, onChange }: { label: string; value: TrajectoryId; onChange: (v: TrajectoryId) => void }) {
  return (
    <label className="flex items-center gap-2">
      <span className="font-bold">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as TrajectoryId)} className="border border-foreground/40 bg-background px-2 py-1.5 outline-none">
        {trajectories.map((t) => (
          <option key={t.id} value={t.id}>{t.short}</option>
        ))}
      </select>
    </label>
  )
}
