"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import {
  getDomain,
  domainPressure,
  predictionsForDomain,
  trajectories,
  years,
  type DomainId,
} from "@/lib/atlas-data"
import { useAtlas } from "@/components/museum/store"
import { SectionLabel, PressureBar } from "@/components/museum/chrome"

export default function DomainDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const domain = getDomain(id)
  if (!domain) notFound()
  const { trajectory, year } = useAtlas()
  const active = trajectories.find((t) => t.id === trajectory)!
  const related = predictionsForDomain(domain.id as DomainId)

  return (
    <article className="mx-auto max-w-4xl px-6 py-14">
      <Link href="/museum/atlas" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Back to the Atlas
      </Link>

      <div className="mt-6">
        <SectionLabel>Exhibit room</SectionLabel>
        <h1 className="mt-3 text-balance font-serif text-4xl font-semibold tracking-tight md:text-5xl">{domain.name}</h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{domain.thesis}</p>
      </div>

      {/* Reading now */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Pressure now</p>
          <p className="mt-2 font-serif text-3xl font-semibold">{domainPressure(domain, year, trajectory)}</p>
          <p className="mt-1 text-xs text-muted-foreground">{active.short} · {year}</p>
          <div className="mt-3"><PressureBar value={domainPressure(domain, year, trajectory)} /></div>
        </div>
        <div className="rounded-sm border border-border bg-card p-5 sm:col-span-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Trajectory over time · {active.short}</p>
          <div className="mt-4 flex items-end gap-2">
            {years.map((y) => {
              const p = domainPressure(domain, y, trajectory)
              return (
                <div key={y} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-24 w-full items-end">
                    <div
                      className="w-full rounded-t-sm bg-primary transition-all"
                      style={{ height: `${p}%`, opacity: y === year ? 1 : 0.4 }}
                    />
                  </div>
                  <span className="font-mono text-[0.6rem] text-muted-foreground">{y === 2050 ? "50+" : `'${String(y).slice(2)}`}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Across trajectories */}
      <div className="mt-8 rounded-sm border border-border bg-card p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Pressure at {year}, across trajectories</p>
        <ul className="mt-4 space-y-3">
          {trajectories.map((t) => {
            const p = domainPressure(domain, year, t.id)
            return (
              <li key={t.id} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3 text-sm">
                <span>{t.short}</span>
                <PressureBar value={p} />
                <span className="text-right font-mono text-xs text-muted-foreground">{p}</span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Predictions filed here */}
      <section className="mt-12">
        <SectionLabel>Filed in this room</SectionLabel>
        <ul className="mt-5 divide-y divide-border border-y border-border">
          {related.map((p) => (
            <li key={p.id}>
              <Link href={`/museum/predictions/${p.id}`} className="group flex items-center gap-4 py-4">
                <span className="font-mono text-xs text-primary">{p.timeWindow}</span>
                <span className="flex-1 font-serif text-lg leading-snug group-hover:text-primary">{p.claim}</span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
          {related.length === 0 && <li className="py-4 text-sm text-muted-foreground">No predictions filed here yet.</li>}
        </ul>
      </section>
    </article>
  )
}
