"use client"

import { useState } from "react"
import Link from "next/link"
import { predictions, domains, type DomainId } from "@/lib/atlas-data"
import { FolioLabel } from "@/components/manuscript/chrome"

export default function ManuscriptMarginalia() {
  const [filter, setFilter] = useState<DomainId | "all">("all")
  const list = predictions.filter((p) => (filter === "all" ? true : p.domains.includes(filter)))

  return (
    <div>
      <FolioLabel>Codex III — Marginalia</FolioLabel>
      <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Receipts &amp; footnotes
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
        Every claim in the codex is footnoted here — its window, its involved folios, and the evidence
        pressed into the margin.
      </p>

      {/* Domain filter chips */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        <button
          onClick={() => setFilter("all")}
          className={`hud-panel-sm px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider transition-colors ${
            filter === "all" ? "bg-instrument text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {domains.map((d) => (
          <button
            key={d.id}
            onClick={() => setFilter(d.id)}
            className={`hud-panel-sm px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider transition-colors ${
              filter === d.id ? "bg-instrument text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {d.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <ol className="mt-8 space-y-6">
        {list.map((p, i) => (
          <li key={p.id} className="flex gap-4 border-b border-border pb-6">
            <span className="shrink-0 font-serif text-4xl font-semibold leading-none text-gild">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <Link href={`/manuscript/predictions/${p.id}`} className="font-serif text-xl font-semibold leading-snug hover:text-instrument">
                {p.claim}
              </Link>
              <p className="mt-2 font-serif text-sm italic leading-relaxed text-muted-foreground">
                {p.evidence[0]}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                <span className="text-instrument">{p.timeWindow}</span>
                <span>Conf {p.confidence}</span>
                <span className={p.divergence === "High" ? "text-destructive" : ""}>Div {p.divergence}</span>
                <span>{p.domains.join(" · ")}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
