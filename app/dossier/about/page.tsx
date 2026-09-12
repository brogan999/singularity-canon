import Link from "next/link"
import { predictions } from "@/lib/atlas-data"
import { SectionTitle } from "@/components/dossier/chrome"

export default function DossierAbout() {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div>
        <SectionTitle n="F">Methods & epistemics</SectionTitle>
        <dl className="mt-4 space-y-4 text-sm">
          {[
            ["What counts as a prediction", "A single claim with a defined time window that could be shown false."],
            ["Confidence levels", "Low / Medium / High — deliberately coarse, and always revisable."],
            ["Update policy", "New disconfirming evidence or a passed window triggers a logged revision."],
            ["Citation philosophy", "Every entry carries its receipts and at least one steelmanned counterargument."],
          ].map(([t, d]) => (
            <div key={t} className="border-l-2 border-foreground/40 pl-3">
              <dt className="font-bold">{t}</dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <SectionTitle n="G">Known disagreements</SectionTitle>
        <ul className="mt-4 space-y-3">
          {predictions
            .filter((p) => p.divergence === "High")
            .map((p, i) => (
              <li key={p.id} className="border border-foreground/40 bg-card p-3 text-sm">
                <div className="flex items-start gap-2">
                  <sup className="text-primary">{i + 1}</sup>
                  <div>
                    <Link href={`/dossier/predictions/${p.id}`} className="leading-snug hover:text-primary">{p.claim}</Link>
                    <p className="mt-1.5 text-xs italic text-muted-foreground">Counter: {p.counter}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
