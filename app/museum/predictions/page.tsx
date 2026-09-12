"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  predictions,
  domains,
  confRank,
  divRank,
  type Confidence,
  type DomainId,
} from "@/lib/atlas-data"
import { SectionLabel } from "@/components/museum/chrome"

type Sort = "time" | "confidence" | "divergence"

export default function PredictionsIndex() {
  const [domain, setDomain] = useState<DomainId | "all">("all")
  const [conf, setConf] = useState<Confidence | "all">("all")
  const [sort, setSort] = useState<Sort>("time")

  const list = useMemo(() => {
    let l = predictions.filter(
      (p) => (domain === "all" || p.domains.includes(domain)) && (conf === "all" || p.confidence === conf),
    )
    l = [...l]
    if (sort === "time") l.sort((a, b) => a.timeWindow.localeCompare(b.timeWindow))
    if (sort === "confidence") l.sort((a, b) => confRank[b.confidence] - confRank[a.confidence])
    if (sort === "divergence") l.sort((a, b) => divRank[b.divergence] - divRank[a.divergence])
    return l
  }, [domain, conf, sort])

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SectionLabel>The collection</SectionLabel>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Every placard.</h1>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        Each prediction is a single falsifiable claim with a time window, impact bars, and its receipts.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-end gap-4 border-y border-border py-4 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Domain</span>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as DomainId | "all")}
            className="rounded-sm border border-border bg-background px-3 py-2 outline-none"
          >
            <option value="all">All domains</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Confidence</span>
          <select
            value={conf}
            onChange={(e) => setConf(e.target.value as Confidence | "all")}
            className="rounded-sm border border-border bg-background px-3 py-2 outline-none"
          >
            <option value="all">Any</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Sort</span>
          {(["time", "confidence", "divergence"] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`rounded-sm border px-2.5 py-1.5 uppercase tracking-wider transition-colors ${
                sort === s ? "border-primary bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{list.length}</span> predictions
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {list.map((p) => (
          <Link
            key={p.id}
            href={`/museum/predictions/${p.id}`}
            className="group flex flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <div className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-wider">
              <span className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">{p.timeWindow}</span>
              <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">Conf {p.confidence}</span>
              <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">Div {p.divergence}</span>
            </div>
            <h2 className="mt-4 text-balance font-serif text-xl font-semibold leading-snug tracking-tight">{p.claim}</h2>
            <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-muted-foreground">
              {p.domains.map((id) => domains.find((d) => d.id === id)?.name).join(" · ")}
              <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
