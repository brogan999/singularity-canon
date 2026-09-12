"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ChevronRight } from "lucide-react"
import {
  predictions,
  domains,
  confRank,
  divRank,
  magnitudeMap,
  type DomainId,
} from "@/lib/atlas-data"
import { useControl } from "@/components/control/store"
import { SectionHead } from "@/components/control/parts"

type Sort = "divergence" | "confidence" | "time"

export default function ControlPredictions() {
  const { setDrawer } = useControl()
  const [domain, setDomain] = useState<DomainId | "all">("all")
  const [sort, setSort] = useState<Sort>("divergence")

  const list = useMemo(() => {
    let l = predictions.filter((p) => domain === "all" || p.domains.includes(domain))
    l = [...l]
    if (sort === "time") l.sort((a, b) => a.timeWindow.localeCompare(b.timeWindow))
    if (sort === "confidence") l.sort((a, b) => confRank[b.confidence] - confRank[a.confidence])
    if (sort === "divergence") l.sort((a, b) => divRank[b.divergence] - divRank[a.divergence])
    return l
  }, [domain, sort])

  return (
    <div className="p-6 lg:p-10">
      <SectionHead index="P" title="Prediction registry" note="all tracked claims" />

      <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-border py-3 text-xs">
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Domain</span>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as DomainId | "all")}
            className="border border-border bg-background px-2 py-1.5 outline-none"
          >
            <option value="all">All</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </label>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-muted-foreground">Sort</span>
          {(["divergence", "confidence", "time"] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`border px-2 py-1.5 uppercase tracking-wider transition-colors ${
                sort === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <ol className="mt-6 divide-y divide-border border border-border">
        {list.map((p, i) => (
          <li key={p.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 transition-colors hover:bg-secondary/40">
            <span className="w-6 text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <Link href={`/control-room/predictions/${p.id}`} className="min-w-0">
              <span className="block font-sans text-sm leading-snug">{p.claim}</span>
              <span className="mt-1 block text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                {p.timeWindow} · conf {p.confidence} · div {p.divergence}
              </span>
            </Link>
            <span className="flex shrink-0 items-center gap-2">
              <span className="flex h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                <span className="h-full bg-primary" style={{ width: `${magnitudeMap[p.divergence]}%` }} />
              </span>
              <button onClick={() => setDrawer(p)} aria-label="Quick report" className="text-muted-foreground hover:text-foreground">
                <ChevronRight className="size-4" />
              </button>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
