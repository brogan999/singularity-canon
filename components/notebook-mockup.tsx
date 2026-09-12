"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  trajectories,
  domains,
  predictions,
  siteMeta,
  years,
  yearCaptions,
  domainPressure,
  peakPressure,
  type TrajectoryId,
  type Domain,
} from "@/lib/atlas-data"

// Small hand-inked sparkline of a domain's pressure across the years.
function InkLine({ domain, traj }: { domain: Domain; traj: TrajectoryId }) {
  const w = 132
  const h = 40
  const pts = years.map((y, i) => {
    const x = (i / (years.length - 1)) * w
    const v = domainPressure(domain, y, traj)
    const yy = h - (v / 100) * h
    return [x, yy] as const
  })
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden>
      <path d={d} fill="none" stroke="var(--primary)" strokeWidth={1.5} strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={1.8} fill="var(--accent)" />
      ))}
    </svg>
  )
}

function SpecimenPlate({ domain, traj, n }: { domain: Domain; traj: TrajectoryId; n: number }) {
  const peak = peakPressure(domain, traj)
  return (
    <figure className="relative bg-card p-4 shadow-[2px_2px_0_var(--border)]">
      {/* tipped-in catalog label */}
      <div className="mb-3 flex items-center justify-between">
        <span className="border border-border px-1.5 py-0.5 text-[0.6rem] uppercase tracking-widest text-muted-foreground">
          Plate {String(n).padStart(2, "0")}
        </span>
        <span className="font-mono text-[0.65rem] text-accent">pk {peak}</span>
      </div>
      <h3 className="font-serif text-lg italic leading-tight">{domain.name}</h3>
      <div className="my-2 border-y border-dashed border-border py-2">
        <InkLine domain={domain} traj={traj} />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{domain.thesis}</p>
    </figure>
  )
}

export function NotebookMockup() {
  const [traj, setTraj] = useState<TrajectoryId>("governed")
  const active = trajectories.find((t) => t.id === traj)!

  return (
    <main className="theme-notebook graph-paper min-h-screen bg-background text-foreground font-mono">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/mockups"
          className="mb-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3" /> Hub
        </Link>

        {/* Cover header — handwritten feel */}
        <header className="relative border-b-2 border-foreground pb-5">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">Field Notebook — No. 4</p>
          <h1 className="mt-2 font-serif text-4xl italic leading-none tracking-tight md:text-5xl">
            Observations on the Transition
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {siteMeta.blurb} Recorded in the field, annotated by hand, filed under specimen and
            expedition condition.
          </p>
          <span className="mt-3 inline-block -rotate-2 font-serif text-sm italic text-accent">
            &mdash; keep pages dry
          </span>
        </header>

        {/* Expedition conditions (trajectory) */}
        <section className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Expedition conditions:
          </span>
          {trajectories.map((t) => (
            <button
              key={t.id}
              onClick={() => setTraj(t.id)}
              className={`rounded-sm border px-3 py-1 text-xs transition-colors ${
                traj === t.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {t.short}
            </button>
          ))}
          <span className="font-serif text-sm italic text-muted-foreground">{active.tagline}</span>
        </section>

        {/* Specimen plates */}
        <section className="mt-8">
          <h2 className="mb-4 font-serif text-xl italic">Specimen plates — impact domains</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((d, i) => (
              <SpecimenPlate key={d.id} domain={d} traj={traj} n={i + 1} />
            ))}
          </div>
        </section>

        {/* Field notes — predictions */}
        <section className="mt-10">
          <h2 className="mb-4 font-serif text-xl italic">Field notes — recorded predictions</h2>
          <div className="space-y-4">
            {predictions.map((p, i) => (
              <article
                key={p.id}
                className="flex gap-4 border-l-2 border-accent bg-card/60 p-4"
              >
                <span className="shrink-0 font-serif text-2xl italic text-accent">
                  {String.fromCharCode(97 + i)}.
                </span>
                <div>
                  <p className="font-serif text-base leading-snug">{p.claim}</p>
                  <p className="mt-1.5 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                    {p.timeWindow} · rating: {p.confidence} confidence · spread: {p.divergence}
                  </p>
                  <p className="mt-2 -rotate-[0.4deg] font-serif text-sm italic text-muted-foreground">
                    obs. under {active.short}: {p.delta[traj]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Expedition log — timeline */}
        <section className="mt-10">
          <h2 className="mb-4 font-serif text-xl italic">Expedition log</h2>
          <ol className="space-y-3">
            {years.map((y) => (
              <li key={y} className="flex gap-4 border-b border-dashed border-border pb-3">
                <span className="w-14 shrink-0 font-mono text-sm text-accent">{y}</span>
                <div>
                  <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {yearCaptions[y].tag}
                  </span>
                  <p className="font-serif text-sm leading-snug">{yearCaptions[y].caption}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-12 border-t-2 border-foreground pt-4 text-xs text-muted-foreground">
          <p>Field notebook is a design mockup — {siteMeta.subtitle}</p>
        </footer>
      </div>
    </main>
  )
}
