/**
 * Illuminated plate — a gilded, parchment-vignetted image frame.
 * Content-agnostic: give it any image + caption from your corpus.
 */
import { cx } from "./utils"

export function Plate({
  src,
  alt,
  caption,
  ratio = "aspect-[3/4]",
  className,
}: {
  src: string
  alt: string
  /** Small gilded caption shown over the base of the plate. */
  caption?: string
  /** Tailwind aspect-ratio class. */
  ratio?: string
  className?: string
}) {
  return (
    <figure className={cx("parchment gild-frame relative overflow-hidden", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        crossOrigin="anonymous"
        className={cx(ratio, "w-full object-cover")}
      />
      {caption ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/85 to-transparent p-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-gild">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  )
}
