import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  ArtifactLayout,
  Folio,
  FolioLabel,
  FolioProse,
  InstrumentMargin,
  InstrumentPanel,
  Meter,
} from "@/manuscript-ds"
import { canon, entryBySlug, yearExtent } from "@/lib/canon-data"

export function generateStaticParams() {
  return canon.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = entryBySlug(slug)
  if (!entry) return { title: "Not found — The Singularity Canon" }
  return {
    title: `${entry.title} — The Singularity Canon`,
    description: entry.lead,
  }
}

function hostOf(url: string | null) {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export default async function CanonEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = entryBySlug(slug)
  if (!entry) notFound()

  const index = canon.findIndex((e) => e.slug === slug)
  const prev = index > 0 ? canon[index - 1] : null
  const next = index < canon.length - 1 ? canon[index + 1] : null
  const position = index + 1

  const margin = (
    <InstrumentMargin>
      <div className="flex flex-col gap-6">
        <InstrumentPanel title="Catalogue" live>
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Folio</span>
              <span className="tabular-nums text-instrument">
                {String(position).padStart(3, "0")} / {canon.length}
              </span>
            </div>
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              <span>Part</span>
              <span className="text-instrument">{entry.part}</span>
            </div>
            <Meter
              label={`Year ${entry.year}`}
              value={entry.year - yearExtent[0]}
              max={yearExtent[1] - yearExtent[0]}
            />
          </div>
        </InstrumentPanel>

        <InstrumentPanel title="Navigate">
          <div className="flex flex-col gap-2 font-mono text-[0.7rem] uppercase tracking-wider">
            {prev ? (
              <Link href={`/canon/${prev.slug}`} className="text-muted-foreground hover:text-foreground">
                ← {prev.title}
              </Link>
            ) : null}
            {next ? (
              <Link href={`/canon/${next.slug}`} className="text-muted-foreground hover:text-foreground">
                → {next.title}
              </Link>
            ) : null}
            <Link href="/canon" className="mt-1 text-gild hover:text-instrument">
              ↑ Full contents
            </Link>
          </div>
        </InstrumentPanel>
      </div>
    </InstrumentMargin>
  )

  return (
    <ArtifactLayout margin={margin}>
      <Folio className="border-t-0 pt-2">
        <FolioLabel>
          {entry.part} · {entry.partLabel}
        </FolioLabel>
        <h1 className="mt-3 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {entry.author} · <span className="text-instrument">{entry.year}</span>
        </p>
        {entry.src ? (
          <a
            href={entry.src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-mono text-xs text-gild underline decoration-gild/40 underline-offset-4 hover:decoration-gild"
          >
            {hostOf(entry.src)} ↗
          </a>
        ) : null}

        <div className="mt-8">
          <FolioProse dropCap>
            <p>{entry.lead}</p>
          </FolioProse>
        </div>

        <div className="mt-10">
          <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">
            Illuminations
          </p>
          <ul className="flex max-w-prose flex-col gap-4">
            {entry.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gild"
                />
                <span className="font-serif text-lg leading-relaxed text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Foot nav for narrow screens without the margin */}
        <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-5 font-mono text-[0.7rem] uppercase tracking-wider lg:hidden">
          {prev ? (
            <Link href={`/canon/${prev.slug}`} className="text-muted-foreground hover:text-foreground">
              ← Prev
            </Link>
          ) : (
            <span />
          )}
          <Link href="/canon" className="text-gild">
            Contents
          </Link>
          {next ? (
            <Link href={`/canon/${next.slug}`} className="text-muted-foreground hover:text-foreground">
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Folio>
    </ArtifactLayout>
  )
}
