"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getPrediction, predictions, domains, domainArt, trajectories, getDomain } from "@/lib/atlas-data"
import { useMonastery } from "@/components/monastery/store"

export default function MonasteryEntry() {
  const { id } = useParams<{ id: string }>()
  const { trajectory } = useMonastery()
  const p = getPrediction(id)
  if (!p) return notFound()

  const idx = predictions.findIndex((x) => x.id === p.id)
  const prev = predictions[(idx - 1 + predictions.length) % predictions.length]
  const next = predictions[(idx + 1) % predictions.length]

  return (
    <div>
      <Link
        href="/monastery/index"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Index
      </Link>

      {/* Entry header with plate */}
      <header className="mt-4 grid gap-0 overflow-hidden border border-border md:grid-cols-[200px_1fr]">
        <figure className="parchment relative">
          <img
            src={domainArt[p.domains[0]].src || "/placeholder.svg"}
            alt={`Allegory plate for ${p.claim}`}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <span className="pointer-events-none absolute inset-2 gild-frame" />
        </figure>
        <div className="bg-card p-5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-gild">
            Entry {String(idx + 1).padStart(3, "0")} · {p.timeWindow}
          </p>
          <h1 className="mt-2 font-serif text-2xl font-semibold leading-tight md:text-3xl">{p.claim}</h1>
          <div className="mt-3 flex flex-wrap gap-2 font-mono text-[0.6rem] uppercase tracking-widest">
            <span className="border border-border px-2 py-1 text-muted-foreground">Conf · {p.confidence}</span>
            <span className={`border border-border px-2 py-1 ${p.divergence === "High" ? "text-destructive" : "text-muted-foreground"}`}>
              Div · {p.divergence}
            </span>
            {p.domains.map((d) => (
              <Link key={d} href={`/monastery/domains/${d}`} className="border border-border px-2 py-1 text-instrument hover:underline">
                {getDomain(d)?.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-instrument">Evidence</h2>
          <ol className="mt-3 space-y-3">
            {p.evidence.map((e, i) => (
              <li key={i} className="flex gap-3 font-serif text-sm leading-relaxed">
                <span className="shrink-0 font-mono text-xs text-instrument">{i + 1}.</span>
                {e}
              </li>
            ))}
          </ol>
          <h2 className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-instrument">Counter-reading</h2>
          <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">{p.counter}</p>
        </section>

        <section>
          <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-instrument">Impact by domain</h2>
          <div className="mt-3 space-y-2">
            {Object.entries(p.impacts).map(([did, v]) => (
              <div key={did}>
                <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                  <span>{domains.find((x) => x.id === did)?.name}</span>
                  <span className="text-instrument tabular-nums">{v}</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-border">
                  <div className="h-full bg-instrument" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trajectory readings */}
      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Readings by trajectory</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {trajectories.map((t) => {
            const on = t.id === trajectory
            return (
              <div key={t.id} className={`hud-panel-sm border p-4 ${on ? "border-instrument bg-card" : "border-border"}`}>
                <p className={`font-mono text-[0.6rem] uppercase tracking-widest ${on ? "text-instrument" : "text-muted-foreground"}`}>
                  {t.short} {on && "· active"}
                </p>
                <p className="mt-2 font-serif text-sm leading-relaxed">{p.delta[t.id]}</p>
              </div>
            )
          })}
        </div>
      </section>

      <nav className="mt-10 flex items-center justify-between border-t border-border pt-6 font-mono text-[0.6rem] uppercase tracking-widest">
        <Link href={`/monastery/entries/${prev.id}`} className="max-w-[45%] truncate text-muted-foreground hover:text-instrument">
          ◂ {prev.claim}
        </Link>
        <Link href={`/monastery/entries/${next.id}`} className="max-w-[45%] truncate text-right text-muted-foreground hover:text-instrument">
          {next.claim} ▸
        </Link>
      </nav>
    </div>
  )
}
