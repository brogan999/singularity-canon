import Link from "next/link"
import { InstrumentPanel } from "@/manuscript-ds"
import { leafHref, type BodyManifest } from "@/lib/canon-body"

/**
 * Typography for corpus body HTML.
 *
 * Passed to FolioProse's existing `className`, so the design system stays
 * untouched: FolioProse supplies the measure, serif face and leading, and
 * these descendant rules cover the elements it doesn't style. Tokens only —
 * `gild`, `border`, `instrument` — so body text inherits the theme.
 */
export const bodyProse = [
  "[&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
  "[&_h3]:mt-9 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground",
  "[&_h4]:mt-7 [&_h4]:font-serif [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground",
  "[&_h5]:mt-6 [&_h5]:font-mono [&_h5]:text-xs [&_h5]:uppercase [&_h5]:tracking-[0.2em] [&_h5]:text-instrument",
  "[&_p]:mt-4",
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-gild/50 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-foreground/80",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5",
  "[&_a]:text-gild [&_a]:underline [&_a]:decoration-gild/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-gild",
  "[&_strong]:font-semibold [&_strong]:text-foreground [&_em]:italic",
  "[&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border",
  "[&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-instrument",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-border [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs",
  // Tables come out of the epub/PDF conversions; keep them scrollable, not squashed.
  "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:font-mono [&_table]:text-sm",
  "[&_th]:border-b [&_th]:border-gild/40 [&_th]:py-1.5 [&_th]:text-left [&_th]:font-semibold",
  "[&_td]:border-t [&_td]:border-border [&_td]:py-1.5 [&_td]:pr-4 [&_td]:align-top",
  "[&_img]:my-6 [&_img]:max-w-full",
].join(" ")

/** The leaf table of contents. Server-rendered; ~6 KB even for the 126-leaf work. */
export function LeafIndex({
  manifest,
  current,
  max = 400,
}: {
  manifest: BodyManifest
  current?: number
  max?: number
}) {
  return (
    <InstrumentPanel title={`Leaves · ${manifest.leaves.length}`}>
      <ol
        className="flex flex-col gap-1.5 overflow-y-auto pr-1 font-mono text-[0.65rem] uppercase tracking-wider"
        style={{ maxHeight: max }}
      >
        {manifest.leaves.map((l) => {
          const active = l.n === current
          return (
            <li key={l.n}>
              <Link
                href={leafHref(manifest.slug, l.n)}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex gap-2 text-instrument"
                    : "flex gap-2 text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                <span className="tabular-nums opacity-60">{String(l.n).padStart(3, "0")}</span>
                <span className="min-w-0 flex-1 truncate normal-case">{l.label}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </InstrumentPanel>
  )
}

/** Foot navigation within a work, with the cross-work step at either end. */
export function LeafNav({
  slug,
  n,
  total,
  prevWork,
  nextWork,
}: {
  slug: string
  n: number
  total: number
  prevWork: string | null
  nextWork: string | null
}) {
  const back = n > 1 ? leafHref(slug, n - 1) : `/canon/${slug}`
  const backLabel = n > 1 ? `← Leaf ${String(n - 1).padStart(3, "0")}` : "← Frontispiece"
  const fwd = n < total ? leafHref(slug, n + 1) : nextWork ? `/canon/${nextWork}` : null
  const fwdLabel = n < total ? `Leaf ${String(n + 1).padStart(3, "0")} →` : "Next work →"

  return (
    <nav className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-5 font-mono text-[0.7rem] uppercase tracking-wider">
      <Link href={back} className="text-muted-foreground transition-colors hover:text-foreground">
        {backLabel}
      </Link>
      <span className="tabular-nums text-instrument">
        {String(n).padStart(3, "0")} / {String(total).padStart(3, "0")}
      </span>
      {fwd ? (
        <Link href={fwd} className="text-muted-foreground transition-colors hover:text-foreground">
          {fwdLabel}
        </Link>
      ) : (
        <Link href="/canon" className="text-gild">
          Contents
        </Link>
      )}
    </nav>
  )
}

/** Shown in place of the body when the local corpus isn't present (i.e. in production). */
export function BodyAbsentNote() {
  return (
    <p className="mt-10 max-w-prose border-l-2 border-border pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
      Full text is not included in the published edition. This copy carries the catalogue and the
      summaries; the complete work is available in the local edition.
    </p>
  )
}
