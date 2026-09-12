/**
 * Illuminated Manuscript — font setup for Next.js (App Router).
 *
 * Fraunces  → the artifact voice (serif display + body)
 * JetBrains → the instrument voice (mono HUD readouts)
 * Geist     → neutral sans fallback for dense UI
 *
 * USAGE (app/layout.tsx):
 *   import { manuscriptFontVars } from "@/manuscript-ds/fonts"
 *   <html className={manuscriptFontVars}> ... </html>
 *
 * The CSS variables below are what theme.css maps into --font-serif /
 * --font-mono / --font-sans, so `font-serif` and `font-mono` just work.
 */
import { Geist, Fraunces, JetBrains_Mono } from "next/font/google"

export const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
export const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })
export const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

/** Space-joined className string of all three font variables. */
export const manuscriptFontVars = `${geist.variable} ${fraunces.variable} ${jetbrainsMono.variable}`
