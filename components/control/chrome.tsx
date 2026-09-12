"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ChevronRight, Radio } from "lucide-react"
import { domains, domainPressure, trajectories, years } from "@/lib/atlas-data"
import { useControl } from "./store"

const nav = [
  { href: "/control-room", label: "Overview" },
  { href: "/control-room/domains", label: "Domains" },
  { href: "/control-room/predictions", label: "Predictions" },
  { href: "/control-room/trajectories", label: "Trajectories" },
  { href: "/control-room/methods", label: "Methods" },
]

const meters = [
  { id: "economy", label: "Economic volatility" },
  { id: "work", label: "Displacement pressure" },
  { id: "politics", label: "State capacity" },
  { id: "security", label: "Conflict risk" },
  { id: "culture", label: "Information integrity" },
  { id: "technology", label: "Autonomy level" },
] as const

export function ControlHeader() {
  const pathname = usePathname()
  const { trajectory, setTrajectory } = useControl()
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            <span className="sr-only sm:not-sr-only">Mockups</span>
          </Link>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <Link href="/control-room" className="flex items-center gap-2">
            <Radio className="size-4 text-primary" />
            <span className="text-sm font-semibold tracking-wide">CONTROL ROOM</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-4 text-xs text-muted-foreground md:flex">
          {nav.map((n) => {
            const active = n.href === "/control-room" ? pathname === "/control-room" : pathname.startsWith(n.href)
            return (
              <Link key={n.href} href={n.href} className={`uppercase tracking-wider hover:text-foreground ${active ? "text-primary" : ""}`}>
                {n.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex rounded-md border border-border p-0.5">
          {trajectories.map((t) => (
            <button
              key={t.id}
              onClick={() => setTrajectory(t.id)}
              className={`rounded px-2.5 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                trajectory === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.short}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export function ControlSidebar() {
  const { trajectory, year, setYear } = useControl()
  return (
    <aside className="sticky top-[49px] hidden h-[calc(100vh-49px)] w-64 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border p-4 lg:flex">
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">World State</p>
        <ul className="mt-3 space-y-3">
          {meters.map((m) => {
            const d = domains.find((x) => x.id === m.id)!
            const p = domainPressure(d, year, trajectory)
            return (
              <li key={m.id}>
                <div className="flex items-center justify-between text-[0.7rem]">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className={p > 70 ? "text-primary" : "text-foreground"}>{p}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full" style={{ width: `${p}%`, backgroundColor: p > 70 ? "var(--primary)" : "var(--accent)" }} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Year</p>
        <div className="mt-3 flex flex-col gap-1">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`flex items-center justify-between rounded px-2.5 py-1.5 text-xs transition-colors ${
                year === y ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <span>{y === 2050 ? "2050+" : y}</span>
              {year === y && <ChevronRight className="size-3.5 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      <nav className="mt-auto flex flex-col gap-1 border-t border-border pt-4 text-xs md:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="rounded px-2.5 py-1.5 uppercase tracking-wider text-muted-foreground hover:bg-secondary/50">
            {n.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
