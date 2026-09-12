"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import {
  years,
  domainPressure,
  domainArt,
  predictionsForDomain,
  peakPressure,
  trajectories,
  getDomain,
} from "@/lib/atlas-data"
import { useMonastery } from "@/components/monastery/store"
import { ArchiveHeading } from "@/components/monastery/chrome"

export default function MonasteryDomain() {
  const { id } = useParams<{ id: string }>()
  const { trajectory, year } = useMonastery()
  const domain = getDomain(id)
  if (!domain) return notFound()

  const art = domainArt[domain.id]
  const active = trajectories.find((t) => t.id === trajectory)!
  const preds = predictionsForDomain(domain.id)

  return (
    <div>
      <Link
        href="/monastery/index"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Index
      </Link>

      <div className="mt-4 grid gap-6 md:grid-cols-[200px_1fr]">
        <figure className="parchment relative self-start">
          <img
            src={art.src || "/placeholder.svg"}
            alt={`Allegory plate for ${domain.name}`}
            className="aspect-[3/4] w-full object-cover"
            crossOrigin="anonymous"
          />
          <span className="pointer-events-none absolute inset-2 gild-frame" />
        </figure>
        <div>
          <ArchiveHeading eyebrow={`Subject file · ${art.allegory}`} title={domain.name}>
            {domain.thesis}
          </ArchiveHeading>

          <div className="hud-panel-sm border border-instrument/40 bg-card p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-instrument">
              Pressure log · {active.short}
            </p>
            <div className="mt-3 space-y-1.5">
              {years.map((y) => {
                const v = domainPressure(domain, y, trajectory)
                return (
                  <div key={y} className="flex items-center gap-3">
                    <span className={`w-10 shrink-0 font-mono text-[0.6rem] tabular-nums ${y === year ? "text-instrument" : "text-muted-foreground"}`}>
                      {y}
                    </span>
                    <div className="h-1.5 flex-1 bg-border">
                      <div className={`h-full ${y === year ? "bg-instrument" : "bg-muted-foreground/50"}`} style={{ width: `${v}%` }} />
                    </div>
                    <span className="w-7 shrink-0 text-right font-mono text-[0.6rem] tabular-nums text-muted-foreground">{v}</span>
                  </div>
                )
              })}
            </div>
            <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-widest text-gild">
              Peak {peakPressure(domain, trajectory)} · {active.short}
            </p>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="border-b border-border pb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Entries filed under {domain.name}
        </h2>
        <ul className="mt-2 divide-y divide-border">
          {preds.map((p) => (
            <li key={p.id}>
              <Link href={`/monastery/entries/${p.id}`} className="group flex items-baseline justify-between gap-4 py-3">
                <span className="font-serif text-sm leading-snug group-hover:text-instrument">{p.claim}</span>
                <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">{p.timeWindow}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
