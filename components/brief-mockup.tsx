"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  trajectories,
  domains,
  predictions,
  siteMeta,
  peakPressure,
  type TrajectoryId,
  type Prediction,
} from "@/lib/atlas-data"

function ClassificationBar({ label }: { label: string }) {
  return (
    <div className="classif-bar w-full py-1 text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em]">
      {label}
    </div>
  )
}

// Wraps a few words of the counter-line in redaction bars for the memo aesthetic.
function Redacted({ text }: { text: string }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((w, i) => {
        const hide = w.length > 5 && (i % 3 === 0 || i % 5 === 0)
        return (
          <span key={i}>
            {hide ? <span className="redacted" title="Redacted">{w}</span> : w}
            {i < words.length - 1 ? " " : ""}
          </span>
        )
      })}
    </>
  )
}

function SourceReport({ p }: { p: Prediction }) {
  return (
    <article className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-[0.65rem] uppercase tracking-widest">
        <span className="text-muted-foreground">Report {p.id.slice(0, 3).toUpperCase()}-{p.timeWindow.slice(0, 4)}</span>
        <span
          className={`stamp px-1.5 py-0.5 text-[0.6rem] ${
            p.confidence === "High" ? "" : "opacity-70"
          }`}
        >
          {p.confidence} conf
        </span>
      </div>
      <div className="p-3">
        <p className="font-serif text-sm leading-snug">{p.claim}</p>
        <p className="mt-2 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
          Fields: {p.domains.join(" / ")}
        </p>
        <p className="mt-3 border-t border-dashed border-border pt-2 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Alt assessment: </span>
          <Redacted text={p.counter} />
        </p>
      </div>
    </article>
  )
}

export function BriefMockup() {
  const [traj, setTraj] = useState<TrajectoryId>("race")
  const active = trajectories.find((t) => t.id === traj)!

  const topDomains = [...domains]
    .sort((a, b) => peakPressure(b, traj) - peakPressure(a, traj))
    .slice(0, 4)

  return (
    <main className="theme-brief min-h-screen bg-background text-foreground font-mono">
      <ClassificationBar label="Unclassified // For Public Release" />

      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/mockups"
          className="mb-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3" /> Hub
        </Link>

        {/* Letterhead */}
        <header className="border-b-2 border-foreground pb-4">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">
            Office of Strategic Foresight
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-none tracking-tight md:text-4xl">
            Intelligence Assessment
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Subject: {siteMeta.name} — Anticipated impacts of the transition
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 text-xs sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">Ref</dt>
              <dd>IA-2024-0417</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Date</dt>
              <dd>17 APR 2024</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Scenario annex</dt>
              <dd className="uppercase">{active.short}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Pages</dt>
              <dd>1 of 1</dd>
            </div>
          </dl>
        </header>

        {/* Scenario annex selector */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scenario annex:</span>
          {trajectories.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setTraj(t.id)}
              className={`border px-3 py-1 text-xs uppercase tracking-widest transition-colors ${
                traj === t.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {String.fromCharCode(65 + i)}. {t.short}
            </button>
          ))}
        </div>

        {/* Key judgments */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em]">Key Judgments</h2>
          <ol className="space-y-3">
            {active.outcomes.map((o, i) => (
              <li key={i} className="flex gap-3 border-l-2 border-accent pl-3 text-sm leading-relaxed">
                <span className="font-bold text-accent">{i + 1}.</span>
                <span>
                  <span className="font-semibold">({active.short})</span> {o}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Assumptions. </span>
            {active.assumptions.join("; ")}.
          </p>
        </section>

        {/* Priority fields */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em]">
            Priority fields — peak pressure ({active.short})
          </h2>
          <div className="space-y-2">
            {topDomains.map((d) => {
              const peak = peakPressure(d, traj)
              return (
                <div key={d.id} className="flex items-center gap-3 text-xs">
                  <span className="w-44 shrink-0 truncate uppercase tracking-wider">{d.name}</span>
                  <div className="h-3 flex-1 border border-border">
                    <div className="h-full bg-accent" style={{ width: `${peak}%` }} />
                  </div>
                  <span className="w-8 text-right tabular-nums">{peak}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Source reports */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em]">
            Source reports <span className="font-normal text-muted-foreground">(hover to declassify)</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {predictions.map((p) => (
              <SourceReport key={p.id} p={p} />
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t-2 border-foreground pt-4 text-xs text-muted-foreground">
          <p>
            This assessment is a design mockup. Judgments are illustrative and do not represent an
            actual intelligence product. — {siteMeta.subtitle}
          </p>
        </footer>
      </div>

      <ClassificationBar label="Unclassified // For Public Release" />
    </main>
  )
}
