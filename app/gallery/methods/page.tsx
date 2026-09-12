"use client"

import { siteMeta } from "@/lib/atlas-data"

export default function GalleryAbout() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">About the collection</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        The future is the docent
      </h1>

      <div className="mt-6 space-y-5 font-serif text-lg leading-relaxed text-muted-foreground">
        <p>
          The Gallery of Futures hangs each domain as a single allegorical painting. Stand before a frame and
          a holographic plaque — the instrument layer — fades in to read out the predictions clustered behind
          the image, their divergence, and the years they run hottest.
        </p>
        <p>
          {siteMeta.blurb} The paintings are the loud, human layer; the plaques are the thin, measured one.
          The gallery lighting is the scenario: changing it re-reads every readout in the building.
        </p>
      </div>

      <section className="mt-10 border-t border-border pt-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-instrument">The two layers</h2>
        <dl className="mt-4 space-y-4 font-serif">
          <div>
            <dt className="font-semibold text-foreground">The painting (artifact)</dt>
            <dd className="text-muted-foreground">Gilded frames and allegory — what you see across the room.</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">The plaque (instrument)</dt>
            <dd className="text-muted-foreground">Docent readouts, divergence, and time-heat — what you read up close.</dd>
          </div>
        </dl>
      </section>

      <p className="mt-10 border-t border-border pt-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        {siteMeta.subtitle} · Gallery edition · mockup
      </p>
    </div>
  )
}
