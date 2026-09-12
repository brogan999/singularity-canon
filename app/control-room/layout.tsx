import type { Metadata } from "next"
import { ControlProvider } from "@/components/control/store"
import { ControlHeader, ControlSidebar } from "@/components/control/chrome"
import { EventDrawer } from "@/components/control/parts"

export const metadata: Metadata = {
  title: "Control Room — Singularity Impact Atlas",
  description: "An instrument panel for a live, scenario-driven world-state of advanced AI.",
}

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <ControlProvider>
      <div className="theme-control min-h-screen bg-background font-mono text-foreground">
        <ControlHeader />
        <div className="flex">
          <ControlSidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <EventDrawer />
      </div>
    </ControlProvider>
  )
}
