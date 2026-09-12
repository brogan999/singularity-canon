"use client"

import { domains, trajectories } from "@/lib/atlas-data"
import { useGallery } from "@/components/gallery/store"
import { GalleryFrame } from "@/components/gallery/chrome"

export default function GalleryRooms() {
  const { trajectory } = useGallery()
  const active = trajectories.find((t) => t.id === trajectory)!

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument">The galleries</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Choose a room
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
        Eight rooms, each hung with a single allegory. Approach a frame to hear the docent; enter to read
        the wall text and the predictions it holds. Lighting is set to {active.short}.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {domains.map((d) => (
          <GalleryFrame key={d.id} domain={d} traj={trajectory} />
        ))}
      </div>
    </div>
  )
}
