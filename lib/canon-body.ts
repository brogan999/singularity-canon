// Server-side access to the full-text bodies under content/canon/.
//
// Bodies are OPTIONAL by design. They are generated locally by
// `node scripts/parse-canon.mjs <corpus.md> --with-body`, gitignored, and
// never deployed — production ships the summaries only. Every function here
// returns null when they are absent, and the reader degrades to the
// summary view. Import only from Server Components.

import { readFile } from "node:fs/promises"
import path from "node:path"
import { cache } from "react"

export type Leaf = {
  n: number
  label: string
  heading: string | null
  words: number
  startWord: number
}

export type BodyManifest = {
  slug: string
  title: string
  words: number
  headingDepth: number | null
  frontMatterDropped: number
  leaves: Leaf[]
}

/** Slugs reach here from route params, so never interpolate one into a path unchecked. */
const SAFE_SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/

const dirFor = (slug: string) => path.join(process.cwd(), "content", "canon", slug)

export const loadManifest = cache(async (slug: string): Promise<BodyManifest | null> => {
  if (!SAFE_SLUG.test(slug)) return null
  try {
    const m = JSON.parse(await readFile(path.join(dirFor(slug), "manifest.json"), "utf8")) as BodyManifest
    // Shape guard: typescript.ignoreBuildErrors is on, so a stale manifest would
    // otherwise surface as a crash in the reader rather than a caught miss.
    if (!m || !Array.isArray(m.leaves) || m.leaves.length === 0) return null
    return m
  } catch {
    return null
  }
})

/** Pre-rendered HTML for one leaf, or null if the leaf or the corpus is absent. */
export async function loadLeaf(slug: string, n: number): Promise<string | null> {
  if (!SAFE_SLUG.test(slug) || !Number.isInteger(n) || n < 1 || n > 9999) return null
  try {
    return await readFile(path.join(dirFor(slug), `${String(n).padStart(3, "0")}.html`), "utf8")
  } catch {
    return null
  }
}

export const leafHref = (slug: string, n: number) => `/canon/${slug}/${String(n).padStart(3, "0")}`

/** Parse a leaf route segment. Strict: rejects "1", "01", "1e3", "-1". */
export function parseLeafParam(raw: string): number | null {
  if (!/^\d{3,4}$/.test(raw)) return null
  const n = Number(raw)
  return Number.isInteger(n) && n >= 1 ? n : null
}
