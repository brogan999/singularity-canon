/**
 * Illuminated Manuscript design system — public API.
 *
 *   import { ManuscriptShell, ArtifactLayout, Folio, FolioHeading,
 *            InstrumentPanel, Meter, Plate } from "@/manuscript-ds"
 *
 * Remember to import the stylesheet once (after Tailwind) and load fonts:
 *   import "@/manuscript-ds/theme.css"
 *   import { manuscriptFontVars } from "@/manuscript-ds/fonts"
 */
export { cx } from "./utils"
export { manuscriptFontVars, fraunces, jetbrainsMono, geist } from "./fonts"

// Artifact layer (the loud parchment page)
export { ManuscriptShell, ArtifactLayout, Folio, FolioLabel, FolioHeading, FolioProse } from "./folio"

// Instrument layer (the thin cyan HUD)
export {
  InstrumentPanel,
  Meter,
  InstrumentToggle,
  InstrumentScrubber,
  InstrumentSearch,
  InstrumentMargin,
} from "./instrument"

// Illuminated imagery
export { Plate } from "./plate"
