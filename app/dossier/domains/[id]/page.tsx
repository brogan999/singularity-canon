import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import {
  getDomain,
  domains,
  domainPressure,
  predictionsForDomain,
  trajectories,
  years,
  type DomainId,
} from "@/lib/atlas-data"
import { SectionTitle, Pill } from "@/components/dossier/chrome"

export function generateStaticParams() {
  return domains.map((d) => ({ id: d.id }))
}

export default async function DossierDomainDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const domain = getDomain(id)
  if (!domain) notFound()
  const related = predictionsForDomain(domain.id as DomainId)

  return (
    <article>
      <Link href="/dossier" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Domain directory
      </Link>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-primary">Domain file</p>
      <h1 className="mt-2 text-2xl font-bold uppercase tracking-tight md:text-3xl">{domain.name}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed">{domain.thesis}</p>

      {/* Pressure table across years/trajectories */}
      <div className="mt-8">
        <SectionTitle n="1">Pressure grid</SectionTitle>
        <div className="mt-4 overflow-x-auto border border-foreground/40">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-foreground/40 bg-secondary uppercase tracking-wider">
                <th className="p-3 font-bold">Trajectory</th>
                {years.map((y) => (
                  <th key={y} className="p-3 font-bold">{y === 2050 ? "50+" : `'${String(y).slice(2)}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trajectories.map((t) => (
                <tr key={t.id} className="border-b border-foreground/15">
                  <td className="p-3 font-bold">{t.short}</td>
                  {years.map((y) => {
                    const p = domainPressure(domain, y, t.id)
                    return (
                      <td key={y} className="p-3">
                        <span style={{ color: p > 70 ? "var(--primary)" : undefined }}>{p}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entries filed here */}
      <div className="mt-10">
        <SectionTitle n="2">Entries filed under this domain</SectionTitle>
        <ul className="mt-4 divide-y divide-foreground/20 border-y border-foreground/40">
          {related.map((p) => (
            <li key={p.id}>
              <Link href={`/dossier/predictions/${p.id}`} className="flex flex-wrap items-center gap-3 py-3 text-sm hover:text-primary">
                <span className="border border-foreground/40 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                  {p.timeWindow}
                </span>
                <span className="flex-1 leading-snug">{p.claim}</span>
                <Pill v={p.confidence} />
              </Link>
            </li>
          ))}
          {related.length === 0 && <li className="py-3 text-sm text-muted-foreground">No entries on file.</li>}
        </ul>
      </div>
    </article>
  )
}
