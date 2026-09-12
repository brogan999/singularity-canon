"use client"

import { useMemo } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import {
  domains,
  domainPressure,
  trajectories,
  years,
  type Domain,
  type Prediction,
  type TrajectoryId,
} from "@/lib/atlas-data"
import { useControl } from "./store"

export function SectionHead({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span className="text-xs text-muted-foreground">{index}</span>
      <h2 className="font-sans text-xl font-semibold tracking-tight">{title}</h2>
      {note && <span className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">— {note}</span>}
    </div>
  )
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border px-3 py-2">
      <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm text-primary">{value}</p>
    </div>
  )
}

export function RadarPanel({ year, trajectory }: { year: number; trajectory: TrajectoryId }) {
  const size = 300
  const c = size / 2
  const r = c - 44
  const n = domains.length

  const points = useMemo(() => {
    return domains.map((d, i) => {
      const angle = (-90 + (360 / n) * i) * (Math.PI / 180)
      const v = domainPressure(d, year, trajectory) / 100
      return {
        x: c + r * v * Math.cos(angle),
        y: c + r * v * Math.sin(angle),
        ax: c + r * Math.cos(angle),
        ay: c + r * Math.sin(angle),
        lx: c + (r + 20) * Math.cos(angle),
        ly: c + (r + 20) * Math.sin(angle),
        name: d.name,
      }
    })
  }, [year, trajectory, c, r, n])

  const poly = points.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="mb-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Domain pressure radar</p>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full" role="img" aria-label="Domain pressure radar">
        {[0.25, 0.5, 0.75, 1].map((ring) => (
          <circle key={ring} cx={c} cy={c} r={r * ring} fill="none" stroke="var(--border)" strokeWidth={1} />
        ))}
        {points.map((p, i) => (
          <line key={i} x1={c} y1={c} x2={p.ax} y2={p.ay} stroke="var(--border)" strokeWidth={1} />
        ))}
        <polygon points={poly} fill="color-mix(in oklch, var(--primary) 22%, transparent)" stroke="var(--primary)" strokeWidth={1.5} />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="var(--primary)" />
        ))}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.lx}
            y={p.ly}
            fontSize={7}
            fill="var(--muted-foreground)"
            textAnchor={p.lx > c + 4 ? "start" : p.lx < c - 4 ? "end" : "middle"}
            dominantBaseline="middle"
          >
            {p.name.split(" ")[0]}
          </text>
        ))}
      </svg>
    </div>
  )
}

export function Sparkline({
  domain,
  trajectory,
  activeYear,
}: {
  domain: Domain
  trajectory: TrajectoryId
  activeYear: number
}) {
  const w = 200
  const h = 44
  const vals = years.map((y) => domainPressure(domain, y, trajectory))
  const path = vals
    .map((v, i) => {
      const x = (i / (vals.length - 1)) * w
      const y = h - (v / 100) * h
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  const activeIdx = years.indexOf(activeYear as (typeof years)[number])
  const ax = (activeIdx / (vals.length - 1)) * w
  const ay = h - (vals[activeIdx] / 100) * h

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-11 w-full" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${path} L${w},${h} L0,${h} Z`} fill="color-mix(in oklch, var(--accent) 14%, transparent)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      <circle cx={ax} cy={ay} r={3} fill="var(--primary)" />
    </svg>
  )
}

export function EventDrawer() {
  const { drawer: pred, trajectory, setDrawer } = useControl()
  if (!pred) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close" className="absolute inset-0 bg-black/50" onClick={() => setDrawer(null)} />
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary">{pred.timeWindow}</p>
            <h3 className="mt-2 font-sans text-lg font-semibold leading-snug">{pred.claim}</h3>
          </div>
          <button onClick={() => setDrawer(null)} aria-label="Close report" className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4 flex gap-2 text-[0.65rem] uppercase tracking-wider">
          <span className="rounded border border-border px-2 py-1 text-muted-foreground">Conf: {pred.confidence}</span>
          <span className="rounded border border-border px-2 py-1 text-muted-foreground">Div: {pred.divergence}</span>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-accent">Involved domains</p>
          <ul className="mt-3 space-y-2">
            {Object.entries(pred.impacts).map(([id, v]) => (
              <li key={id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-sans">{domains.find((x) => x.id === id)?.name}</span>
                  <span className="text-xs text-muted-foreground">{v}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${v}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-accent">Under {trajectories.find((t) => t.id === trajectory)!.short}</p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{pred.delta[trajectory]}</p>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-accent">What would falsify it</p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{pred.counter}</p>
        </div>

        <Link
          href={`/control-room/predictions/${pred.id}`}
          className="mt-8 rounded-md bg-primary px-4 py-2.5 text-center text-xs uppercase tracking-wider text-primary-foreground"
        >
          Open full report →
        </Link>
      </div>
    </div>
  )
}
