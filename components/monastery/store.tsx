"use client"

import { createContext, useContext, useState } from "react"
import { years, type TrajectoryId } from "@/lib/atlas-data"

interface MonasteryState {
  trajectory: TrajectoryId
  setTrajectory: (t: TrajectoryId) => void
  yearIdx: number
  setYearIdx: (i: number) => void
  year: number
}

const Ctx = createContext<MonasteryState | null>(null)

export function MonasteryProvider({ children }: { children: React.ReactNode }) {
  const [trajectory, setTrajectory] = useState<TrajectoryId>("race")
  const [yearIdx, setYearIdx] = useState(3)
  return (
    <Ctx.Provider value={{ trajectory, setTrajectory, yearIdx, setYearIdx, year: years[yearIdx] }}>
      {children}
    </Ctx.Provider>
  )
}

export function useMonastery() {
  const v = useContext(Ctx)
  if (!v) throw new Error("useMonastery must be used inside MonasteryProvider")
  return v
}
