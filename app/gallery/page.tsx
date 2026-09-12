"use client"

import Link from "next/link"
import { domains, trajectories, siteMeta } from "@/lib/atlas-data"
import { useGallery } from "@/components/gallery/store"
import { GalleryFrame } from "@/components/gallery/chrome"

export default function GalleryFoyer() {
  const { trajectory } = useGallery()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">
              {siteMeta.name} — Gallery of Futures
            </p>
            <h1 className="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
              Enter the Gallery of Futures
            </h1>
            <p className="mt-5 max-w-md text-pretty font-serif text-lg italic leading-relaxed text-muted-foreground">
              Each painting is a cluster of predictions. The future is the docent — approach a frame and
              its holographic plaque speaks.
            </p>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-widest text-gild">
              Lighting: {active.short} · {domains.length} rooms
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/gallery/rooms"
                className="hud-panel-sm bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground"
              >
                Walk the rooms
              </Link>
              <Link
                href="/gallery/predictions"
                className="hud-panel-sm border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest"
              >
                Browse catalogue
              </Link>
            </div>
          </div>

          {/* Featured wall */}
          <div className="grid grid-cols-3 gap-3">
            {domains.slice(0, 3).map((d) => (
              <GalleryFrame key={d.id} domain={d} traj={trajectory} />
            ))}
          </div>
        </div>
      </section>

      {/* Full wall preview */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-serif text-2xl font-semibold">The main hall</h2>
          <Link href="/gallery/rooms" className="font-mono text-[0.65rem] uppercase tracking-widest text-instrument hover:underline">
            Enter all rooms ▸
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {domains.map((d) => (
            <GalleryFrame key={d.id} domain={d} traj={trajectory} />
          ))}
        </div>
      </section>
    </div>
  )
}
