"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
import { siteMeta, trajectories, years } from "@/lib/atlas-data"
import { useAtlas } from "./store"

const nav = [
  { href: "/museum", label: "Home" },
  { href: "/museum/atlas", label: "Atlas" },
  { href: "/museum/predictions", label: "Predictions" },
  { href: "/museum/trajectories", label: "Trajectories" },
  { href: "/museum/timeline", label: "Timeline" },
  { href: "/museum/about", label: "About" },
]

export function MuseumHeader() {
  const pathname = usePathname()
  const { trajectory, setTrajectory, year, setYear } = useAtlas()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-baseline gap-3">
          <Link href="/mockups" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            <span className="sr-only sm:not-sr-only">Mockups</span>
          </Link>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <Link href="/museum">
            <p className="font-serif text-base font-semibold leading-none tracking-tight">{siteMeta.name}</p>
            <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              {siteMeta.subtitle}
            </p>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => {
            const active = n.href === "/museum" ? pathname === "/museum" : pathname.startsWith(n.href)
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`text-sm transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </Link>
            )
          })}
        </nav>
        <button aria-label="Search" className="text-muted-foreground transition-colors hover:text-foreground">
          <Search className="size-4" />
        </button>
      </div>

      {/* Global scenario controls — persist across the whole site */}
      <div className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Trajectory</span>
            <div className="flex rounded-sm border border-border">
              {trajectories.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTrajectory(t.id)}
                  className={`px-2.5 py-1 uppercase tracking-wider transition-colors ${
                    trajectory === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.short}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Year</span>
            <div className="flex gap-1">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`rounded-sm px-2 py-1 tabular-nums transition-colors ${
                    year === y ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {y === 2050 ? "50+" : `'${String(y).slice(2)}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function MuseumFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-wrap gap-6">
          <Link href="/museum/atlas" className="hover:text-foreground">Atlas</Link>
          <Link href="/museum/predictions" className="hover:text-foreground">Predictions</Link>
          <Link href="/museum/trajectories" className="hover:text-foreground">Trajectories</Link>
          <Link href="/museum/about" className="hover:text-foreground">About</Link>
        </div>
        <p className="font-serif italic">A structured library of plausible futures.</p>
      </div>
    </footer>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{children}</p>
}

export function PressureBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <div className="h-full bg-primary" style={{ width: `${value}%` }} />
    </div>
  )
}
