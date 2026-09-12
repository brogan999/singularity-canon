"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { domains, domainPressure, predictions, trajectories, siteMeta } from "@/lib/atlas-data"
import { useAtlas } from "@/components/museum/store"
import { SectionLabel, PressureBar } from "@/components/museum/chrome"

export default function MuseumHome() {
  const { trajectory, year } = useAtlas()
  const [hovered, setHovered] = useState<string | null>(null)
  const active = trajectories.find((t) => t.id === trajectory)!

  const topDomains = [...domains]
    .sort((a, b) => domainPressure(b, year, trajectory) - domainPressure(a, year, trajectory))
    .slice(0, 5)

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <SectionLabel>Exhibition</SectionLabel>
          <h1 className="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
            Walk through the futures we think are plausible.
          </h1>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">{siteMeta.blurb}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/museum/trajectories"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start the Guided Tour <span className="opacity-70">12 min</span>
            </Link>
            <Link
              href="/museum/atlas"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
            >
              Explore the Atlas <ArrowRight className="size-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Built from a curated corpus + scenario anchors (AI 2027 / AI 2040-style trajectories).
          </p>
        </div>

        {/* Domain mosaic — links into rooms */}
        <div>
          <div className="grid grid-cols-4 gap-1.5 rounded-sm border border-border bg-card p-1.5">
            {domains.map((d) => {
              const p = domainPressure(d, year, trajectory)
              const isHover = hovered === d.id
              return (
                <Link
                  key={d.id}
                  href={`/museum/domains/${d.id}`}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative aspect-square overflow-hidden rounded-[2px]"
                  style={{ backgroundColor: `color-mix(in oklch, var(--primary) ${Math.round(p * 0.9)}%, var(--card))` }}
                >
                  <span
                    className="absolute inset-x-1 bottom-1 text-[0.6rem] font-medium leading-tight"
                    style={{ color: p > 55 ? "var(--primary-foreground)" : "var(--foreground)" }}
                  >
                    {d.name}
                  </span>
                  {isHover && (
                    <span
                      className="absolute inset-x-1 top-1 font-mono text-[0.55rem]"
                      style={{ color: p > 55 ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
                    >
                      {p}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Click a domain to enter its room · pressure shown at {year} · {active.short}.
          </p>
        </div>
      </section>

      {/* Now showing — top domains at current settings */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionLabel>Now showing</SectionLabel>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl text-balance font-serif text-3xl font-semibold tracking-tight">
              Where the pressure is highest under {active.name}.
            </h2>
            <Link href="/museum/atlas" className="text-sm text-primary hover:underline">
              See all eight rooms →
            </Link>
          </div>
          <ul className="mt-8 space-y-4">
            {topDomains.map((d, i) => {
              const p = domainPressure(d, year, trajectory)
              return (
                <li key={d.id}>
                  <Link href={`/museum/domains/${d.id}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-serif text-lg group-hover:text-primary">{d.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{p}</span>
                      </div>
                      <div className="mt-2"><PressureBar value={p} /></div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Featured placards */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <SectionLabel>Featured placards</SectionLabel>
          <Link href="/museum/predictions" className="text-sm text-primary hover:underline">
            Browse all {predictions.length} →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {predictions.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              href={`/museum/predictions/${p.id}`}
              className="flex flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-primary">{p.timeWindow}</span>
              <h3 className="mt-3 text-balance font-serif text-xl font-semibold leading-snug tracking-tight">{p.claim}</h3>
              <span className="mt-auto pt-5 text-xs uppercase tracking-wider text-muted-foreground">
                Confidence {p.confidence} · Divergence {p.divergence}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
