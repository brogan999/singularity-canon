"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import {
  predictions,
  domains,
  predictionsForDomain,
  type Confidence,
  type DomainId,
} from "@/lib/atlas-data"
import { SectionTitle, Field } from "@/components/dossier/chrome"

export default function DossierStart() {
  const [query, setQuery] = useState("")
  const [domain, setDomain] = useState<DomainId | "all">("all")
  const [conf, setConf] = useState<Confidence | "all">("all")

  const matched = useMemo(
    () =>
      predictions.filter(
        (p) =>
          (domain === "all" || p.domains.includes(domain)) &&
          (conf === "all" || p.confidence === conf) &&
          (query.trim() === "" || p.claim.toLowerCase().includes(query.toLowerCase())),
      ),
    [domain, conf, query],
  )

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
      <section>
        <SectionTitle n="A">Read this first</SectionTitle>
        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          <p>
            This manual is a structured library of predictions about the transition to advanced AI. Each entry is a
            single falsifiable claim, filed under one or more impact domains and a time window.
          </p>
          <p>
            Entries are read against <span className="font-bold">trajectories</span> — named scenarios that change
            which claims are most likely and where they most disagree. Use the Index to scan, Compare to read two
            futures side by side, and Timeline to read by chapter.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dossier/index" className="bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            Open the Index
          </Link>
          <Link href="/dossier/about" className="border border-foreground/60 px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-secondary">
            Read the Methods
          </Link>
        </div>

        {/* Domain directory */}
        <div className="mt-10">
          <SectionTitle n="B">Domain directory</SectionTitle>
          <ul className="mt-4 divide-y divide-foreground/20 border-y border-foreground/40">
            {domains.map((d) => (
              <li key={d.id}>
                <Link href={`/dossier/domains/${d.id}`} className="flex items-center justify-between gap-3 py-2.5 text-sm hover:text-primary">
                  <span className="font-bold">{d.name}</span>
                  <span className="text-xs text-muted-foreground">{predictionsForDomain(d.id).length} entries →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="h-fit border border-foreground/40 bg-card p-5">
        <SectionTitle n="C">Quick lookup</SectionTitle>
        <label className="mt-4 flex items-center gap-2 border border-foreground/40 bg-background px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search claims…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Domain">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value as DomainId | "all")}
              className="w-full border border-foreground/40 bg-background px-2 py-1.5 text-xs outline-none"
            >
              <option value="all">All domains</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Confidence">
            <select
              value={conf}
              onChange={(e) => setConf(e.target.value as Confidence | "all")}
              className="w-full border border-foreground/40 bg-background px-2 py-1.5 text-xs outline-none"
            >
              <option value="all">Any</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </Field>
        </div>

        <p className="mt-4 border-t border-foreground/20 pt-3 text-xs">
          <span className="font-bold text-primary">{matched.length}</span> predictions matched
        </p>
        <ul className="mt-2 space-y-1.5">
          {matched.map((p, i) => (
            <li key={p.id}>
              <Link href={`/dossier/predictions/${p.id}`} className="flex gap-2 text-xs leading-snug hover:text-primary">
                <sup className="text-primary">{i + 1}</sup>
                <span className="line-clamp-1">{p.claim}</span>
              </Link>
            </li>
          ))}
          {matched.length === 0 && <li className="text-xs text-muted-foreground">No entries match.</li>}
        </ul>
      </section>
    </div>
  )
}
