"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import {
  domains,
  years,
  domainPressure,
  domainArt,
  predictionsForDomain,
  trajectories,
  getDomain,
} from "@/lib/atlas-data"
import { useManuscript } from "@/components/manuscript/store"
import { FolioLabel } from "@/components/manuscript/chrome"

export default function ManuscriptDomainFolio() {
  const { id } = useParams<{ id: string }>()
  const { trajectory, year } = useManuscript()
  const domain = getDomain(id)
  if (!domain) return notFound()

  const art = domainArt[domain.id]
  const active = trajectories.find((t) => t.id === trajectory)!
  const related = predictionsForDomain(domain.id)
  const idx = domains.findIndex((d) => d.id === domain.id)
  const prev = domains[(idx - 1 + domains.length) % domains.length]
  const next = domains[(idx + 1) % domains.length]

  return (
    <div>
      <Link
        href="/manuscript/atlas"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Atlas
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <figure className="parchment gild-frame relative overflow-hidden self-start">
          <img
            src={art.src || "/placeholder.svg"}
            alt={`Renaissance allegory of ${domain.name}: ${art.allegory}`}
            className="aspect-[3/4] w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/85 to-transparent p-3">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-gild">{art.allegory}</span>
          </div>
        </figure>

        <div>
          <FolioLabel>Folio {String(idx + 1).padStart(2, "0")}</FolioLabel>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight">{domain.name}</h1>
          <p className="mt-4 font-serif text-lg leading-relaxed">
            <span className="float-left mr-2 mt-1 font-serif text-6xl font-semibold leading-[0.8] text-gild">
              {domain.thesis.charAt(0)}
            </span>
            {domain.thesis.slice(1)}
          </p>

          {/* Pressure across the chronology */}
          <div className="hud-panel-sm mt-6 border border-instrument/40 bg-card p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-instrument">
              Pressure across the chronology · {active.short}
            </p>
            <div className="mt-3 space-y-2">
              {years.map((y) => {
                const v = domainPressure(domain, y, trajectory)
                return (
                  <div key={y} className="flex items-center gap-3">
                    <span className={`w-10 shrink-0 font-mono text-[0.65rem] tabular-nums ${y === year ? "text-instrument" : "text-muted-foreground"}`}>
                      {y}
                    </span>
                    <div className="h-1.5 flex-1 bg-border">
                      <div className={`h-full ${y === year ? "bg-instrument" : "bg-muted-foreground/50"}`} style={{ width: `${v}%` }} />
                    </div>
                    <span className="w-7 shrink-0 text-right font-mono text-[0.65rem] tabular-nums text-muted-foreground">{v}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related marginalia */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-serif text-2xl font-semibold">Related predictions</h2>
        <ul className="mt-4 divide-y divide-border">
          {related.map((p) => (
            <li key={p.id}>
              <Link href={`/manuscript/predictions/${p.id}`} className="group flex items-baseline justify-between gap-4 py-3">
                <span className="font-serif text-base leading-snug group-hover:text-instrument">{p.claim}</span>
                <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                  {p.timeWindow}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Prev / next folio */}
      <nav className="mt-10 flex items-center justify-between border-t border-border pt-6 font-mono text-[0.65rem] uppercase tracking-widest">
        <Link href={`/manuscript/domains/${prev.id}`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-instrument">
          <ArrowLeft className="size-3" /> {prev.name}
        </Link>
        <Link href={`/manuscript/domains/${next.id}`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-instrument">
          {next.name} <ArrowRight className="size-3" />
        </Link>
      </nav>
    </div>
  )
}
