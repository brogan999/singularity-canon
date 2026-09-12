"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getPrediction, domains, trajectories, getDomain } from "@/lib/atlas-data"
import { useManuscript } from "@/components/manuscript/store"
import { FolioLabel, Reading } from "@/components/manuscript/chrome"

export default function ManuscriptPredictionDetail() {
  const { id } = useParams<{ id: string }>()
  const { trajectory } = useManuscript()
  const p = getPrediction(id)
  if (!p) return notFound()

  return (
    <div>
      <Link
        href="/manuscript/predictions"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Marginalia
      </Link>

      {/* Claim folio */}
      <section className="mt-4">
        <FolioLabel>Receipt · {p.timeWindow}</FolioLabel>
        <h1 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {p.claim}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2 font-mono text-[0.6rem] uppercase tracking-widest">
          <span className="hud-panel-sm border border-border px-2 py-1 text-muted-foreground">Confidence · {p.confidence}</span>
          <span className={`hud-panel-sm border border-border px-2 py-1 ${p.divergence === "High" ? "text-destructive" : "text-muted-foreground"}`}>
            Divergence · {p.divergence}
          </span>
          {p.domains.map((d) => (
            <Link key={d} href={`/manuscript/domains/${d}`} className="hud-panel-sm border border-border px-2 py-1 text-instrument hover:underline">
              {getDomain(d)?.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Evidence footnotes */}
        <section>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-instrument">Evidence</h2>
          <ol className="mt-3 space-y-3">
            {p.evidence.map((e, i) => (
              <li key={i} className="flex gap-3 font-serif text-sm leading-relaxed">
                <span className="shrink-0 font-mono text-xs text-instrument">{i + 1}.</span>
                {e}
              </li>
            ))}
          </ol>
          <h2 className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-instrument">What would falsify it</h2>
          <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">{p.counter}</p>
        </section>

        {/* Impact readings */}
        <section>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-instrument">Impact by folio</h2>
          <div className="mt-3 space-y-2">
            {Object.entries(p.impacts).map(([did, v]) => (
              <Reading key={did} label={domains.find((x) => x.id === did)?.name ?? did} value={v as number} />
            ))}
          </div>
        </section>
      </div>

      {/* Trajectory deltas */}
      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-serif text-2xl font-semibold">How the codices differ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {trajectories.map((t) => {
            const on = t.id === trajectory
            return (
              <div
                key={t.id}
                className={`hud-panel-sm border p-4 ${on ? "border-instrument bg-card" : "border-border"}`}
              >
                <p className={`font-mono text-[0.6rem] uppercase tracking-widest ${on ? "text-instrument" : "text-muted-foreground"}`}>
                  {t.short} {on && "· active"}
                </p>
                <p className="mt-2 font-serif text-sm leading-relaxed">{p.delta[t.id]}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
