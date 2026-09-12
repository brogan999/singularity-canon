import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArtifactLayout, Folio, FolioLabel, FolioProse, InstrumentMargin, InstrumentPanel, Meter } from "@/manuscript-ds"
import { canon, entryBySlug } from "@/lib/canon-data"
import { loadLeaf, loadManifest, parseLeafParam, leafHref } from "@/lib/canon-body"
import { bodyProse, LeafIndex, LeafNav } from "@/components/canon/reader"

// Leaves render on demand. Prerendering all ~1,600 would add minutes to every
// build and ~100 MB of output, to save milliseconds on a local file read.
export const dynamicParams = true

type Params = { params: Promise<{ slug: string; leaf: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, leaf } = await params
  const entry = entryBySlug(slug)
  const n = parseLeafParam(leaf)
  if (!entry || n === null) return { title: "Not found — The Singularity Canon" }
  const manifest = await loadManifest(slug)
  const label = manifest?.leaves[n - 1]?.label
  return {
    title: `${entry.title} · Leaf ${n}${label ? ` — ${label}` : ""}`,
    description: entry.lead,
  }
}

export default async function LeafPage({ params }: Params) {
  const { slug, leaf } = await params
  const entry = entryBySlug(slug)
  const n = parseLeafParam(leaf)
  if (!entry || n === null) notFound()

  const manifest = await loadManifest(slug)
  if (!manifest || n > manifest.leaves.length) notFound()

  const html = await loadLeaf(slug, n)
  if (html === null) notFound()

  const meta = manifest.leaves[n - 1]
  const total = manifest.leaves.length
  const index = canon.findIndex((e) => e.slug === slug)
  const nextWork = index >= 0 && index < canon.length - 1 ? canon[index + 1].slug : null
  const prevWork = index > 0 ? canon[index - 1].slug : null
  const readThrough = meta.startWord + meta.words

  const margin = (
    <InstrumentMargin>
      <div className="flex flex-col gap-6">
        <InstrumentPanel title="Reading" live>
          <div className="flex flex-col gap-3">
            <Link
              href={`/canon/${slug}`}
              className="font-serif text-sm leading-snug text-foreground transition-colors hover:text-gild"
            >
              {entry.title}
            </Link>
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {entry.author} · {entry.year}
            </p>
            <Meter
              label={`Leaf ${String(n).padStart(3, "0")} of ${String(total).padStart(3, "0")}`}
              value={readThrough}
              max={manifest.words}
            />
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {readThrough.toLocaleString()} / {manifest.words.toLocaleString()} words
            </p>
          </div>
        </InstrumentPanel>
        <LeafIndex manifest={manifest} current={n} />
      </div>
    </InstrumentMargin>
  )

  return (
    <ArtifactLayout margin={margin}>
      <Folio className="border-t-0 pt-2">
        <FolioLabel>
          <Link href={`/canon/${slug}`} className="transition-colors hover:text-foreground">
            {entry.title}
          </Link>
          {meta.label ? <span className="text-instrument"> · {meta.label}</span> : null}
        </FolioLabel>

        <FolioProse dropCap={n === 1} className={`mt-6 ${bodyProse}`}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </FolioProse>

        <LeafNav slug={slug} n={n} total={total} prevWork={prevWork} nextWork={nextWork} />

        {/* The leaf list lives in the margin on wide screens; repeat it here when there isn't one. */}
        <div className="mt-10 lg:hidden">
          <LeafIndex manifest={manifest} current={n} max={260} />
        </div>
      </Folio>
    </ArtifactLayout>
  )
}
