import type React from "react"
import { GalleryProvider } from "@/components/gallery/store"
import { GalleryHeader, GalleryFooter } from "@/components/gallery/chrome"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <GalleryProvider>
      <div className="theme-gallery min-h-screen bg-background text-foreground">
        <GalleryHeader />
        <main>{children}</main>
        <GalleryFooter />
      </div>
    </GalleryProvider>
  )
}
