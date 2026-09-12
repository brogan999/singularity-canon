"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { domains, domainPressure, predictionsForDomain, trajectories } from "@/lib/atlas-data"
import { useControl } from "@/components/control/store"
import { Sparkline, SectionHead } from "@/components/control/parts"

export default function ControlDomains() {
  const { trajectory, year } = useControl()
  const active = trajectories.find((t) => t.id === trajectory)!

  const sorted = [...domains].sort((a, b) => domainPressure(b, year, trajectory) - domainPressure(a, year, trajectory))

  return (
    <div className="p-6 lg:p-10">
      <SectionHead index="D" title="Domains" note={`ranked by pressure · ${active.short} · ${year}`} />
      <div className="mt-6 divide-y divide-border border border-border">
        {sorted.map((d, i) => {
          const p = domainPressure(d, year, trajectory)
          return (
            <Link key={d.id} href={`/control-room/domains/${d.id}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 transition-colors hover:bg-secondary/40">
              <span className="w-6 text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-sans text-sm font-semibold">{d.name}</p>
                  <span className="text-xs text-primary">{p}</span>
                </div>
                <p className="mt-0.5 truncate text-[0.7rem] text-muted-foreground">{d.thesis}</p>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-accent" style={{ width: `${p}%` }} />
                </div>
              </div>
              <span className="flex items-center gap-3">
                <span className="hidden text-[0.65rem] uppercase tracking-wider text-muted-foreground sm:inline">
                  {predictionsForDomain(d.id).length} cards
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </span>
            </Link>
          )
        })}
      </div>

      <p className="mt-8 text-[0.7rem] uppercase tracking-wider text-muted-foreground">Pressure curves · {active.short}</p>
      <div className="mt-3 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
        {domains.map((d) => (
          <div key={d.id} className="bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{d.name}</p>
              <span className="text-xs text-primary">{domainPressure(d, year, trajectory)}</span>
            </div>
            <Sparkline domain={d} trajectory={trajectory} activeYear={year} />
          </div>
        ))}
      </div>
    </div>
  )
}
