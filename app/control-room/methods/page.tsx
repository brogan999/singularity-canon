"use client"

import Link from "next/link"
import { predictions } from "@/lib/atlas-data"
import { useControl } from "@/components/control/store"
import { SectionHead } from "@/components/control/parts"

export default function ControlMethods() {
  const { setDrawer } = useControl()
  return (
    <div className="p-6 lg:p-10">
      <SectionHead index="M" title="Model + assumptions" note="authored vs computed" />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Authored", "Claims, time windows, evidence, and counterarguments are written by hand."],
          ["Computed", "Domain pressure and deltas are derived from base rates + trajectory modifiers."],
          ["Versioned", "Readings carry a revision log; the model is restated as evidence moves."],
        ].map(([h, b]) => (
          <div key={h} className="border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{h}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <SectionHead index="·" title="How pressure is computed" />
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li className="border-l-2 border-primary pl-4">
            Each domain carries an authored baseline and a modifier per trajectory.
          </li>
          <li className="border-l-2 border-primary pl-4">
            The modifier is scaled by how far the selected year sits along the 2024–2050 window.
          </li>
          <li className="border-l-2 border-primary pl-4">
            The result is clamped to 0–100 and rendered as meters, radar spokes, and sparklines.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <SectionHead index="·" title="Open questions" note="high-divergence claims" />
        <ul className="mt-4 space-y-3">
          {predictions
            .filter((p) => p.divergence === "High")
            .map((p) => (
              <li key={p.id} className="border border-border bg-card p-4">
                <p className="font-sans text-sm leading-snug">{p.claim}</p>
                <button onClick={() => setDrawer(p)} className="mt-2 text-[0.7rem] uppercase tracking-wider text-accent hover:underline">
                  open report →
                </button>
              </li>
            ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/control-room/predictions" className="rounded-md bg-primary px-4 py-2.5 text-xs uppercase tracking-wider text-primary-foreground">
          Browse prediction registry
        </Link>
        <Link href="/control-room/trajectories" className="rounded-md border border-border px-4 py-2.5 text-xs uppercase tracking-wider hover:bg-secondary">
          Compare trajectories
        </Link>
      </div>
    </div>
  )
}
