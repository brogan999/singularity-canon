import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getPrediction, domains, trajectories, predictions } from "@/lib/atlas-data"
import { SectionTitle, Pill } from "@/components/dossier/chrome"

export function generateStaticParams() {
  return predictions.map((p) => ({ id: p.id }))
}

export default async function DossierPredictionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = getPrediction(id)
  if (!p) notFound()

  return (
    <article>
      <Link href="/dossier/index" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Back to Index
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
        <span className="border border-foreground/60 px-2 py-1 font-bold uppercase tracking-wider">{p.timeWindow}</span>
        <span className="flex items-center gap-1.5">Conf. <Pill v={p.confidence} /></span>
        <span className="flex items-center gap-1.5">Div. <Pill v={p.divergence} /></span>
      </div>

      <h1 className="mt-4 max-w-3xl text-balance text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
        {p.claim}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.domains.map((did) => (
          <Link key={did} href={`/dossier/domains/${did}`} className="border border-foreground/40 px-2 py-1 text-xs uppercase tracking-wider hover:border-primary hover:text-primary">
            {domains.find((d) => d.id === did)?.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <section>
            <SectionTitle n="1">Evidence on file</SectionTitle>
            <ol className="mt-4 space-y-2 text-sm leading-relaxed">
              {p.evidence.map((e, i) => (
                <li key={e} className="flex gap-2"><sup className="text-primary">{i + 1}</sup>{e}</li>
              ))}
            </ol>
          </section>
          <section>
            <SectionTitle n="2">Steelmanned counter</SectionTitle>
            <p className="mt-4 border-l-2 border-foreground/40 pl-3 text-sm italic leading-relaxed text-muted-foreground">
              {p.counter}
            </p>
          </section>
          <section>
            <SectionTitle n="3">Reading across trajectories</SectionTitle>
            <div className="mt-4 space-y-3">
              {trajectories.map((t) => (
                <div key={t.id} className="border border-foreground/40 bg-card p-3 text-sm">
                  <p className="text-[0.6rem] font-bold uppercase tracking-wider text-primary">{t.name}</p>
                  <p className="mt-1 leading-relaxed">{p.delta[t.id]}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit border border-foreground/40 bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-wider">Domain impact</p>
          <ul className="mt-3 space-y-2.5">
            {Object.entries(p.impacts).map(([did, v]) => (
              <li key={did} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{domains.find((d) => d.id === did)?.name}</span>
                  <span className="text-xs text-muted-foreground">{v}</span>
                </div>
                <div className="mt-1 h-1 bg-muted"><div className="h-full bg-foreground/70" style={{ width: `${v}%` }} /></div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  )
}
