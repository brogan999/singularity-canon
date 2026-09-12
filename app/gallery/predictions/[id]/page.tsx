"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getPrediction, domains, domainArt, trajectories, getDomain } from "@/lib/atlas-data"
import { useGallery } from "@/components/gallery/store"

export default function GalleryPlacard() {
  const { id } = useParams<{ id: string }>()
  const { trajectory } = useGallery()
  const p = getPrediction(id)
  if (!p) return notFound()
  const art = domainArt[p.domains[0]]

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/gallery/predictions"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Catalogue
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Framed work */}
        <div className="relative self-start">
          <img
            src={art.src || "/placeholder.svg"}
            alt={`Renaissance allegory: ${art.allegory}`}
            className="aspect-[4/5] w-full object-cover"
            crossOrigin="anonymous"
          />
          <span className="pointer-events-none absolute inset-2 gild-frame" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-gild">{art.allegory}</p>
          </div>
        </div>

        {/* Placard */}
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-instrument">{p.timeWindow}</p>
          <h1 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {p.claim}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2 font-mono text-[0.6rem] uppercase tracking-widest">
            <span className="hud-panel-sm border border-border px-2 py-1 text-muted-foreground">Conf · {p.confidence}</span>
            <span className={`hud-panel-sm border border-border px-2 py-1 ${p.divergence === "High" ? "text-destructive" : "text-muted-foreground"}`}>
              Div · {p.divergence}
            </span>
            {p.domains.map((d) => (
              <Link key={d} href={`/gallery/rooms/${d}`} className="hud-panel-sm border border-border px-2 py-1 text-instrument hover:underline">
                {getDomain(d)?.name}
              </Link>
            ))}
          </div>

          {/* Impact bars */}
          <div className="mt-6">
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-gild">Impact by room</p>
            <div className="mt-3 space-y-2">
              {Object.entries(p.impacts).map(([did, v]) => (
                <div key={did}>
                  <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    <span>{domains.find((x) => x.id === did)?.name}</span>
                    <span className="text-instrument tabular-nums">{v}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-border">
                    <div className="h-full bg-instrument" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence + counter */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-gild">Evidence</p>
              <ul className="mt-2 space-y-2">
                {p.evidence.map((e, i) => (
                  <li key={i} className="flex gap-2 font-serif text-sm leading-relaxed text-muted-foreground">
                    <span className="font-mono text-xs text-instrument">{i + 1}.</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-gild">What would falsify it</p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">{p.counter}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Under each lighting */}
      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-serif text-2xl font-semibold">Under each lighting</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {trajectories.map((t) => {
            const on = t.id === trajectory
            return (
              <div key={t.id} className={`hud-panel-sm border p-4 ${on ? "border-instrument bg-card" : "border-border"}`}>
                <p className={`font-mono text-[0.6rem] uppercase tracking-widest ${on ? "text-instrument" : "text-muted-foreground"}`}>
                  {t.short} {on && "· active"}
                </p>
                <p className="mt-2 font-serif text-sm leading-relaxed">{p.delta[t.id]}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
