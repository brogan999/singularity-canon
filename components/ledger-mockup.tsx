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
} from "@/lib/atlas-data"

function fig(n: number) {
  return n.toFixed(2)
}

export function LedgerMockup() {
  const [traj, setTraj] = useState<TrajectoryId>("race")
  const active = trajectories.find((t) => t.id === traj)!

  // Each entry's "figure" = peak pressure of its highest-loaded domain this trajectory.
  const rows = predictions.map((p) => {
    const domainObjs = p.domains.map((id) => domains.find((d) => d.id === id)!).filter(Boolean)
    const peak = Math.max(...domainObjs.map((d) => peakPressure(d, traj)))
    return { p, peak }
  })
  const total = rows.reduce((s, r) => s + r.peak, 0)

  const assets = predictions.filter((p) => p.confidence === "High")
  const liabilities = predictions.filter((p) => p.divergence === "High")

  return (
    <main className="theme-ledger min-h-screen bg-background text-foreground font-mono">
      {/* Masthead */}
      <header className="border-b-2 border-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-6 py-6">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3" /> Hub
            </Link>
            <h1 className="font-serif text-3xl font-semibold leading-none tracking-tight md:text-4xl">
              The Impact Ledger
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {siteMeta.name} — Register of Anticipated Effects
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
            <dt className="text-muted-foreground">Folio</dt>
            <dd className="text-right">Vol. I / 2024</dd>
            <dt className="text-muted-foreground">Account</dt>
            <dd className="text-right">SIA-0001</dd>
            <dt className="text-muted-foreground">Basis</dt>
            <dd className="text-right uppercase">{active.short}</dd>
          </dl>
        </div>
      </header>

      {/* Trajectory folios */}
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto flex max-w-6xl items-stretch gap-0 px-6">
          <span className="flex items-center pr-4 text-xs uppercase tracking-widest text-muted-foreground">
            Basis of entry
          </span>
          {trajectories.map((t) => (
            <button
              key={t.id}
              onClick={() => setTraj(t.id)}
              className={`-mb-px border-x border-t-2 px-5 py-3 text-xs uppercase tracking-widest transition-colors ${
                traj === t.id
                  ? "border-t-destructive border-x-border bg-background text-foreground"
                  : "border-t-transparent border-x-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.short}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {active.tagline} Figures below record the peak pressure each entry places on its most
          exposed domain, in ledger points, under the selected basis.
        </p>

        {/* The register: double-entry ledger */}
        <section className="border-l-4 border-l-destructive border border-border">
          <div className="grid grid-cols-[3rem_1fr_7rem_5rem_5rem] gap-0 border-b-2 border-foreground bg-secondary/60 px-4 py-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            <span>No.</span>
            <span>Particulars</span>
            <span className="text-right">Window</span>
            <span className="text-right">Conf.</span>
            <span className="text-right">Figure</span>
          </div>
          <div className="ledger-rows">
            {rows.map(({ p, peak }, i) => (
              <Link
                key={p.id}
                href="/dossier"
                className="grid grid-cols-[3rem_1fr_7rem_5rem_5rem] items-baseline gap-0 border-b border-border px-4 py-3 text-sm transition-colors hover:bg-accent/40"
              >
                <span className="text-muted-foreground">{String(i + 1).padStart(3, "0")}</span>
                <span className="pr-4">
                  <span className="font-serif text-[0.95rem] leading-snug">{p.claim}</span>
                  <span className="mt-1 block text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {p.domains.join(" · ")}
                  </span>
                </span>
                <span className="text-right text-xs text-muted-foreground">{p.timeWindow}</span>
                <span className="text-right text-xs uppercase">{p.confidence}</span>
                <span
                  className={`text-right tabular-nums ${
                    p.divergence === "High" ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {fig(peak)}
                </span>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-[3rem_1fr_7rem_5rem_5rem] gap-0 border-t-2 border-foreground bg-secondary/60 px-4 py-2.5 text-sm">
            <span />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Carried forward
            </span>
            <span />
            <span />
            <span className="text-right font-semibold tabular-nums">{fig(total)}</span>
          </div>
          <p className="px-4 py-2 text-[0.65rem] text-muted-foreground">
            Figures in red denote entries with high inter-trajectory divergence — outcomes that swing
            materially with the basis of entry.
          </p>
        </section>

        {/* Balance: assets / liabilities */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border border-border">
            <h2 className="border-b-2 border-foreground bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest">
              Assets — Load-bearing (High confidence)
            </h2>
            <ul className="ledger-rows">
              {assets.map((p) => (
                <li key={p.id} className="border-b border-border px-4 py-2.5 text-sm">
                  <span className="font-serif">{p.claim}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border">
            <h2 className="border-b-2 border-foreground bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-destructive">
              Liabilities — Contingent (High divergence)
            </h2>
            <ul className="ledger-rows">
              {liabilities.map((p) => (
                <li key={p.id} className="border-b border-border px-4 py-2.5 text-sm">
                  <span className="font-serif">{p.claim}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Domain accounts */}
        <section className="mt-10">
          <h2 className="mb-4 border-b-2 border-foreground pb-2 text-xs uppercase tracking-widest">
            Domain accounts — peak pressure ({active.short})
          </h2>
          <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
            {domains.map((d) => {
              const peak = peakPressure(d, traj)
              return (
                <div key={d.id} className="flex items-center gap-3 text-sm">
                  <span className="w-40 shrink-0 truncate font-serif">{d.name}</span>
                  <div className="relative h-4 flex-1 border border-border bg-background">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${peak}%` }}
                    />
                  </div>
                  <span
                    className={`w-14 shrink-0 text-right tabular-nums ${
                      peak >= 80 ? "text-destructive" : ""
                    }`}
                  >
                    {fig(peak)}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-6 text-xs text-muted-foreground">
          <p>Examined and found correct — {siteMeta.subtitle}</p>
          <p className="uppercase tracking-widest">Mockup — not audited</p>
        </footer>
      </div>
    </main>
  )
}
