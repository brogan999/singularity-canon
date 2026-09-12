"use client"

import Link from "next/link"
import { Activity, ChevronRight } from "lucide-react"
import {
  domains,
  domainPressure,
  predictions,
  trajectories,
  yearCaptions,
  magnitudeMap,
} from "@/lib/atlas-data"
import { useControl } from "@/components/control/store"
import { RadarPanel, Sparkline, SectionHead, Stat } from "@/components/control/parts"

export default function ControlOverview() {
  const { trajectory, year, setDrawer } = useControl()

  const topDeltas = [...predictions]
    .map((pred) => ({ pred, magnitude: magnitudeMap[pred.divergence] }))
    .sort((a, b) => b.magnitude - a.magnitude)
    .slice(0, 5)

  return (
    <>
      {/* Status overview */}
      <section className="scanlines border-b border-border">
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_minmax(320px,420px)] lg:p-10">
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
              <Activity className="size-3.5" /> Scenario Monitor · live
            </p>
            <h1 className="mt-4 text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Scrub the timeline. Watch domains respond.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Every reading recomputes from the selected year and trajectory. Open any prediction for its
              dependencies and what would falsify it.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              <Stat label="Trajectory" value={trajectories.find((t) => t.id === trajectory)!.short} />
              <Stat label="Year" value={year === 2050 ? "2050+" : String(year)} />
              <Stat label="Domains tracked" value={String(domains.length)} />
              <Stat label="Predictions" value={String(predictions.length)} />
            </div>
          </div>
          <RadarPanel year={year} trajectory={trajectory} />
        </div>
        <p className="border-t border-border px-6 py-2 text-[0.7rem] text-muted-foreground lg:px-10">
          {yearCaptions[year].caption}
        </p>
      </section>

      {/* Top deltas */}
      <section className="border-b border-border p-6 lg:p-10">
        <SectionHead index="02" title="Top deltas" note="what changes most across trajectories" />
        <ol className="mt-6 divide-y divide-border border border-border">
          {topDeltas.map((d, i) => (
            <li key={d.pred.id}>
              <button
                onClick={() => setDrawer(d.pred)}
                className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
              >
                <span className="w-6 shrink-0 text-sm text-muted-foreground">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-sans text-sm">{d.pred.claim}</span>
                  <span className="mt-1 block text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                    {d.pred.domains.map((id) => domains.find((x) => x.id === id)?.name).join(" · ")}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="hidden text-[0.7rem] text-muted-foreground sm:inline">Δ</span>
                  <span className="flex h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                    <span className="h-full bg-primary" style={{ width: `${d.magnitude}%` }} />
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      {/* Events feed */}
      <section className="border-b border-border p-6 lg:p-10">
        <SectionHead index="03" title="Events feed" note="curated milestone sequence" />
        <ul className="mt-6 space-y-3">
          {predictions.map((p) => (
            <li key={p.id} className="grid grid-cols-[auto_1fr] gap-4 border border-border bg-card p-4">
              <div className="flex flex-col items-start">
                <span className="text-xs text-primary">{p.timeWindow.split("–")[0].trim()}</span>
                <span className="mt-1 h-full w-px bg-border" />
              </div>
              <div>
                <p className="font-sans text-sm leading-snug">{p.claim}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-wider">
                  {p.domains.map((id) => (
                    <span key={id} className="rounded border border-border px-1.5 py-0.5 text-muted-foreground">
                      {domains.find((x) => x.id === id)?.name}
                    </span>
                  ))}
                  <button onClick={() => setDrawer(p)} className="ml-auto text-accent hover:underline">
                    open report →
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Domain grid preview */}
      <section className="p-6 lg:p-10">
        <div className="flex items-center justify-between gap-4">
          <SectionHead index="04" title="Explore by domain" note="pressure over 2024 – 2050" />
          <Link href="/control-room/domains" className="text-xs uppercase tracking-wider text-accent hover:underline">
            all domains →
          </Link>
        </div>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {domains.map((d) => (
            <Link key={d.id} href={`/control-room/domains/${d.id}`} className="bg-card p-4 transition-colors hover:bg-secondary/40">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{d.name}</p>
                <span className="text-xs text-primary">{domainPressure(d, year, trajectory)}</span>
              </div>
              <Sparkline domain={d} trajectory={trajectory} activeYear={year} />
              <p className="mt-2 line-clamp-2 text-[0.7rem] leading-snug text-muted-foreground">{d.thesis}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
