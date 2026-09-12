"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ScrollText } from "lucide-react"
import {
  trajectories,
  domains,
  years,
  yearCaptions,
  domainPressure,
  siteMeta,
} from "@/lib/atlas-data"
import { useManuscript } from "./store"

const NAV = [
  { href: "/manuscript", label: "Codex" },
  { href: "/manuscript/atlas", label: "Atlas" },
  { href: "/manuscript/predictions", label: "Marginalia" },
  { href: "/manuscript/trajectories", label: "Codices" },
  { href: "/manuscript/timeline", label: "Chronology" },
  { href: "/manuscript/methods", label: "Colophon" },
]

export function ManuscriptHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/mockups"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3" /> Hub
          </Link>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <Link href="/manuscript" className="hidden font-serif text-sm italic text-muted-foreground sm:inline">
            {siteMeta.name}
          </Link>
        </div>
        <nav className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-widest md:gap-5">
          {NAV.map((n) => {
            const active = n.href === "/manuscript" ? pathname === n.href : pathname.startsWith(n.href)
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`transition-colors hover:text-foreground ${
                  active ? "text-instrument" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-instrument tabular-nums">{value.toString().padStart(2, "0")}</span>
      </div>
      <div className="mt-1 h-1 w-full bg-border">
        <div className="h-full bg-instrument" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

// Persistent sci-fi instrument margin — carries scenario state across the whole codex.
export function InstrumentMargin() {
  const { trajectory, setTrajectory, yearIdx, setYearIdx, year } = useManuscript()
  const caption = yearCaptions[year]

  return (
    <aside className="sticky top-[3.25rem] hidden h-[calc(100vh-3.25rem)] w-72 shrink-0 self-start overflow-y-auto border-l border-border py-10 pl-6 lg:block">
      <div className="hud-ticks hud-panel border border-instrument/40 bg-card p-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-instrument">Instrument margin</p>

        <div className="mt-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Trajectory</p>
          <div className="mt-2 flex flex-col gap-1">
            {trajectories.map((t) => (
              <button
                key={t.id}
                onClick={() => setTrajectory(t.id)}
                className={`hud-panel-sm px-3 py-1.5 text-left font-mono text-[0.7rem] uppercase tracking-wider transition-colors ${
                  trajectory === t.id
                    ? "bg-instrument text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.short}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
            <span>Year</span>
            <span className="text-instrument tabular-nums">{year}</span>
          </div>
          <input
            type="range"
            min={0}
            max={years.length - 1}
            value={yearIdx}
            onChange={(e) => setYearIdx(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--instrument)]"
            aria-label="Scrub year"
          />
          <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-gild">{caption.tag}</p>
        </div>

        <div className="mt-6 space-y-3">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">World-state</p>
          <Meter label="State capacity" value={domainPressure(domains[3], year, trajectory)} />
          <Meter label="Info integrity" value={100 - domainPressure(domains[2], year, trajectory)} />
          <Meter label="Labor shift" value={domainPressure(domains[1], year, trajectory)} />
        </div>

        <div className="mt-6">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Folios</p>
          <div className="mt-2 flex flex-col gap-1">
            {domains.map((d) => (
              <Link
                key={d.id}
                href={`/manuscript/domains/${d.id}`}
                className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                <ScrollText className="size-2.5 text-instrument" />
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 border-t border-border pt-3 font-mono text-[0.55rem] leading-relaxed text-muted-foreground">
          The margin is the instrument. The page is the artifact. Only one layer speaks loudly at a time.
        </p>
      </div>
    </aside>
  )
}

export function FolioLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">{children}</p>
}

// Reusable illuminated plate.
export function Plate({
  src,
  alt,
  allegory,
  ratio = "aspect-[3/4]",
}: {
  src: string
  alt: string
  allegory: string
  ratio?: string
}) {
  return (
    <figure className="parchment gild-frame relative overflow-hidden">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`${ratio} w-full object-cover`}
        crossOrigin="anonymous"
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-background/85 to-transparent p-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-gild">{allegory}</span>
      </div>
    </figure>
  )
}

// Inline instrument reading of a value.
export function Reading({ label, value }: { label: string; value: number }) {
  return (
    <div className="hud-panel-sm border border-border bg-card p-3">
      <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-instrument tabular-nums">{value}</span>
      </div>
      <div className="mt-2 h-1.5 w-full bg-border">
        <div className="h-full bg-instrument" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
