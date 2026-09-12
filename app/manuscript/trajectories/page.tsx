"use client"

import { trajectories, domains, peakPressure } from "@/lib/atlas-data"
import { useManuscript } from "@/components/manuscript/store"
import { FolioLabel } from "@/components/manuscript/chrome"

export default function ManuscriptCodices() {
  const { trajectory, setTrajectory } = useManuscript()

  return (
    <div>
      <FolioLabel>Codex IV — The three codices</FolioLabel>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Three accounts of the same future
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
        The same predictions, transcribed under three different assumptions. Select one to make it the
        active reading across the whole codex.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {trajectories.map((t) => {
          const on = t.id === trajectory
          return (
            <button
              key={t.id}
              onClick={() => setTrajectory(t.id)}
              className={`hud-panel flex flex-col border p-5 text-left transition-colors ${
                on ? "border-instrument bg-card" : "border-border hover:border-instrument/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-semibold">{t.name}</h2>
                <span
                  className={`font-mono text-[0.55rem] uppercase tracking-widest ${on ? "text-instrument" : "text-muted-foreground"}`}
                >
                  {on ? "Active" : "Select"}
                </span>
              </div>
              <p className="mt-2 font-serif text-sm italic leading-relaxed text-muted-foreground">{t.tagline}</p>

              <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-gild">Assumptions</p>
              <ul className="mt-2 space-y-1.5">
                {t.assumptions.map((a) => (
                  <li key={a} className="flex gap-2 font-serif text-sm leading-snug">
                    <span className="text-instrument">·</span>
                    {a}
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-widest text-gild">Outcomes</p>
              <ul className="mt-2 space-y-1.5">
                {t.outcomes.map((o) => (
                  <li key={o} className="flex gap-2 font-serif text-sm leading-snug">
                    <span className="text-instrument">·</span>
                    {o}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      {/* Peak pressure comparison */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-serif text-2xl font-semibold">Peak pressure by folio</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left font-mono text-xs">
            <thead>
              <tr className="uppercase tracking-widest text-muted-foreground">
                <th className="py-2 pr-4 font-normal">Folio</th>
                {trajectories.map((t) => (
                  <th key={t.id} className={`py-2 pr-4 font-normal ${t.id === trajectory ? "text-instrument" : ""}`}>
                    {t.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {domains.map((d) => (
                <tr key={d.id} className="border-t border-border">
                  <td className="py-2 pr-4 font-serif text-sm">{d.name}</td>
                  {trajectories.map((t) => (
                    <td key={t.id} className={`py-2 pr-4 tabular-nums ${t.id === trajectory ? "text-instrument" : "text-muted-foreground"}`}>
                      {peakPressure(d, t.id)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
