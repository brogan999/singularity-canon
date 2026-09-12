import Link from "next/link"
import { predictions } from "@/lib/atlas-data"
import { SectionTitle } from "@/components/dossier/chrome"

const chapters = [
  { range: "2024 – 2027", title: "Acceleration", years: [2024, 2027] },
  { range: "2028 – 2032", title: "Automation cascade", years: [2030] },
  { range: "2033 – 2040", title: "Governance & consolidation", years: [2035, 2040] },
  { range: "2040+", title: "Transformation", years: [2050] },
]

export default function DossierTimeline() {
  return (
    <section>
      <SectionTitle n="E">Timeline · chapters</SectionTitle>
      <ol className="mt-5 space-y-4">
        {chapters.map((ch, i) => {
          const related = predictions
            .filter((p) => ch.years.some((y) => p.timeWindow.includes(String(y).slice(0, 3))))
            .slice(0, 3)
          const uncertainty = predictions.find((p) => p.divergence === "High")
          return (
            <li key={ch.title} className="border border-foreground/40 bg-card">
              <div className="flex items-baseline gap-3 border-b border-foreground/20 bg-secondary/60 px-4 py-2">
                <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-bold uppercase tracking-wider">{ch.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{ch.range}</span>
              </div>
              <div className="grid gap-4 p-4 md:grid-cols-[1.5fr_1fr]">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Key predictions</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {related.length > 0 ? (
                      related.map((p) => (
                        <li key={p.id}>
                          <Link href={`/dossier/predictions/${p.id}`} className="flex gap-2 leading-snug hover:text-primary">
                            <span className="text-primary">—</span>
                            {p.claim}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="text-muted-foreground">Filed under adjacent chapters.</li>
                    )}
                  </ul>
                </div>
                <div className="border-l border-foreground/20 pl-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Critical uncertainty</p>
                  <p className="mt-2 text-sm leading-snug">{uncertainty?.counter}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
