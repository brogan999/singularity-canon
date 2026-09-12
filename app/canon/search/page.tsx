import Link from "next/link"
import type { Metadata } from "next"
import { ArtifactLayout, Folio, FolioHeading, FolioLabel, InstrumentMargin, InstrumentPanel, Meter } from "@/manuscript-ds"
import { canon } from "@/lib/canon-data"
import { leafHref } from "@/lib/canon-body"
import { bodiesPresent, searchBodies } from "@/lib/canon-search"

export const metadata: Metadata = { title: "Search the texts — The Singularity Canon" }

// Depends on ?q= and on files outside the bundle.
export const dynamic = "force-dynamic"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = "" } = await searchParams
  const query = q.trim()
  const present = await bodiesPresent()
  const hits = present && query ? await searchBodies(query) : []
  const works = new Set(hits.map((h) => h.slug)).size
  const matches = hits.reduce((s, h) => s + h.count, 0)
  const totalWords = canon.reduce((s, e) => s + (e.wordCount ?? 0), 0)

  const margin = (
    <InstrumentMargin>
      <div className="flex flex-col gap-6">
        <InstrumentPanel title="Scan" live>
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Corpus</span>
              <span className="tabular-nums text-instrument">{(totalWords / 1e6).toFixed(2)}M words</span>
            </div>
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Leaves hit</span>
              <span className="tabular-nums text-instrument">{hits.length}</span>
            </div>
            <Meter label={`${works} of ${canon.length} works`} value={works} max={canon.length} />
          </div>
        </InstrumentPanel>
        <InstrumentPanel title="Navigate">
          <div className="flex flex-col gap-2 font-mono text-[0.7rem] uppercase tracking-wider">
            <Link href="/canon" className="text-gild hover:text-instrument">
              ↑ Full contents
            </Link>
            <Link href="/canon/chronology" className="text-muted-foreground hover:text-foreground">
              → Chronology
            </Link>
          </div>
        </InstrumentPanel>
      </div>
    </InstrumentMargin>
  )

  return (
    <ArtifactLayout margin={margin}>
      <Folio className="border-t-0 pt-2">
        <FolioLabel>Concordance</FolioLabel>
        <FolioHeading as="h1">{query ? <>“{query}”</> : "Search the texts"}</FolioHeading>

        {!present ? (
          <p className="mt-6 max-w-prose border-l-2 border-border pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Full-text search runs against the local corpus, which is not part of the published
            edition. The contents page searches every summary.
          </p>
        ) : !query ? (
          <p className="mt-6 max-w-prose font-serif text-lg text-foreground/80">
            Search from the contents page to scan all {(totalWords / 1e6).toFixed(1)} million words.
          </p>
        ) : hits.length === 0 ? (
          <p className="mt-6 max-w-prose font-serif text-lg text-foreground/80">
            Nothing in the texts matches “{query}”.
          </p>
        ) : (
          <>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
              {matches.toLocaleString()} {matches === 1 ? "match" : "matches"} · {hits.length}{" "}
              {hits.length === 1 ? "leaf" : "leaves"} · {works} {works === 1 ? "work" : "works"}
            </p>
            <ol className="mt-8 flex flex-col gap-8">
              {hits.map((h) => (
                <li key={`${h.slug}-${h.leaf}`} className="border-t border-border pt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link
                      href={leafHref(h.slug, h.leaf)}
                      className="font-serif text-lg font-semibold leading-snug transition-colors hover:text-gild"
                    >
                      {h.title}
                    </Link>
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-instrument">
                      Leaf {String(h.leaf).padStart(3, "0")} · {h.count}×
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {h.label}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {h.snippets.map((s, i) => (
                      <li key={i} className="border-l-2 border-gild/40 pl-4 font-serif text-[0.95rem] leading-relaxed text-foreground/75">
                        {s}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </>
        )}
      </Folio>
    </ArtifactLayout>
  )
}
