"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { ArrowLeft } from "lucide-react"
import { getPrediction, domains, trajectories } from "@/lib/atlas-data"
import { useAtlas } from "@/components/museum/store"
import { SectionLabel, PressureBar } from "@/components/museum/chrome"

export default function PredictionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const p = getPrediction(id)
  if (!p) notFound()
  const { trajectory } = useAtlas()

  return (
    <article className="mx-auto max-w-4xl px-6 py-14">
      <Link href="/museum/predictions" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Back to the collection
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-wider">
        <span className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">{p.timeWindow}</span>
        <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">Confidence {p.confidence}</span>
        <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">Divergence {p.divergence}</span>
      </div>

      <h1 className="mt-5 text-balance font-serif text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
        {p.claim}
      </h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {p.domains.map((id) => {
          const d = domains.find((x) => x.id === id)!
          return (
            <Link
              key={id}
              href={`/museum/domains/${id}`}
              className="rounded-sm border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              {d.name}
            </Link>
          )
        })}
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section>
            <SectionLabel>Evidence</SectionLabel>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              {p.evidence.map((e) => (
                <li key={e} className="flex gap-2">
                  <span className="text-primary">·</span>
                  {e}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionLabel>What would change our mind</SectionLabel>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{p.counter}</p>
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-sm border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Domain impact</p>
            <ul className="mt-3 space-y-2.5">
              {Object.entries(p.impacts).map(([id, v]) => (
                <li key={id} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span>{domains.find((d) => d.id === id)?.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{v}</span>
                  </div>
                  <div className="mt-1"><PressureBar value={v as number} /></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Across trajectories</p>
            <ul className="mt-3 space-y-3 text-sm">
              {trajectories.map((t) => (
                <li key={t.id} className={t.id === trajectory ? "rounded-sm bg-accent p-3 text-accent-foreground" : "p-3"}>
                  <p className="font-medium">{t.short}</p>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{p.delta[t.id]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}
