import type { ReactNode } from "react"
import type { Metadata } from "next"
import { ManuscriptShell } from "@/manuscript-ds"
import { CanonHeader } from "@/components/canon/chrome"

export const metadata: Metadata = {
  title: "The Singularity Canon — Illuminated Edition",
  description:
    "104 forecasts, arguments, and fictions on the singularity, set as an illuminated manuscript with a live instrument margin.",
}

export default function CanonLayout({ children }: { children: ReactNode }) {
  return (
    <ManuscriptShell>
      <CanonHeader />
      {children}
    </ManuscriptShell>
  )
}
