"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { ArrowLeft } from "lucide-react"
import { getPrediction, domains, trajectories } from "@/lib/atlas-data"
import { useControl } from "@/components/control/store"
import { SectionHead, Stat } from "@/components/control/parts"

export default function ControlPredictionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const p = getPrediction(id)
  if (!p) notFound()
  const { trajectory } = useControl()

  return (
    <div className="p-6 lg:p-10">
      <Link href="/control-room/predictions" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Registry
      </Link>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-primary">{p.timeWindow}</p>
      <h1 className="mt-2 max-w-3xl text-balance font-sans text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
        {p.claim}
      </h1>

      <div className="mt-6 flex flex-wrap gap-4 text-xs">
        <Stat label="Confidence" value={p.confidence} />
        <Stat label="Divergence" value={p.divergence} />
        <Stat label="Domains" value={String(p.domains.length)} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.domains.map((id) => (
          <Link
            key={id}
            href={`/control-room/domains/${id}`}
            className="border border-border px-2.5 py-1 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {domains.find((d) => d.id === id)?.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <SectionHead index="·" title="Evidence" />
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {p.evidence.map((e) => (
                <li key={e} className="flex gap-2"><span className="text-accent">›</span>{e}</li>
              ))}
            </ul>
          </section>
          <section>
            <SectionHead index="·" title="What would falsify it" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.counter}</p>
          </section>
          <section>
            <SectionHead index="·" title="Across trajectories" />
            <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border">
              {trajectories.map((t) => (
                <div key={t.id} className={`bg-card p-4 ${t.id === trajectory ? "ring-1 ring-inset ring-primary" : ""}`}>
                  <p className="text-xs uppercase tracking-wider text-accent">{t.short}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.delta[t.id]}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-md border border-border bg-card p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Domain impact</p>
          <ul className="mt-3 space-y-2.5">
            {Object.entries(p.impacts).map(([id, v]) => (
              <li key={id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span>{domains.find((d) => d.id === id)?.name}</span>
                  <span className="text-xs text-muted-foreground">{v}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${v}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
