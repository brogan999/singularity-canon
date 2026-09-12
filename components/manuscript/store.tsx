"use client"

import { createContext, useContext, useState } from "react"
import { years, type TrajectoryId } from "@/lib/atlas-data"

interface ManuscriptState {
  trajectory: TrajectoryId
  setTrajectory: (t: TrajectoryId) => void
  yearIdx: number
  setYearIdx: (i: number) => void
  year: number
}

const Ctx = createContext<ManuscriptState | null>(null)

export function ManuscriptProvider({ children }: { children: React.ReactNode }) {
  const [trajectory, setTrajectory] = useState<TrajectoryId>("race")
  const [yearIdx, setYearIdx] = useState(2)
  return (
    <Ctx.Provider value={{ trajectory, setTrajectory, yearIdx, setYearIdx, year: years[yearIdx] }}>
      {children}
    </Ctx.Provider>
  )
}

export function useManuscript() {
  const v = useContext(Ctx)
  if (!v) throw new Error("useManuscript must be used inside ManuscriptProvider")
  return v
}
