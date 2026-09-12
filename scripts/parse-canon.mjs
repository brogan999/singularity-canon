// Parse "The Singularity Canon" markdown export into structured data.
//
// Usage:
//   node scripts/parse-canon.mjs <source.md> [--with-body]
//
//   <source.md>    Path to the canon markdown export. Defaults to
//                  scripts/canon-source.md if omitted.
//   --with-body    Also extract each source's full body text to
//                  content/canon/<slug>.md and record bodyPath + wordCount
//                  in the index. Omit this to produce the lean, summary-only
//                  index (recommended for bundling; bodies load on demand).
//
// Output:
//   lib/canon-data.ts            structured index (always)
//   content/canon/<slug>.md      per-source body text (only with --with-body)
//
// The parser is format-driven, not count-driven: it discovers every
// "# Part N: ..." section and every "**Author · Year**" anchor, so adding
// more sources to the export requires no code changes here.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs"

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

const entries = []
const usedSlugs = new Set()

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
  if (!title) continue

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
  let n = 2
  while (usedSlugs.has(slug)) slug = `${slugify(title)}-${n++}`
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
    const wordCount = body ? body.split(/\s+/).length : 0
    const bodyPath = `content/canon/${e.slug}.md`
    writeFileSync(bodyPath, body ? `# ${e.title}\n\n${body}\n` : `# ${e.title}\n`, "utf8")
    e.bodyPath = `canon/${e.slug}.md`
    e.wordCount = wordCount
  })
}

// strip internal fields before emit
for (const e of entries) {
  delete e._titleLine
  delete e._summaryEnd
}

// --- emit TS ---
const bodyType = withBody
  ? `\n  bodyPath: string\n  wordCount: number`
  : ""

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
export const compiledOn = "10 September 2026"

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

console.log(`[v0] source: ${SRC}`)
console.log(`[v0] parsed ${entries.length} entries across ${parts.length} parts`)
const noSrc = entries.filter((e) => !e.src).length
const noBullets = entries.filter((e) => e.bullets.length === 0).length
console.log(`[v0] missing src: ${noSrc}, missing bullets: ${noBullets}`)
if (withBody) {
  const words = entries.reduce((s, e) => s + (e.wordCount ?? 0), 0)
  console.log(`[v0] wrote ${entries.length} body files to content/canon/ (${words.toLocaleString()} words total)`)
}
