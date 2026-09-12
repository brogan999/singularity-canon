"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import type { Confidence, Divergence } from "@/lib/atlas-data"

const tabs = [
  { href: "/dossier", label: "Start Here" },
  { href: "/dossier/index", label: "Index" },
  { href: "/dossier/compare", label: "Compare" },
  { href: "/dossier/timeline", label: "Timeline" },
  { href: "/dossier/about", label: "About" },
]

export function DossierHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b-2 border-foreground/80">
      <div className="mx-auto max-w-5xl px-6 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3.5" /> Mockups
            </Link>
            <Link href="/dossier">
              <h1 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">Singularity Field Manual</h1>
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">Predictions indexed by domain, timeframe, and scenario.</p>
          </div>
          <span className="stamp mt-2 hidden shrink-0 px-3 py-1.5 text-xs font-bold uppercase sm:block">Declassified</span>
        </div>

        <nav className="mt-6 flex flex-wrap gap-0" aria-label="Sections">
          {tabs.map((t) => {
            const active = t.href === "/dossier" ? pathname === "/dossier" : pathname.startsWith(t.href)
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`-mb-px border-x border-t px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                  active
                    ? "border-foreground/80 bg-card font-bold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export function DossierFooter() {
  return (
    <footer className="border-t-2 border-foreground/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground">
        <p>FILE REF: SIA-001 · Rev. 3</p>
        <p className="uppercase tracking-wider">Handle per epistemic policy — see About</p>
      </div>
    </footer>
  )
}

export function SectionTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em]">
      <span className="grid size-6 place-items-center border border-foreground/60 text-xs">{n}</span>
      {children}
    </h2>
  )
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[0.6rem] uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}

export function Pill({ v }: { v: Confidence | Divergence }) {
  const strong = v === "High"
  return (
    <span
      className={`inline-block border px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider ${
        strong ? "border-primary text-primary" : "border-foreground/40 text-muted-foreground"
      }`}
    >
      {v}
    </span>
  )
}
