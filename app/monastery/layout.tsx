import type React from "react"
import { MonasteryProvider } from "@/components/monastery/store"
import { TopStrip, LeftNav, TerminalStrip } from "@/components/monastery/chrome"

export default function MonasteryLayout({ children }: { children: React.ReactNode }) {
  return (
    <MonasteryProvider>
      <div className="theme-monastery min-h-screen bg-background text-foreground">
        <TopStrip />
        <div className="mx-auto flex max-w-[1500px]">
          <LeftNav />
          <div className="min-w-0 flex-1 px-6 py-8 lg:px-10">{children}</div>
          <TerminalStrip />
        </div>
      </div>
    </MonasteryProvider>
  )
}
