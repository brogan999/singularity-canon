"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { predictions, domains, confRank, divRank, type DomainId } from "@/lib/atlas-data"
import { ArchiveHeading } from "@/components/monastery/chrome"

type SortKey = "claim" | "window" | "confidence" | "divergence"

export default function MonasteryIndex() {
  const [query, setQuery] = useState("")
  const [domain, setDomain] = useState<DomainId | "all">("all")
  const [sort, setSort] = useState<SortKey>("window")

  const filtered = predictions
    .filter((p) => (query ? p.claim.toLowerCase().includes(query.toLowerCase()) : true))
    .filter((p) => (domain === "all" ? true : p.domains.includes(domain)))
    .sort((a, b) => {
      if (sort === "claim") return a.claim.localeCompare(b.claim)
      if (sort === "window") return a.timeWindow.localeCompare(b.timeWindow)
      if (sort === "confidence") return confRank[b.confidence] - confRank[a.confidence]
      return divRank[b.divergence] - divRank[a.divergence]
    })

  const cols: { key: SortKey; label: string }[] = [
    { key: "claim", label: "Prediction" },
    { key: "window", label: "Window" },
    { key: "confidence", label: "Conf." },
    { key: "divergence", label: "Div." },
  ]

  return (
    <div>
      <ArchiveHeading eyebrow="Catalogue · full corpus" title="The Index">
        Every entry in the archive, searchable and sortable. Sorting is by column; filtering is by domain.
      </ArchiveHeading>

      {/* Search + domain filter */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="hud-panel-sm flex min-w-64 flex-1 items-center gap-2 border border-border bg-card px-3 py-2">
          <Search className="size-4 text-instrument" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search predictions…"
            className="w-full bg-transparent font-mono text-xs uppercase tracking-wider outline-none placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value as DomainId | "all")}
          className="hud-panel-sm border border-border bg-card px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"
        >
          <option value="all">All domains</option>
          {domains.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-baseline justify-between border-b border-border pb-2">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Entries</h2>
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-instrument">{filtered.length} of {predictions.length}</span>
      </div>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground">
              {cols.map((c) => (
                <th key={c.key} className="py-2 pr-4 font-normal">
                  <button
                    onClick={() => setSort(c.key)}
                    className={`uppercase tracking-widest transition-colors hover:text-foreground ${sort === c.key ? "text-instrument" : ""}`}
                  >
                    {c.label} {sort === c.key ? "▾" : ""}
                  </button>
                </th>
              ))}
              <th className="py-2 font-normal" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border align-baseline">
                <td className="max-w-md py-2.5 pr-4 font-serif text-sm">
                  <Link href={`/monastery/entries/${p.id}`} className="hover:text-instrument">
                    {p.claim}
                  </Link>
                  <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-wider text-muted-foreground">
                    {p.domains.join(" · ")}
                  </span>
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 font-mono text-[0.65rem] text-muted-foreground">{p.timeWindow}</td>
                <td className="py-2.5 pr-4 font-mono text-[0.65rem] uppercase">{p.confidence}</td>
                <td className={`py-2.5 pr-4 font-mono text-[0.65rem] uppercase ${p.divergence === "High" ? "text-destructive" : ""}`}>
                  {p.divergence}
                </td>
                <td className="py-2.5">
                  <Link href={`/monastery/entries/${p.id}`} className="font-mono text-[0.6rem] uppercase tracking-widest text-instrument hover:underline">
                    Open ▸
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
