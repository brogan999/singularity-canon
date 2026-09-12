"use client"

import { createContext, useContext, useState } from "react"
import type { TrajectoryId } from "@/lib/atlas-data"

interface AtlasState {
  trajectory: TrajectoryId
  setTrajectory: (t: TrajectoryId) => void
  year: number
  setYear: (y: number) => void
}

const Ctx = createContext<AtlasState | null>(null)

export function MuseumProvider({ children }: { children: React.ReactNode }) {
  const [trajectory, setTrajectory] = useState<TrajectoryId>("race")
  const [year, setYear] = useState<number>(2030)
  return (
    <Ctx.Provider value={{ trajectory, setTrajectory, year, setYear }}>{children}</Ctx.Provider>
  )
}

export function useAtlas() {
  const v = useContext(Ctx)
  if (!v) throw new Error("useAtlas must be used inside MuseumProvider")
  return v
}
