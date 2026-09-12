"use client"

import { domains, domainPressure, trajectories, years } from "@/lib/atlas-data"
import { useControl } from "@/components/control/store"
import { SectionHead } from "@/components/control/parts"

export default function ControlTrajectories() {
  const { trajectory, setTrajectory, year } = useControl()

  return (
    <div className="p-6 lg:p-10">
      <SectionHead index="T" title="Trajectories" note="operating scenarios" />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        The selected trajectory drives every reading in the sidebar and across the site. Switch the active
        scenario here or from the top bar.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
        {trajectories.map((t) => {
          const isActive = t.id === trajectory
          return (
            <div key={t.id} className={`flex flex-col bg-card p-5 ${isActive ? "ring-1 ring-inset ring-primary" : ""}`}>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.name}</p>
                {isActive && <span className="text-[0.6rem] uppercase tracking-wider text-primary">active</span>}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>

              <p className="mt-5 text-[0.65rem] uppercase tracking-wider text-muted-foreground">Assumptions</p>
              <ul className="mt-2 space-y-1 text-xs">
                {t.assumptions.map((a) => (
                  <li key={a} className="flex gap-2"><span className="text-accent">·</span>{a}</li>
                ))}
              </ul>

              <p className="mt-4 text-[0.65rem] uppercase tracking-wider text-muted-foreground">Outcomes</p>
              <ul className="mt-2 space-y-1 text-xs">
                {t.outcomes.map((o) => (
                  <li key={o} className="flex gap-2"><span className="text-primary">›</span>{o}</li>
                ))}
              </ul>

              <button
                onClick={() => setTrajectory(t.id)}
                className={`mt-5 rounded px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"
                }`}
              >
                {isActive ? "Active scenario" : `Activate ${t.short}`}
              </button>
            </div>
          )
        })}
      </div>

      {/* Divergence matrix at current year */}
      <section className="mt-10">
        <SectionHead index="·" title="Divergence matrix" note={`domain pressure at ${year}`} />
        <div className="mt-4 overflow-x-auto border border-border">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary text-left uppercase tracking-wider">
                <th className="p-3 font-semibold">Domain</th>
                {trajectories.map((t) => (
                  <th key={t.id} className="p-3 font-semibold">{t.short}</th>
                ))}
                <th className="p-3 font-semibold">Spread</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((d) => {
                const vals = trajectories.map((t) => domainPressure(d, year, t.id))
                const spread = Math.max(...vals) - Math.min(...vals)
                return (
                  <tr key={d.id} className="border-b border-border/60">
                    <td className="p-3 font-semibold">{d.name}</td>
                    {trajectories.map((t, i) => (
                      <td key={t.id} className="p-3">
                        <span className={t.id === trajectory ? "text-primary" : "text-muted-foreground"}>{vals[i]}</span>
                      </td>
                    ))}
                    <td className="p-3">
                      <span className="flex items-center gap-2">
                        <span className="flex h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                          <span className="h-full bg-accent" style={{ width: `${spread * 2}%` }} />
                        </span>
                        {spread}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[0.7rem] text-muted-foreground">Readings interpolate across {years[0]}–{years[years.length - 1]}.</p>
      </section>
    </div>
  )
}
