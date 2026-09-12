import type React from "react"
import { ManuscriptProvider } from "@/components/manuscript/store"
import { ManuscriptHeader, InstrumentMargin } from "@/components/manuscript/chrome"

export default function ManuscriptLayout({ children }: { children: React.ReactNode }) {
  return (
    <ManuscriptProvider>
      <div className="theme-manuscript min-h-screen bg-background text-foreground">
        <ManuscriptHeader />
        <div className="mx-auto flex max-w-[1400px] gap-0 px-6">
          <div className="min-w-0 flex-1 py-10 lg:pr-10">{children}</div>
          <InstrumentMargin />
        </div>
      </div>
    </ManuscriptProvider>
  )
}
