"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArtifactLayout,
  Folio,
  FolioHeading,
  FolioLabel,
  InstrumentMargin,
  InstrumentPanel,
  InstrumentScrubber,
  Meter,
} from "@/manuscript-ds"
import { canon, yearExtent, authorsCount } from "@/lib/canon-data"

const numberBySlug = new Map(canon.map((e, i) => [e.slug, i + 1]))

const decadeOf = (year: number) => Math.floor(year / 10) * 10

export default function CanonChronologyPage() {
  const [through, setThrough] = useState<number>(yearExtent[1])

  const shown = useMemo(() => canon.filter((e) => e.year <= through), [through])

  const decades = useMemo(() => {
    const map = new Map<number, typeof canon>()
    for (const e of [...shown].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title))) {
      const d = decadeOf(e.year)
      if (!map.has(d)) map.set(d, [])
      map.get(d)!.push(e)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [shown])

  const densest = useMemo(() => {
    let best: { decade: number; count: number } | null = null
    for (const [decade, items] of decades) {
      if (!best || items.length > best.count) best = { decade, count: items.length }
    }
    return best
  }, [decades])

  const margin = (
    <InstrumentMargin>
      <div className="flex flex-col gap-6">
        <InstrumentPanel title="Timeline" live>
          <div className="flex flex-col gap-3">
            <Meter label="Works shown" value={shown.length} max={canon.length} />
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Authors</span>
              <span className="tabular-nums text-instrument">{authorsCount}</span>
            </div>
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Eras</span>
              <span className="tabular-nums text-instrument">{decades.length}</span>
            </div>
          </div>
        </InstrumentPanel>

        <InstrumentPanel title="Horizon">
          <InstrumentScrubber
            label="Through year"
            min={yearExtent[0]}
            max={yearExtent[1]}
            value={through}
            onChange={setThrough}
            readout={through}
            caption={`${shown.length} works to ${through}`}
          />
        </InstrumentPanel>

        {densest ? (
          <InstrumentPanel title="Densest era">
            <p className="font-serif text-3xl font-semibold leading-none text-gild">
              The {densest.decade}s
            </p>
            <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              {densest.count} works — the field&apos;s loudest decade so far
            </p>
          </InstrumentPanel>
        ) : null}
      </div>
    </InstrumentMargin>
  )

  return (
    <ArtifactLayout margin={margin}>
      <div className="mb-10">
        <FolioLabel>Chronology</FolioLabel>
        <h1 className="mt-3 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          The Canon by Year
        </h1>
        <p className="mt-4 max-w-prose text-pretty font-serif text-lg italic leading-relaxed text-foreground/80">
          The same {canon.length} sources, unbound from their parts and laid along the century —
          from {yearExtent[0]} to {yearExtent[1]} — so the acceleration is visible at a glance.
        </p>
      </div>

      {decades.map(([decade, items]) => (
        <Folio key={decade}>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <FolioHeading>The {decade}s</FolioHeading>
            <span className="shrink-0 font-mono text-[0.7rem] tabular-nums text-muted-foreground">
              {items.length} {items.length === 1 ? "work" : "works"}
            </span>
          </div>

          <ol className="flex flex-col">
            {items.map((e) => (
              <li key={e.slug} className="border-t border-border first:border-t-0">
                <Link
                  href={`/canon/${e.slug}`}
                  className="group flex items-baseline gap-4 py-3 transition-colors hover:bg-card/60"
                >
                  <span className="w-14 shrink-0 font-mono text-sm tabular-nums text-instrument">
                    {e.year}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-pretty font-serif text-lg font-medium leading-snug group-hover:text-instrument">
                      {e.title}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      {e.author} · <span className="text-gild">{e.part}</span>
                    </p>
                  </div>
                  <span className="hidden shrink-0 font-serif text-lg font-semibold text-gild tabular-nums sm:block">
                    {String(numberBySlug.get(e.slug)).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Folio>
      ))}

      {decades.length === 0 && (
        <p className="py-20 text-center font-mono text-sm uppercase tracking-widest text-muted-foreground">
          No works within this horizon.
        </p>
      )}
    </ArtifactLayout>
  )
}
