"use client"

import Link from "next/link"
import { domains, domainPressure, trajectories, years } from "@/lib/atlas-data"
import { useAtlas } from "@/components/museum/store"
import { SectionLabel, PressureBar } from "@/components/museum/chrome"

export default function TrajectoriesPage() {
  const { trajectory, setTrajectory, year } = useAtlas()

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SectionLabel>Choose your path</SectionLabel>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Three theories of how this goes.</h1>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        Trajectories are named scenarios. They change which claims are most likely and where they most disagree.
        Enter one to make it the lens for the whole site.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {trajectories.map((t, i) => {
          const isActive = t.id === trajectory
          return (
            <div
              key={t.id}
              className={`flex flex-col rounded-sm border p-6 transition-colors ${
                isActive ? "border-primary bg-card" : "border-border bg-card/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Room {String.fromCharCode(65 + i)}
                </span>
                {isActive && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-primary-foreground">
                    Entered
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight">{t.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Assumptions</p>
                  <ul className="mt-2 space-y-1">
                    {t.assumptions.map((a) => (
                      <li key={a} className="flex gap-2 leading-snug"><span className="text-primary">·</span>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Outcomes</p>
                  <ul className="mt-2 space-y-1">
                    {t.outcomes.map((o) => (
                      <li key={o} className="flex gap-2 leading-snug"><span className="text-primary">→</span>{o}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setTrajectory(t.id)}
                className={`mt-6 rounded-sm px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "border border-border hover:border-foreground/40"
                }`}
              >
                {isActive ? "Currently viewing" : `Enter ${t.short}`}
              </button>
            </div>
          )
        })}
      </div>

      {/* Side-by-side pressure at current year */}
      <section className="mt-14">
        <SectionLabel>How they differ at {year}</SectionLabel>
        <div className="mt-5 overflow-x-auto rounded-sm border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-card text-left">
                <th className="p-3 font-medium">Domain</th>
                {trajectories.map((t) => (
                  <th key={t.id} className="p-3 font-medium">{t.short}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {domains.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <Link href={`/museum/domains/${d.id}`} className="hover:text-primary">{d.name}</Link>
                  </td>
                  {trajectories.map((t) => {
                    const p = domainPressure(d, year, t.id)
                    return (
                      <td key={t.id} className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20"><PressureBar value={p} /></div>
                          <span className="font-mono text-xs text-muted-foreground">{p}</span>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Readings interpolate from base rates across {years[0]}–{years[years.length - 1]}.</p>
      </section>
    </div>
  )
}
