"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import {
  trajectories,
  domainArt,
  peakPressure,
  predictionsForDomain,
  divRank,
  siteMeta,
  type Domain,
  type TrajectoryId,
} from "@/lib/atlas-data"
import { useGallery } from "./store"

const NAV = [
  { href: "/gallery", label: "Foyer" },
  { href: "/gallery/rooms", label: "Rooms" },
  { href: "/gallery/predictions", label: "Catalogue" },
  { href: "/gallery/timeline", label: "Timeline" },
  { href: "/gallery/methods", label: "About" },
]

export function GalleryHeader() {
  const pathname = usePathname()
  const { trajectory, setTrajectory } = useGallery()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/mockups"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3" /> Hub
          </Link>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <Link href="/gallery" className="hidden font-serif text-sm italic text-muted-foreground sm:inline">
            {siteMeta.name}
          </Link>
        </div>
        <nav className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-widest md:gap-5">
          {NAV.map((n) => {
            const active = n.href === "/gallery" ? pathname === n.href : pathname.startsWith(n.href)
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`transition-colors hover:text-foreground ${active ? "text-instrument" : "text-muted-foreground"}`}
              >
                {n.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Persistent gallery lighting (scenario) */}
      <div className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2">
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Gallery lighting</span>
          <div className="flex gap-1.5">
            {trajectories.map((t) => (
              <button
                key={t.id}
                onClick={() => setTrajectory(t.id)}
                className={`hud-panel-sm px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
                  trajectory === t.id
                    ? "bg-instrument text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.short}
              </button>
            ))}
          </div>
          <span className="hidden font-serif text-xs italic text-muted-foreground sm:inline">
            {trajectories.find((t) => t.id === trajectory)!.tagline}
          </span>
        </div>
      </div>
    </header>
  )
}

export function GalleryFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        <span>{siteMeta.subtitle}</span>
        <span>Gallery of Futures — mockup</span>
      </div>
    </footer>
  )
}

function timeHeat(domain: Domain, traj: TrajectoryId) {
  const p = peakPressure(domain, traj)
  if (p >= 82) return "2027–2032"
  if (p >= 70) return "2030–2038"
  return "2035–2045"
}

// A framed painting with an on-hover holographic docent plaque.
export function GalleryFrame({ domain, traj }: { domain: Domain; traj: TrajectoryId }) {
  const art = domainArt[domain.id]
  const preds = predictionsForDomain(domain.id)
  const top = preds.slice(0, 2)
  const divergence = Math.max(1, ...preds.map((p) => divRank[p.divergence]))
  const divLabel = divergence >= 3 ? "High" : divergence === 2 ? "Medium" : "Low"
  const peak = peakPressure(domain, traj)

  return (
    <Link href={`/gallery/rooms/${domain.id}`} className="group relative block overflow-hidden bg-black">
      <img
        src={art.src || "/placeholder.svg"}
        alt={`Renaissance allegory of ${domain.name}: ${art.allegory}`}
        className="aspect-[4/5] w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        crossOrigin="anonymous"
      />
      <span className="pointer-events-none absolute inset-2 gild-frame" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-gild">{art.allegory}</p>
        <h3 className="mt-1 font-serif text-2xl font-semibold leading-none text-[oklch(0.95_0.02_82)]">{domain.name}</h3>
      </div>

      <div className="pointer-events-none absolute inset-x-3 top-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="hud-ticks hud-panel-sm hud-scan border border-instrument/60 bg-background/90 p-3 backdrop-blur">
          <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-widest text-instrument">
            <span>Docent readout</span>
            <span className="tabular-nums">PK {peak}</span>
          </div>
          <ul className="mt-2 space-y-1">
            {top.map((p) => (
              <li key={p.id} className="line-clamp-1 font-serif text-xs text-foreground">
                {p.claim}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-mono text-[0.55rem] uppercase tracking-wider">
            <span className="text-muted-foreground">
              Divergence <span className={divLabel === "High" ? "text-destructive" : "text-foreground"}>{divLabel}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-gild">
              <Clock className="size-2.5" />
              {timeHeat(domain, traj)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
