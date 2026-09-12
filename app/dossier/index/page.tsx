"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { predictions, domains, confRank, divRank } from "@/lib/atlas-data"
import { SectionTitle, Pill } from "@/components/dossier/chrome"

type SortKey = "time" | "confidence" | "divergence"

export default function DossierIndex() {
  const [sort, setSort] = useState<SortKey>("time")

  const sorted = useMemo(() => {
    const list = [...predictions]
    if (sort === "time") list.sort((a, b) => a.timeWindow.localeCompare(b.timeWindow))
    if (sort === "confidence") list.sort((a, b) => confRank[b.confidence] - confRank[a.confidence])
    if (sort === "divergence") list.sort((a, b) => divRank[b.divergence] - divRank[a.divergence])
    return list
  }, [sort])

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionTitle n="C">Index snapshot</SectionTitle>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Sort:</span>
          {(["time", "confidence", "divergence"] as SortKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={`border px-2 py-1 uppercase tracking-wider ${
                sort === k ? "border-foreground/80 bg-primary text-primary-foreground" : "border-foreground/30"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto border border-foreground/40">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-foreground/40 bg-secondary uppercase tracking-wider">
              <th className="p-3 font-bold">Prediction</th>
              <th className="hidden p-3 font-bold sm:table-cell">Domains</th>
              <th className="p-3 font-bold">Window</th>
              <th className="p-3 font-bold">Conf.</th>
              <th className="p-3 font-bold">Div.</th>
              <th className="p-3 text-right font-bold">Entry</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.id} className="border-b border-foreground/15 align-top hover:bg-secondary/50">
                <td className="max-w-xs p-3">
                  <Link href={`/dossier/predictions/${p.id}`} className="block leading-snug hover:text-primary">
                    {p.claim}
                  </Link>
                </td>
                <td className="hidden p-3 text-muted-foreground sm:table-cell">
                  {p.domains.map((id) => domains.find((x) => x.id === id)?.name.split(" ")[0]).join(", ")}
                </td>
                <td className="whitespace-nowrap p-3">{p.timeWindow}</td>
                <td className="p-3"><Pill v={p.confidence} /></td>
                <td className="p-3"><Pill v={p.divergence} /></td>
                <td className="p-3 text-right">
                  <Link href={`/dossier/predictions/${p.id}`} className="text-primary underline underline-offset-2">
                    open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{predictions.length} entries on file.</p>
    </section>
  )
}
