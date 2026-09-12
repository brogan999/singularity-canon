"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import {
  domains,
  years,
  domainPressure,
  domainArt,
  peakPressure,
  predictionsForDomain,
  trajectories,
  getDomain,
} from "@/lib/atlas-data"
import { useGallery } from "@/components/gallery/store"

export default function GalleryRoom() {
  const { id } = useParams<{ id: string }>()
  const { trajectory, year } = useGallery()
  const domain = getDomain(id)
  if (!domain) return notFound()

  const art = domainArt[domain.id]
  const active = trajectories.find((t) => t.id === trajectory)!
  const preds = predictionsForDomain(domain.id)
  const idx = domains.findIndex((d) => d.id === domain.id)
  const prev = domains[(idx - 1 + domains.length) % domains.length]
  const next = domains[(idx + 1) % domains.length]

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/gallery/rooms"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Rooms
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* The painting */}
        <div className="relative self-start">
          <img
            src={art.src || "/placeholder.svg"}
            alt={`Renaissance allegory of ${domain.name}: ${art.allegory}`}
            className="aspect-[4/5] w-full object-cover"
            crossOrigin="anonymous"
          />
          <span className="pointer-events-none absolute inset-2 gild-frame" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-gild">{art.allegory}</p>
          </div>
        </div>

        {/* Wall text */}
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">
            Room {String(idx + 1).padStart(2, "0")}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight tracking-tight">{domain.name}</h1>
          <p className="mt-4 font-serif text-lg italic leading-relaxed text-muted-foreground">{domain.thesis}</p>

          {/* Docent readout */}
          <div className="hud-ticks hud-panel-sm mt-6 border border-instrument/50 bg-card p-4">
            <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-widest text-instrument">
              <span>Docent readout · {active.short}</span>
              <span className="inline-flex items-center gap-1 text-gild">
                <Clock className="size-2.5" /> Peak {peakPressure(domain, trajectory)}
              </span>
            </div>
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
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Works in this room */}
      <section className="mt-12">
        <h2 className="border-b border-border pb-2 font-serif text-2xl font-semibold">Works in this room</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {preds.map((p) => (
            <Link
              key={p.id}
              href={`/gallery/predictions/${p.id}`}
              className="group hud-panel-sm border border-border bg-card/40 p-4 transition-colors hover:border-instrument/50"
            >
              <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                <span className="text-instrument">{p.timeWindow}</span>
                <span className={p.divergence === "High" ? "text-destructive" : ""}>Div {p.divergence}</span>
              </div>
              <p className="mt-2 font-serif text-base leading-snug group-hover:text-instrument">{p.claim}</p>
            </Link>
          ))}
        </div>
      </section>

      <nav className="mt-10 flex items-center justify-between border-t border-border pt-6 font-mono text-[0.65rem] uppercase tracking-widest">
        <Link href={`/gallery/rooms/${prev.id}`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-instrument">
          <ArrowLeft className="size-3" /> {prev.name}
        </Link>
        <Link href={`/gallery/rooms/${next.id}`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-instrument">
          {next.name} <ArrowRight className="size-3" />
        </Link>
      </nav>
    </div>
  )
}
