import Link from "next/link"
import { compiledOn } from "@/lib/canon-data"

/**
 * Canon site header — the artifact wordmark over a thin instrument sub-bar.
 * Uses only manuscript-ds tokens/utilities so it travels with the theme.
 */
export function CanonHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
        <Link href="/canon" className="group flex flex-col leading-none">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-instrument">
            Personal reference copy
          </span>
          <span className="mt-1 font-serif text-lg font-semibold tracking-tight group-hover:text-gild">
            The Singularity Canon
          </span>
        </Link>
        <nav className="flex items-center gap-5 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
          <Link href="/canon" className="transition-colors hover:text-foreground">
            Contents
          </Link>
          <Link href="/canon/chronology" className="transition-colors hover:text-foreground">
            Chronology
          </Link>
          <Link href="/" className="transition-colors hover:text-foreground">
            Mockups
          </Link>
          <span className="hidden text-gild sm:inline" aria-hidden>
            {"//"}
          </span>
          <span className="hidden tabular-nums text-instrument sm:inline">{compiledOn}</span>
        </nav>
      </div>
      <div className="hud-scan h-1 w-full border-t border-instrument/25" aria-hidden />
    </header>
  )
}
