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
  InstrumentSearch,
  InstrumentToggle,
  Meter,
} from "@/manuscript-ds"
import {
  canon,
  parts,
  yearExtent,
  authorsCount,
  compiledFor,
  compiledOn,
  hasBodies,
} from "@/lib/canon-data"

const numberBySlug = new Map(canon.map((e, i) => [e.slug, i + 1]))

function EntryRow({
  entry: e,
  showPart = false,
}: {
  entry: (typeof canon)[number]
  showPart?: boolean
}) {
  return (
    <li className="border-t border-border first:border-t-0">
      <Link href={`/canon/${e.slug}`} className="group flex gap-4 py-4 transition-colors hover:bg-card/60">
        <span className="mt-0.5 w-10 shrink-0 font-serif text-2xl font-semibold leading-none text-gild tabular-nums">
          {String(numberBySlug.get(e.slug)).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-pretty font-serif text-xl font-medium leading-snug group-hover:text-instrument">
            {e.title}
          </p>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
            {e.author} · {e.year}
            {showPart ? <span className="text-gild"> · {e.part}</span> : null}
          </p>
          <p className="mt-2 line-clamp-2 max-w-prose text-sm leading-relaxed text-foreground/75">{e.lead}</p>
        </div>
      </Link>
    </li>
  )
}

export default function CanonContentsPage() {
  const [lens, setLens] = useState<string>("all")
  const [through, setThrough] = useState<number>(yearExtent[1])
  const [query, setQuery] = useState<string>("")

  const q = query.trim().toLowerCase()
  const searching = q.length > 0

  const shown = useMemo(
    () =>
      canon.filter((e) => {
        if (lens !== "all" && e.part !== lens) return false
        if (e.year > through) return false
        if (!q) return true
        const haystack = `${e.title} ${e.author} ${e.year} ${e.lead} ${e.bullets.join(" ")}`.toLowerCase()
        return haystack.includes(q)
      }),
    [lens, through, q],
  )

  const grouped = useMemo(
    () =>
      parts
        .filter((p) => lens === "all" || p.id === lens)
        .map((p) => ({ part: p, items: shown.filter((e) => e.part === p.id) }))
        .filter((g) => g.items.length > 0),
    [shown, lens],
  )

  const lensOptions = [
    { id: "all", label: "All parts" },
    ...parts.map((p) => ({ id: p.id, label: `${p.id.replace("Part ", "P")} · ${p.label}` })),
  ]

  const margin = (
    <InstrumentMargin>
      <div className="flex flex-col gap-6">
        <InstrumentPanel title="Corpus" live>
          <div className="flex flex-col gap-3">
            <Meter label="Sources shown" value={shown.length} max={canon.length} />
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Authors</span>
              <span className="tabular-nums text-instrument">{authorsCount}</span>
            </div>
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Span</span>
              <span className="tabular-nums text-instrument">
                {yearExtent[0]}–{through}
              </span>
            </div>
          </div>
        </InstrumentPanel>

        <InstrumentPanel title="Find">
          <InstrumentSearch
            value={query}
            onChange={setQuery}
            placeholder="Title, author, idea…"
            ariaLabel="Search the canon"
            caption={searching ? `${shown.length} ${shown.length === 1 ? "match" : "matches"}` : undefined}
          />
          {searching && hasBodies ? (
            <Link
              href={`/canon/search?q=${encodeURIComponent(query.trim())}`}
              className="mt-3 inline-block font-mono text-[0.65rem] uppercase tracking-wider text-gild transition-colors hover:text-instrument"
            >
              Search inside the texts →
            </Link>
          ) : null}
        </InstrumentPanel>

        <InstrumentPanel title="Lens">
          <InstrumentToggle options={lensOptions} value={lens} onChange={setLens} ariaLabel="Filter by part" />
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
      </div>
    </InstrumentMargin>
  )

  return (
    <ArtifactLayout margin={margin}>
      {/* Title page */}
      <div className="parchment gild-frame mb-10 px-6 py-14 text-center">
        <FolioLabel className="justify-center">Compiled {compiledOn}</FolioLabel>
        <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          The Singularity Canon
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty font-serif text-lg italic leading-relaxed text-foreground/80">
          What happens next: the best forecasts, arguments, and fiction, gathered into one
          illuminated volume.
        </p>
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-instrument">
          {canon.length} sources · Personal reference copy for {compiledFor}
        </p>
      </div>

      {searching ? (
        shown.length > 0 ? (
          <Folio>
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <div>
                <FolioLabel>Search</FolioLabel>
                <FolioHeading className="mt-1">Results for “{query.trim()}”</FolioHeading>
              </div>
              <span className="shrink-0 font-mono text-[0.7rem] tabular-nums text-muted-foreground">
                {shown.length} {shown.length === 1 ? "match" : "matches"}
              </span>
            </div>
            <ol className="flex flex-col">
              {shown.map((e) => (
                <EntryRow key={e.slug} entry={e} showPart />
              ))}
            </ol>
          </Folio>
        ) : (
          <p className="py-20 text-center font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Nothing in the canon matches “{query.trim()}”.
          </p>
        )
      ) : (
        <>
          {grouped.map(({ part, items }) => (
            <Folio key={part.id}>
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <div>
                  <FolioLabel>{part.id}</FolioLabel>
                  <FolioHeading className="mt-1">{part.label}</FolioHeading>
                </div>
                <span className="shrink-0 font-mono text-[0.7rem] tabular-nums text-muted-foreground">
                  {items.length} {items.length === 1 ? "work" : "works"}
                </span>
              </div>
              <ol className="flex flex-col">
                {items.map((e) => (
                  <EntryRow key={e.slug} entry={e} />
                ))}
              </ol>
            </Folio>
          ))}

          {grouped.length === 0 && (
            <p className="py-20 text-center font-mono text-sm uppercase tracking-widest text-muted-foreground">
              No works within this horizon.
            </p>
          )}
        </>
      )}
    </ArtifactLayout>
  )
}
