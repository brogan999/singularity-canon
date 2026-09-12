"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, BookMarked } from "lucide-react"
import {
  trajectories,
  domains,
  years,
  yearCaptions,
  domainPressure,
} from "@/lib/atlas-data"
import { useMonastery } from "./store"

const NAV = [
  { href: "/monastery", label: "Start Here" },
  { href: "/monastery/index", label: "Index" },
  { href: "/monastery/timeline", label: "Chronicle" },
  { href: "/monastery/compare", label: "Compare" },
  { href: "/monastery/methods", label: "Colophon" },
]

export function TopStrip() {
  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-2">
      <Link
        href="/mockups"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Hub
      </Link>
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-instrument">
        Archive terminal · online
      </span>
    </div>
  )
}

export function LeftNav() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 hidden h-screen w-44 shrink-0 flex-col justify-between border-r border-border bg-card py-6 md:flex">
      <div>
        <div className="px-4">
          <BookMarked className="size-5 text-gild" />
          <p className="mt-3 font-serif text-sm font-semibold leading-tight">The Archive</p>
          <p className="font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
            of the Singularity
          </p>
        </div>
        <ul className="mt-8 flex flex-col">
          {NAV.map((item) => {
            const active = item.href === "/monastery" ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block w-full border-l-2 px-4 py-2.5 text-left font-mono text-[0.7rem] uppercase tracking-widest transition-colors ${
                    active
                      ? "border-l-instrument bg-secondary text-foreground"
                      : "border-l-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="px-4 font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">
        v1.3 · amended
      </p>
    </nav>
  )
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-instrument tabular-nums">{value}</span>
      </div>
      <div className="mt-1 h-1 w-full bg-border">
        <div className="h-full bg-instrument" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function TerminalStrip() {
  const { trajectory, setTrajectory, yearIdx, setYearIdx, year } = useMonastery()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 self-start overflow-y-auto border-l border-border bg-card px-4 py-6 xl:block">
      <div className="hud-ticks hud-panel hud-sweep relative border border-instrument/40 bg-background/60 p-4">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-instrument">Terminal strip</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">Year</p>
            <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">{year}</p>
          </div>
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground">Trajectory</p>
            <p className="font-mono text-2xl font-semibold uppercase text-instrument">{active.short}</p>
          </div>
        </div>
        <p className="mt-2 font-serif text-xs italic leading-snug text-muted-foreground">
          {yearCaptions[year].caption}
        </p>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={years.length - 1}
          value={yearIdx}
          onChange={(e) => setYearIdx(Number(e.target.value))}
          className="w-full accent-[var(--instrument)]"
          aria-label="Scrub year"
        />
        <div className="flex justify-between font-mono text-[0.5rem] text-muted-foreground">
          {years.map((y) => (
            <span key={y}>{String(y).slice(2)}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1">
        {trajectories.map((t) => (
          <button
            key={t.id}
            onClick={() => setTrajectory(t.id)}
            className={`hud-panel-sm px-3 py-1.5 text-left font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
              trajectory === t.id
                ? "bg-instrument text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.short}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <p className="font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground">World-state meters</p>
        <Meter label="State capacity" value={domainPressure(domains[3], year, trajectory)} />
        <Meter label="Info integrity" value={100 - domainPressure(domains[2], year, trajectory)} />
        <Meter label="Labor displacement" value={domainPressure(domains[1], year, trajectory)} />
      </div>

      <p className="mt-6 border-t border-border pt-3 font-mono text-[0.55rem] leading-relaxed text-muted-foreground">
        Changelog v1.3 — amended labor-displacement window after new task-exposure data.
      </p>
    </aside>
  )
}

export function ArchiveHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-6">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-instrument">{eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold leading-none tracking-tight md:text-5xl">{title}</h1>
      {children && <div className="mt-3 max-w-xl font-serif text-base italic leading-relaxed text-muted-foreground">{children}</div>}
    </header>
  )
}
