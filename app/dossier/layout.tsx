import type { Metadata } from "next"
import { DossierHeader, DossierFooter } from "@/components/dossier/chrome"

export const metadata: Metadata = {
  title: "Field Manual — Singularity Impact Atlas",
  description: "An investigative field manual: predictions indexed by domain, timeframe, and scenario.",
}

export default function DossierLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-dossier paper-grain flex min-h-screen flex-col bg-background font-mono text-foreground">
      <DossierHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
      <DossierFooter />
    </div>
  )
}
