"use client"

/**
 * Instrument-layer primitives (the "thin" cyan HUD).
 * Controlled + content-agnostic: you own the state, these just render it.
 */
import type { ReactNode } from "react"
import { cx } from "./utils"

/** Chamfered HUD panel with corner ticks and an optional title. */
export function InstrumentPanel({
  title,
  children,
  live = false,
  className,
}: {
  title?: string
  children: ReactNode
  /** Adds the scanning sweep animation for "live" telemetry. */
  live?: boolean
  className?: string
}) {
  return (
    <div
      className={cx(
        "hud-ticks hud-panel relative overflow-hidden border border-instrument/40 bg-card p-4",
        live && "hud-sweep",
        className,
      )}
    >
      {title ? (
        <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-instrument">{title}</p>
      ) : null}
      {children}
    </div>
  )
}

/** A labeled measurement bar in the instrument voice. */
export function Meter({
  label,
  value,
  max = 100,
  className,
}: {
  label: string
  value: number
  max?: number
  className?: string
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums text-instrument">{Math.round(value)}</span>
      </div>
      <div className="mt-1 h-1 w-full bg-border">
        <div className="h-full bg-instrument" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

/** Segmented control styled as HUD chips. Generic over the option id type. */
export function InstrumentToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  options: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
  ariaLabel?: string
  className?: string
}) {
  return (
    <div role="group" aria-label={ariaLabel} className={cx("flex flex-col gap-1", className)}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={cx(
            "hud-panel-sm px-3 py-1.5 text-left font-mono text-[0.7rem] uppercase tracking-wider transition-colors",
            value === o.id
              ? "bg-instrument text-primary-foreground"
              : "border border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** A range scrubber with a mono readout and optional caption. */
export function InstrumentScrubber({
  label,
  value,
  min,
  max,
  onChange,
  readout,
  caption,
  className,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  /** What to display as the current value (e.g. a year). Defaults to value. */
  readout?: ReactNode
  caption?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums text-instrument">{readout ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--instrument)]"
        aria-label={label}
      />
      {caption ? (
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-gild">{caption}</p>
      ) : null}
    </div>
  )
}

/** A controlled search field in the instrument voice. */
export function InstrumentSearch({
  value,
  onChange,
  placeholder = "Search…",
  ariaLabel = "Search",
  caption,
  className,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  ariaLabel?: string
  caption?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="hud-panel-sm flex items-center gap-2 border border-instrument/40 bg-background px-3 py-2">
        <span aria-hidden className="font-mono text-xs text-instrument">
          {"⌕"}
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className="w-full bg-transparent font-mono text-xs uppercase tracking-wider text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            {"✕"}
          </button>
        ) : null}
      </div>
      {caption ? (
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-gild">{caption}</p>
      ) : null}
    </div>
  )
}

/** Sticky right-hand instrument margin container. Fill it with panels. */
export function InstrumentMargin({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <aside
      className={cx(
        "sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 self-start overflow-y-auto border-l border-border py-10 pl-6 lg:block",
        className,
      )}
    >
      {children}
    </aside>
  )
}
