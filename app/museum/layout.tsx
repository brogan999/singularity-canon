import type { Metadata } from "next"
import { MuseumProvider } from "@/components/museum/store"
import { MuseumHeader, MuseumFooter } from "@/components/museum/chrome"

export const metadata: Metadata = {
  title: "Museum of Futures — Singularity Impact Atlas",
  description: "A curated, exhibit-style walk through plausible futures of advanced AI.",
}

export default function MuseumLayout({ children }: { children: React.ReactNode }) {
  return (
    <MuseumProvider>
      <div className="theme-museum flex min-h-screen flex-col bg-background font-sans text-foreground">
        <MuseumHeader />
        <div className="flex-1">{children}</div>
        <MuseumFooter />
      </div>
    </MuseumProvider>
  )
}
