"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { ArrowLeft } from "lucide-react"
import {
  getDomain,
  domainPressure,
  predictionsForDomain,
  trajectories,
  years,
  type DomainId,
} from "@/lib/atlas-data"
import { useControl } from "@/components/control/store"
import { Sparkline, SectionHead, Stat } from "@/components/control/parts"

export default function ControlDomainDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const domain = getDomain(id)
  if (!domain) notFound()
  const { trajectory, year, setDrawer } = useControl()
  const active = trajectories.find((t) => t.id === trajectory)!
  const related = predictionsForDomain(domain.id as DomainId)

  return (
    <div className="p-6 lg:p-10">
      <Link href="/control-room/domains" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> All domains
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-accent">Domain readout</p>
          <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight md:text-4xl">{domain.name}</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{domain.thesis}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs">
            <Stat label="Now" value={String(domainPressure(domain, year, trajectory))} />
            <Stat label="Trajectory" value={active.short} />
            <Stat label="Year" value={year === 2050 ? "2050+" : String(year)} />
            <Stat label="Cards" value={String(related.length)} />
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Pressure · {active.short}</p>
          <Sparkline domain={domain} trajectory={trajectory} activeYear={year} />
          <ul className="mt-4 space-y-1.5 text-xs">
            {years.map((y) => (
              <li key={y} className="flex items-center justify-between">
                <span className={y === year ? "text-primary" : "text-muted-foreground"}>{y === 2050 ? "2050+" : y}</span>
                <span className="tabular-nums">{domainPressure(domain, y, trajectory)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trajectory comparison */}
      <section className="mt-10">
        <SectionHead index="·" title="Across trajectories" note={`pressure at ${year}`} />
        <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {trajectories.map((t) => {
            const p = domainPressure(domain, year, t.id)
            return (
              <div key={t.id} className={`bg-card p-4 ${t.id === trajectory ? "ring-1 ring-inset ring-primary" : ""}`}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{t.short}</p>
                <p className="mt-2 font-sans text-2xl font-semibold text-primary">{p}</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-accent" style={{ width: `${p}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Related predictions */}
      <section className="mt-10">
        <SectionHead index="·" title="Predictions in this domain" />
        <ul className="mt-4 space-y-3">
          {related.map((p) => (
            <li key={p.id} className="grid grid-cols-[auto_1fr] gap-4 border border-border bg-card p-4">
              <span className="text-xs text-primary">{p.timeWindow.split("–")[0].trim()}</span>
              <div>
                <p className="font-sans text-sm leading-snug">{p.claim}</p>
                <button onClick={() => setDrawer(p)} className="mt-2 text-[0.7rem] uppercase tracking-wider text-accent hover:underline">
                  open report →
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
