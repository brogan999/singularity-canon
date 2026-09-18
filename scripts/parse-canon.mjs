// Parse "The Singularity Canon" markdown export into structured data.
//
// Usage:
//   node scripts/parse-canon.mjs <source.md> [--with-body]
//
//   <source.md>    Path to the canon markdown export. Defaults to
//                  scripts/canon-source.md if omitted.
//   --with-body    Also split each source's full body into reading "leaves"
//                  under content/canon/<slug>/ and record wordCount +
//                  leafCount in the index. Omit this to produce the lean,
//                  summary-only index (what production deploys).
//
// Output:
//   lib/canon-data.ts                     structured index (always)
//   content/canon/<slug>/manifest.json    leaf table of contents (--with-body)
//   content/canon/<slug>/001.html …       one file per leaf (--with-body)
//
// The parser is format-driven, not count-driven: it discovers every
// "# Part N: ..." section and every "**Author · Year**" anchor, so adding
// more sources to the export requires no code changes here.
//
// Bodies are converted to HTML here, at parse time, rather than rendered in
// the app: leaves are static, so there is no reason to ship a markdown parser
// to the browser or re-parse on every request.

import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync } from "node:fs"
import { marked } from "marked"

const args = process.argv.slice(2)
const withBody = args.includes("--with-body")
const SRC = args.find((a) => !a.startsWith("--")) ?? "scripts/canon-source.md"

const raw = readFileSync(SRC, "utf8")
const lines = raw.split("\n")

// --- part ranges ---
const partHeader = /^# (Part \d+): (.+)$/
const parts = []
lines.forEach((line, i) => {
  const m = line.match(partHeader)
  if (m) parts.push({ id: m[1], label: m[2].trim(), line: i })
})
function partFor(lineNo) {
  let found = parts[0]
  for (const p of parts) if (p.line < lineNo) found = p
  return found
}

// --- anchors: **Author · Year** ---
const anchor = /^\*\*(.+)\*\*\s*$/
const yearRe = /(\d{4})\s*$/

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
}

function cleanSrc(line) {
  let inner = line.replace(/<\/?span[^>]*>/g, "").trim()
  const md = inner.match(/\[([^\]]+)\]\(([^)]+)\)/)
  if (md) return md[2]
  return inner
}

// --- body chunking -------------------------------------------------------
//
// FROZEN. These two numbers determine every /canon/<slug>/<leaf> URL that
// exists. Changing them silently repoints every deep link and orphans every
// bookmark; nothing in the system protects against that. Treat as public API.
const TARGET_WORDS = 2500 // ~10 minutes of reading
const MIN_WORDS = 1200 // a chapter heading below this won't start a new leaf

const countWords = (s) => (s.match(/\S+/g) || []).length

const headingOf = (block) => {
  const m = block.match(/^(#{1,6})\s+(.*)$/)
  return m ? { depth: m[1].length, text: plain(m[2]) } : null
}

/** Strip markdown decoration for use in labels. */
function plain(s) {
  return s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*`\\]/g, "")
    .trim()
}

/**
 * Blank-line-separated atomic blocks. Pandoc writes one paragraph per line,
 * so this needs no reflow. Code fences stay whole; trailing "\" hard-breaks
 * from the PDF/epub extraction are dropped.
 */
function toBlocks(body) {
  const out = []
  let buf = []
  let fence = false
  for (const raw of body.split("\n")) {
    const line = raw.replace(/[ \t]+$/, "").replace(/\\+$/, "")
    if (/^```/.test(line)) fence = !fence
    if (!fence && line === "") {
      if (buf.length) out.push(buf.join("\n"))
      buf = []
      continue
    }
    buf.push(line)
  }
  if (buf.length) out.push(buf.join("\n"))
  return out.filter((b) => b.trim() !== "")
}

/**
 * Which heading level is this work's chapter spine: the shallowest depth > 1
 * that occurs at least 3 times, else null.
 *
 * Headings are not a reliable spine across this corpus — the 180k-word Foom
 * Debate and Last and First Men have none at all, while Age of Em has 148.
 * The >= 3 test is what makes a work with a single stray "##" (Superintelligence)
 * fall through to its "###" level instead of producing one enormous leaf.
 */
function chapterDepth(blocks) {
  const seen = {}
  for (const b of blocks) {
    const h = headingOf(b)
    if (h && h.depth > 1) seen[h.depth] = (seen[h.depth] || 0) + 1
  }
  for (const d of [2, 3, 4]) if ((seen[d] || 0) >= 3) return d
  return null
}

const PUBLISHING_BOILERPLATE =
  /\b(ISBN|all rights reserved|copyright ©|©\s*\d{4}|first published|printed in|library of congress|university press|published by|typeset|cataloguing|cataloging|\bpaperback\b|e-?book edition)\b/i

/** Leading web/ebook chrome: download offers, format lists, a contents heading. */
const SITE_CHROME =
  /^\s*(table\s+of\s+contents|contents)\s*$|\b(download as|zipped html|mobipocket|cover art|available in (pdf|epub)|read online|other formats)\b/i

/** A contents list: mostly link-bearing list items. */
function isLinkList(block) {
  const rows = block.split("\n").filter((l) => l.trim())
  if (rows.length < 2) return false
  const listy = rows.filter((l) => /^\s*([-*]|\d+\.)\s/.test(l)).length
  const linky = rows.filter((l) => /\]\(|https?:\/\//.test(l)).length
  return listy >= rows.length * 0.6 && linky >= rows.length * 0.6
}

/**
 * A stack of short, unpunctuated lines — a chapter list that survived
 * conversion without its list markup. Only ever consulted while scanning
 * front matter, and the 300-word budget caps how much it can take.
 */
function isFragmentStack(block) {
  const rows = block
    .split("\n")
    .map((l) => plain(l).replace(/^>\s*/, "").trim())
    .filter(Boolean)
  if (rows.length < 3) return false
  const fragments = rows.filter((l) => countWords(l) <= 8 && !/[.?!]["')\]]?$/.test(l)).length
  return fragments >= rows.length * 0.7
}

/**
 * Does this leading block look like extraction debris rather than the work?
 *
 * Deliberately a signature test, not a length test. An earlier length-based
 * rule ("skip to the first 40-word paragraph") ate the opening of every
 * interview transcript, because dialogue turns and topic lists are short.
 */
function looksLikeDebris(block, title) {
  const t = plain(block).trim()
  if (!t) return true
  const w = countWords(t)
  const h = headingOf(block)
  // A leading heading that just repeats the work's title — the reader already shows it.
  // Test the heading's text, not the raw "## …" line, or the anchored patterns never match.
  if (h) return norm(h.text) === norm(title) || PUBLISHING_BOILERPLATE.test(h.text) || SITE_CHROME.test(h.text)
  // A contents list that lost its markup in conversion arrives as one long inline
  // block ("Table of Contents Prologue Opportunity Resources …"), so the anchored
  // SITE_CHROME pattern misses it. Match on the opening instead.
  if (/^\s*(table\s+of\s+)?contents\b/i.test(t) && w <= 200) return true
  if (SITE_CHROME.test(t) && w <= 60) return true // download offers, format lists, "Contents"
  if (isLinkList(block) || isFragmentStack(block)) return true // the contents list itself
  if (/^[\d\s.,:;—–-]+$/.test(t)) return true // orphan page numbers from a shredded contents list
  if (/^[ivxlcdm\s.,:;—–-]+$/i.test(t) && w <= 6) return true // roman numerals
  if (PUBLISHING_BOILERPLATE.test(t)) return true
  if (norm(t) === norm(title)) return true // bare repeated title
  if (w <= 6 && !/[.?!]["')\]]?$/.test(t)) return true // stray fragment, no sentence
  return false
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

/**
 * Drop leading extraction debris — repeated titles, ISBNs, copyright pages and
 * shredded contents lists that survive PDF/epub conversion. Verified against
 * the Foom Debate and Age of Em, which otherwise open on front matter, and
 * against the Dwarkesh transcripts, which must NOT be trimmed at all.
 * Stops at the first block that looks like the work. Returns the count so it
 * stays auditable in the manifest.
 */
function trimFrontMatter(blocks, title) {
  let i = 0
  let words = 0
  while (i < blocks.length && i < 40 && looksLikeDebris(blocks[i], title)) {
    words += countWords(blocks[i])
    if (words > 300) break // a real work never opens with 300 words of debris
    i++
  }
  return i > 0 ? { kept: blocks.slice(i), dropped: i } : { kept: blocks, dropped: 0 }
}

/** Break before a block iff it opens a chapter and the leaf is past MIN, or the leaf is full. */
function chunk(blocks, depth) {
  const out = []
  let cur = []
  let words = 0
  let heading = null
  let openedUnder = null
  const flush = () => {
    if (cur.length) out.push({ blocks: cur, words, heading: openedUnder })
    cur = []
    words = 0
  }
  for (const b of blocks) {
    const h = headingOf(b)
    const isChapter = h && depth != null && h.depth <= depth
    if (cur.length && ((isChapter && words >= MIN_WORDS) || words >= TARGET_WORDS)) flush()
    if (!cur.length) openedUnder = isChapter ? h.text : heading
    if (h) heading = h.text
    cur.push(b)
    words += countWords(b)
  }
  flush()
  // A trailing scrap (an afterword heading, a stray line) shouldn't get its own
  // leaf — it reads as a broken page. Fold it back into the leaf before it.
  if (out.length > 1 && out.at(-1).words < MIN_WORDS / 4) {
    const tail = out.pop()
    const prev = out.at(-1)
    prev.blocks.push(...tail.blocks)
    prev.words += tail.words
  }
  return out
}

/** First ~52 characters of opening prose — the medieval incipit, for headingless works. */
function incipit(block) {
  const t = plain(block).replace(/^[>\-*\s]+/, "")
  return t.length <= 52 ? t : t.slice(0, 51).replace(/\s+\S*$/, "") + "…"
}

function labelFor(leaf, priorLeaves) {
  const h = headingOf(leaf.blocks[0])
  if (h) return h.text
  if (leaf.heading) {
    const nth = priorLeaves.filter((p) => p.heading === leaf.heading).length + 1
    return nth === 1 ? leaf.heading : `${leaf.heading} · ${nth}`
  }
  const prose = leaf.blocks.find((b) => !headingOf(b)) ?? leaf.blocks[0]
  return incipit(prose)
}

/**
 * Keep only links that actually go somewhere. 12,675 of the corpus's 20,007
 * links are dead epub anchors like [Overview](#part0005.html_concha2-div1-1);
 * rendering those as links is noise pointing at nothing.
 */
function flattenDeadLinks(md) {
  return md.replace(/\[([^\]]*)\]\(([^)\s]*)(?:\s+"[^"]*")?\)/g, (whole, text, href) =>
    /^(https?:|mailto:)/i.test(href) ? whole : text,
  )
}

/** Defuse the tags that could execute. The corpus is self-generated, but this HTML is injected. */
const defuse = (md) =>
  md.replace(/<(\/?)(script|style|iframe|object|embed|form|input|link|meta)\b/gi, "&lt;$1$2")

marked.setOptions({ gfm: true, breaks: false, mangle: false, headerIds: false })
const toHtml = (md) => marked.parse(defuse(flattenDeadLinks(md)))

const entries = []
const usedSlugs = new Set()
const collisions = []
const orphanAnchors = []

for (let i = 0; i < lines.length; i++) {
  const a = lines[i].match(anchor)
  if (!a) continue
  const inner = a[1]
  if (!inner.includes("·")) continue
  const ym = inner.match(yearRe)
  if (!ym) continue
  const year = Number(ym[1])
  const dot = inner.lastIndexOf("·")
  if (dot === -1) continue
  const author = inner.slice(0, dot).trim()

  // title: nearest preceding "# " that isn't a Part
  let title = null
  let titleLine = -1
  for (let j = i - 1; j >= 0 && j > i - 8; j--) {
    const t = lines[j].match(/^#\s+(.+)$/)
    if (t) {
      if (/^Part \d+:/.test(t[1])) break
      title = t[1].trim()
      titleLine = j
      break
    }
  }
  if (!title) {
    // An anchor with no "# " title within 7 lines above it. Previously dropped
    // in silence, which made a malformed export look like a clean one.
    orphanAnchors.push({ line: i + 1, text: inner })
    continue
  }

  // src: within next 3 lines
  let src = null
  for (let j = i + 1; j <= i + 3 && j < lines.length; j++) {
    if (lines[j].includes('class="src"')) {
      src = cleanSrc(lines[j])
      break
    }
  }

  // summary blockquote
  let lead = ""
  const bullets = []
  let started = false
  let summaryEnd = i
  for (let j = i + 1; j < lines.length && j < i + 60; j++) {
    const line = lines[j]
    if (line.trim().startsWith(">")) {
      started = true
      summaryEnd = j
      const body = line.replace(/^\s*>\s?/, "")
      const b = body.match(/^-\s+(.+)$/)
      if (b) {
        bullets.push(b[1].trim())
      } else {
        const it = body.match(/^\*(.+)\*\s*$/)
        if (it && !lead) lead = it[1].trim()
        else if (body.trim() && !lead) lead = body.trim()
      }
    } else if (started && line.trim() === "") {
      const next = lines[j + 1] || ""
      if (!next.trim().startsWith(">")) break
    } else if (started) {
      break
    }
  }

  let slug = slugify(title)
  if (usedSlugs.has(slug)) {
    const base = slug
    let n = 2
    while (usedSlugs.has(slug)) slug = `${base}-${n++}`
    collisions.push({ title, base, resolved: slug })
  }
  usedSlugs.add(slug)

  const part = partFor(i)
  entries.push({
    slug,
    title,
    author,
    year,
    src,
    part: part.id,
    partLabel: part.label,
    lead,
    bullets,
    _titleLine: titleLine,
    _summaryEnd: summaryEnd,
  })
}

// --- optional: extract full body text per entry ---
// Body = everything between this entry's summary and the next entry's title
// (or the next part header / end of file), minus surrounding blank lines.
let totalLeaves = 0
let totalTrimmed = 0
if (withBody) {
  mkdirSync("content/canon", { recursive: true })
  const nextPartLine = (fromLine) => {
    const p = parts.find((p) => p.line > fromLine)
    return p ? p.line : lines.length
  }
  entries.forEach((e, idx) => {
    const next = entries[idx + 1]
    const hardStop = Math.min(
      next ? next._titleLine : lines.length,
      nextPartLine(e._titleLine),
    )
    const body = lines
      .slice(e._summaryEnd + 1, hardStop)
      .join("\n")
      .replace(/^\s+|\s+$/g, "")

    const { kept, dropped } = trimFrontMatter(toBlocks(body), e.title)
    const depth = chapterDepth(kept)
    const leaves = chunk(kept, depth)

    const dir = `content/canon/${e.slug}`
    rmSync(dir, { recursive: true, force: true }) // never leave stale leaves behind
    mkdirSync(dir, { recursive: true })

    let startWord = 0
    const toc = []
    leaves.forEach((leaf, k) => {
      const n = k + 1
      writeFileSync(`${dir}/${String(n).padStart(3, "0")}.html`, toHtml(leaf.blocks.join("\n\n")), "utf8")
      toc.push({
        n,
        label: labelFor(leaf, leaves.slice(0, k)),
        heading: leaf.heading ?? null,
        words: leaf.words,
        startWord,
      })
      startWord += leaf.words
    })

    writeFileSync(
      `${dir}/manifest.json`,
      JSON.stringify(
        { slug: e.slug, title: e.title, words: startWord, headingDepth: depth, frontMatterDropped: dropped, leaves: toc },
        null,
        1,
      ),
      "utf8",
    )

    e.wordCount = startWord
    e.leafCount = leaves.length
    totalLeaves += leaves.length
    totalTrimmed += dropped
  })
}

// strip internal fields before emit
for (const e of entries) {
  delete e._titleLine
  delete e._summaryEnd
}

// --- emit TS ---
// Only two numbers per entry ride in the index. Bodies and leaf tables stay on
// disk: app/canon/page.tsx is a Client Component, so everything in this module
// ships to the browser.
const bodyType = withBody ? `\n  wordCount: number\n  leafCount: number` : ""

const compiledOn = statSync(SRC).mtime.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const header = `// AUTO-GENERATED from The Singularity Canon.
// Do not edit by hand; regenerate via: node scripts/parse-canon.mjs <source.md>${withBody ? " --with-body" : ""}

export type CanonEntry = {
  slug: string
  title: string
  author: string
  year: number
  src: string | null
  part: string
  partLabel: string
  lead: string
  bullets: string[]${bodyType}
}

export const compiledFor = "Alex Brogan"
export const compiledOn = ${JSON.stringify(compiledOn)}
export const hasBodies = ${withBody}

export const parts: { id: string; label: string }[] = ${JSON.stringify(parts.map((p) => ({ id: p.id, label: p.label })), null, 2)}

export const canon: CanonEntry[] = ${JSON.stringify(entries, null, 2)}

export function entryBySlug(slug: string): CanonEntry | undefined {
  return canon.find((e) => e.slug === slug)
}

export function entriesByPart(partId: string): CanonEntry[] {
  return canon.filter((e) => e.part === partId)
}

export const yearExtent: [number, number] = [
  Math.min(...canon.map((e) => e.year)),
  Math.max(...canon.map((e) => e.year)),
]

export const authorsCount = new Set(canon.map((e) => e.author)).size
`

mkdirSync("lib", { recursive: true })
writeFileSync("lib/canon-data.ts", header, "utf8")

console.log(`source: ${SRC}  (compiled ${compiledOn})`)
console.log(`parsed ${entries.length} entries across ${parts.length} parts`)
const noSrc = entries.filter((e) => !e.src).length
const noBullets = entries.filter((e) => e.bullets.length === 0).length
const noLead = entries.filter((e) => !e.lead).length
console.log(`missing src: ${noSrc}, missing bullets: ${noBullets}, missing lead: ${noLead}`)

for (const c of collisions) {
  console.warn(`  ! slug collision: "${c.title}" wanted ${c.base}, got ${c.resolved}`)
}
for (const o of orphanAnchors) {
  console.warn(`  ! anchor with no title at line ${o.line}: ${o.text} — entry DROPPED`)
}

if (withBody) {
  const words = entries.reduce((s, e) => s + (e.wordCount ?? 0), 0)
  console.log(
    `wrote ${totalLeaves.toLocaleString()} leaves across ${entries.length} works ` +
      `(${words.toLocaleString()} words, ${totalTrimmed} front-matter blocks trimmed)`,
  )
  const biggest = [...entries].sort((a, b) => (b.leafCount ?? 0) - (a.leafCount ?? 0)).slice(0, 3)
  for (const e of biggest) console.log(`    ${String(e.leafCount).padStart(4)} leaves  ${e.title.slice(0, 56)}`)
  const noBody = entries.filter((e) => !e.leafCount)
  for (const e of noBody) console.warn(`  ! no body extracted: ${e.slug}`)
}
