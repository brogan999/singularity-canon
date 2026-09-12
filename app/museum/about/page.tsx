import Link from "next/link"
import { predictions } from "@/lib/atlas-data"
import { SectionLabel } from "@/components/museum/chrome"

const faqs: [string, string][] = [
  ["What is a prediction card?", "A single falsifiable claim with a time window, impact bars, and its receipts."],
  ["What are trajectories?", "Named scenarios that change which claims are most likely and most divergent."],
  ["What does confidence mean?", "A qualitative Low / Medium / High read, kept honest and revisable."],
  ["How updates work", "Every card is versioned; revisions are logged when the evidence moves."],
  ["Where do the numbers come from?", "Domain pressure is derived from authored base rates plus per-trajectory modifiers interpolated across the timeline."],
  ["Is this a forecast?", "No — it is a structured map of plausible impacts, meant to be argued with, not a point prediction."],
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <SectionLabel>How to read the exhibit</SectionLabel>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Methods & epistemics.</h1>
      <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        This exhibit is a structured library, not a crystal ball. Everything here is authored to be
        revisable, cited, and falsifiable.
      </p>

      <dl className="mt-10 grid gap-8 sm:grid-cols-2">
        {faqs.map(([q, a]) => (
          <div key={q} className="border-l-2 border-primary pl-4">
            <dt className="font-serif text-lg font-semibold leading-tight tracking-tight">{q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-14 rounded-sm border border-border bg-card p-6 md:p-8">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Known high-divergence claims</p>
        <ul className="mt-4 space-y-3">
          {predictions
            .filter((p) => p.divergence === "High")
            .map((p) => (
              <li key={p.id}>
                <Link href={`/museum/predictions/${p.id}`} className="group flex gap-3">
                  <span className="text-primary">·</span>
                  <span className="font-serif leading-snug group-hover:text-primary">{p.claim}</span>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/museum/atlas" className="rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
          Explore the Atlas
        </Link>
        <Link href="/museum/predictions" className="rounded-sm border border-border px-5 py-3 text-sm font-medium hover:border-foreground/40">
          Browse all placards
        </Link>
      </div>
    </div>
  )
}
