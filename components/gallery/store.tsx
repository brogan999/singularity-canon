"use client"

import { createContext, useContext, useState } from "react"
import type { TrajectoryId } from "@/lib/atlas-data"

interface GalleryState {
  trajectory: TrajectoryId
  setTrajectory: (t: TrajectoryId) => void
  year: number
  setYear: (y: number) => void
}

const Ctx = createContext<GalleryState | null>(null)

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [trajectory, setTrajectory] = useState<TrajectoryId>("race")
  const [year, setYear] = useState(2030)
  return (
    <Ctx.Provider value={{ trajectory, setTrajectory, year, setYear }}>{children}</Ctx.Provider>
  )
}

export function useGallery() {
  const v = useContext(Ctx)
  if (!v) throw new Error("useGallery must be used inside GalleryProvider")
  return v
}
