// Full-text search across the local corpus bodies.
//
// A linear scan, deliberately. The corpus is ~24 MB of text on one machine:
// held in memory it answers in tens of milliseconds, needs no index, no build
// step and no dependency. An inverted index would be larger than the thing it
// indexes and would need stemming and positions to beat this.
//
// ponytail: linear regex scan over ~24 MB held in memory (~50 MB RSS).
// Build a real index only when that stops being fast enough.

import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import type { BodyManifest } from "./canon-body"

export type Hit = {
  slug: string
  title: string
  leaf: number
  label: string
  count: number
  snippets: string[]
}

type Doc = { slug: string; title: string; leaf: number; label: string; text: string }

const ROOT = path.join(process.cwd(), "content", "canon")

let corpus: Doc[] | null = null
let loading: Promise<Doc[]> | null = null

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
}

/** Strip tags and decode the handful of entities marked emits. */
function toText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(nbsp|amp|lt|gt|quot|#39|hellip|mdash|ndash|rsquo|lsquo|ldquo|rdquo);/g, (_, e: string) => ENTITIES[e] ?? " ")
    .replace(/\s+/g, " ")
    .trim()
}

async function load(): Promise<Doc[]> {
  const docs: Doc[] = []
  let slugs: string[]
  try {
    slugs = await readdir(ROOT)
  } catch {
    return docs // no local corpus — the published edition
  }
  for (const slug of slugs) {
    let manifest: BodyManifest
    try {
      manifest = JSON.parse(await readFile(path.join(ROOT, slug, "manifest.json"), "utf8"))
    } catch {
      continue
    }
    if (!Array.isArray(manifest.leaves)) continue
    for (const leaf of manifest.leaves) {
      try {
        const html = await readFile(path.join(ROOT, slug, `${String(leaf.n).padStart(3, "0")}.html`), "utf8")
        docs.push({ slug, title: manifest.title, leaf: leaf.n, label: leaf.label, text: toText(html) })
      } catch {
        /* a missing leaf shouldn't sink the whole index */
      }
    }
  }
  return docs
}

/** Loaded once per process, on first search. */
function corpusOnce(): Promise<Doc[]> {
  if (corpus) return Promise.resolve(corpus)
  loading ??= load().then((d) => (corpus = d))
  return loading
}

export async function bodiesPresent(): Promise<boolean> {
  return (await corpusOnce()).length > 0
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function snippet(text: string, at: number, len: number): string {
  const start = Math.max(0, at - 110)
  const end = Math.min(text.length, at + len + 110)
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "")
}

/**
 * Every whitespace-separated term must appear in a leaf; ranking is by total
 * matches of the longest term, then corpus order.
 */
export async function searchBodies(query: string, limit = 60): Promise<Hit[]> {
  const terms = query.trim().split(/\s+/).filter(Boolean).slice(0, 6)
  if (!terms.length) return []
  const docs = await corpusOnce()
  const primary = [...terms].sort((a, b) => b.length - a.length)[0]
  const res = terms.map((t) => new RegExp(escapeRe(t), "iu"))
  const primaryRe = new RegExp(escapeRe(primary), "giu")

  const hits: Hit[] = []
  for (const d of docs) {
    if (!res.every((r) => r.test(d.text))) continue
    primaryRe.lastIndex = 0
    const snippets: string[] = []
    let count = 0
    let m: RegExpExecArray | null
    while ((m = primaryRe.exec(d.text)) !== null) {
      count++
      if (snippets.length < 3) snippets.push(snippet(d.text, m.index, m[0].length))
      if (count > 500) break // a term like "the" shouldn't cost a full scan
    }
    if (count) hits.push({ slug: d.slug, title: d.title, leaf: d.leaf, label: d.label, count, snippets })
  }
  return hits.sort((a, b) => b.count - a.count).slice(0, limit)
}
