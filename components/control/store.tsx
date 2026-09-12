"use client"

import { createContext, useContext, useState } from "react"
import type { Prediction, TrajectoryId } from "@/lib/atlas-data"

interface ControlState {
  trajectory: TrajectoryId
  setTrajectory: (t: TrajectoryId) => void
  year: number
  setYear: (y: number) => void
  drawer: Prediction | null
  setDrawer: (p: Prediction | null) => void
}

const Ctx = createContext<ControlState | null>(null)

export function ControlProvider({ children }: { children: React.ReactNode }) {
  const [trajectory, setTrajectory] = useState<TrajectoryId>("race")
  const [year, setYear] = useState<number>(2030)
  const [drawer, setDrawer] = useState<Prediction | null>(null)
  return (
    <Ctx.Provider value={{ trajectory, setTrajectory, year, setYear, drawer, setDrawer }}>
      {children}
    </Ctx.Provider>
  )
}

export function useControl() {
  const v = useContext(Ctx)
  if (!v) throw new Error("useControl must be used inside ControlProvider")
  return v
}
