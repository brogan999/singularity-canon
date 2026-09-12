/**
 * Artifact-layer primitives (the "loud" parchment page).
 * All content-agnostic — pass your own corpus content as children/props.
 */
import type { ReactNode } from "react"
import { cx } from "./utils"

/** Wrap a full surface in the Manuscript theme. Put this at a layout root. */
export function ManuscriptShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cx("theme-manuscript min-h-screen bg-background font-sans text-foreground", className)}>
      {children}
    </div>
  )
}

/**
 * The two-layer reading layout: a wide artifact column with a thin, sticky
 * instrument margin on the right. Pass the margin content via `margin`.
 */
export function ArtifactLayout({
  children,
  margin,
  className,
}: {
  children: ReactNode
  margin?: ReactNode
  className?: string
}) {
  return (
    <div className={cx("mx-auto flex max-w-[1400px] gap-0 px-6", className)}>
      <main className="min-w-0 flex-1 py-10">{children}</main>
      {margin ? <div className="hidden lg:block">{margin}</div> : null}
    </div>
  )
}

/** Small mono uppercase label in the instrument voice. */
export function FolioLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("font-mono text-[0.7rem] uppercase tracking-[0.3em] text-instrument", className)}>
      {children}
    </p>
  )
}

/** A serif display heading — the artifact voice. */
export function FolioHeading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: ReactNode
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  const size = Tag === "h1" ? "text-4xl md:text-5xl" : Tag === "h2" ? "text-2xl md:text-3xl" : "text-xl"
  return (
    <Tag className={cx("text-balance font-serif font-semibold leading-tight tracking-tight", size, className)}>
      {children}
    </Tag>
  )
}

/** A vertical section of the page with generous rhythm. */
export function Folio({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cx("border-t border-border py-10 first:border-t-0", className)}>{children}</section>
}

/**
 * Body prose with an optional illuminated drop-cap on the first paragraph.
 * Keep the measure narrow for readability (max-w-prose).
 */
export function FolioProse({
  children,
  dropCap = false,
  className,
}: {
  children: ReactNode
  dropCap?: boolean
  className?: string
}) {
  return (
    <div
      className={cx(
        "max-w-prose font-serif text-lg leading-relaxed text-foreground/90 [&>p+p]:mt-4",
        dropCap && "drop-cap",
        className,
      )}
    >
      {children}
    </div>
  )
}
