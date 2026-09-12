// Shared content model for the Singularity Impact Atlas mockups.
// All three mockups (Museum, Control Room, Dossier) render from these objects.

export type TrajectoryId = "race" | "governed" | "multipolar"

export interface Trajectory {
  id: TrajectoryId
  name: string
  short: string
  tagline: string
  assumptions: string[]
  outcomes: string[]
}

export const trajectories: Trajectory[] = [
  {
    id: "race",
    name: "Race / Fast Takeoff",
    short: "Race",
    tagline: "Competition compresses the timeline; capability outruns coordination.",
    assumptions: [
      "Labs and states prioritize speed over guarantees",
      "Compute scales without hard regulatory ceilings",
      "Alignment work lags deployment",
    ],
    outcomes: [
      "Rapid automation across knowledge work",
      "Volatile markets and concentrated gains",
      "Emergency governance improvised under pressure",
    ],
  },
  {
    id: "governed",
    name: "Governed / Slowdown",
    short: "Governed",
    tagline: "Deliberate throttles buy time for institutions to adapt.",
    assumptions: [
      "Binding evaluations gate frontier releases",
      "International compute accords hold",
      "Public investment cushions displacement",
    ],
    outcomes: [
      "Slower but broader diffusion of benefits",
      "Retraining and safety nets scale with capability",
      "Trust infrastructure keeps pace with synthetic media",
    ],
  },
  {
    id: "multipolar",
    name: "Multipolar",
    short: "Multipolar",
    tagline: "Many capable actors, no single steering wheel.",
    assumptions: [
      "Capability is widely distributed and open",
      "Blocs pursue divergent standards",
      "No actor can unilaterally pause",
    ],
    outcomes: [
      "Fragmented norms and interoperability fights",
      "Regional divergence in rights and access",
      "Persistent low-grade contestation online",
    ],
  },
]

export type DomainId =
  | "economy"
  | "work"
  | "culture"
  | "politics"
  | "security"
  | "technology"
  | "biology"
  | "daily"

export interface Domain {
  id: DomainId
  name: string
  thesis: string
  base: number // baseline pressure 0-100
  // pressure modifier per trajectory
  mod: Record<TrajectoryId, number>
}

export const domains: Domain[] = [
  {
    id: "economy",
    name: "Economy",
    thesis: "Value migrates from labor to capital and compute as production automates.",
    base: 52,
    mod: { race: 34, governed: 12, multipolar: 22 },
  },
  {
    id: "work",
    name: "Work & Education",
    thesis: "The map of who does what is redrawn faster than credentials can follow.",
    base: 55,
    mod: { race: 32, governed: 14, multipolar: 20 },
  },
  {
    id: "culture",
    name: "Culture & Meaning",
    thesis: "Abundance of synthetic media reshapes taste, authorship, and belief.",
    base: 44,
    mod: { race: 28, governed: 16, multipolar: 30 },
  },
  {
    id: "politics",
    name: "Politics & Governance",
    thesis: "States improvise new instruments to keep pace with private capability.",
    base: 48,
    mod: { race: 33, governed: 10, multipolar: 26 },
  },
  {
    id: "security",
    name: "Security & Conflict",
    thesis: "Offense-defense balances shift as autonomous tools become cheap.",
    base: 41,
    mod: { race: 30, governed: 13, multipolar: 31 },
  },
  {
    id: "technology",
    name: "Technology & Infrastructure",
    thesis: "Compute, energy, and models become the load-bearing layer of the economy.",
    base: 58,
    mod: { race: 30, governed: 18, multipolar: 20 },
  },
  {
    id: "biology",
    name: "Biology & Health",
    thesis: "Discovery accelerates; access and safety become the contested frontier.",
    base: 39,
    mod: { race: 26, governed: 20, multipolar: 18 },
  },
  {
    id: "daily",
    name: "Daily Life & Relationships",
    thesis: "Companionship, attention, and routine quietly restructure around agents.",
    base: 36,
    mod: { race: 24, governed: 15, multipolar: 22 },
  },
]

export const years = [2024, 2027, 2030, 2035, 2040, 2050] as const
export type Year = (typeof years)[number]

// World captions per year for the timeline corridor.
export const yearCaptions: Record<number, { caption: string; tag: string }> = {
  2024: { caption: "Frontier models cross into reliable autonomy for narrow tasks.", tag: "Baseline" },
  2027: { caption: "Agentic systems handle multi-step work end to end.", tag: "Acceleration" },
  2030: { caption: "Automation cascades through knowledge and coordination work.", tag: "Cascade" },
  2035: { caption: "Institutions consolidate around new capability and its risks.", tag: "Consolidation" },
  2040: { caption: "Material abundance collides with unevenly distributed power.", tag: "Divergence" },
  2050: { caption: "A recognizably post-transition world, still deeply contested.", tag: "Transformation" },
}

// Deterministic pressure reading for a domain at a given year + trajectory (0-100).
export function domainPressure(domain: Domain, year: number, trajectory: TrajectoryId): number {
  const yearIndex = years.indexOf(year as Year)
  const yearFactor = yearIndex / (years.length - 1) // 0..1
  const raw = domain.base + domain.mod[trajectory] * yearFactor
  return Math.max(0, Math.min(100, Math.round(raw)))
}

export type Confidence = "Low" | "Medium" | "High"
export type Divergence = "Low" | "Medium" | "High"

export interface Prediction {
  id: string
  claim: string
  timeWindow: string
  domains: DomainId[]
  confidence: Confidence
  divergence: Divergence
  // qualitative impact per domain, 0-100, for impact bars
  impacts: Partial<Record<DomainId, number>>
  // how much trajectories disagree, per trajectory outcome sketch
  delta: Record<TrajectoryId, string>
  evidence: string[]
  counter: string
}

export const predictions: Prediction[] = [
  {
    id: "labor-displacement",
    claim: "Automation displaces a majority of routine knowledge tasks in advanced economies.",
    timeWindow: "2031 – 2034",
    domains: ["economy", "work"],
    confidence: "Medium",
    divergence: "High",
    impacts: { economy: 88, work: 92, politics: 61, daily: 48 },
    delta: {
      race: "Displacement outpaces safety nets; sharp dislocation and unrest.",
      governed: "Phased rollout with retraining absorbs most of the shock.",
      multipolar: "Uneven by region; leaders surge, laggards protect jobs.",
    },
    evidence: [
      "Task-exposure studies show the majority of white-collar tasks are automatable in principle.",
      "Agentic tool adoption curves are steeper than prior general-purpose technologies.",
    ],
    counter: "Job creation in new categories has historically offset automation over decades.",
  },
  {
    id: "emergency-powers",
    claim: "At least one major democracy adopts standing emergency AI governance powers.",
    timeWindow: "2029 – 2033",
    domains: ["politics", "security"],
    confidence: "Medium",
    divergence: "High",
    impacts: { politics: 84, security: 66, economy: 44, culture: 39 },
    delta: {
      race: "Powers arrive reactively after a crisis, with weak oversight.",
      governed: "Powers are pre-negotiated with sunset clauses and review.",
      multipolar: "Divergent regimes; coordination stalls across blocs.",
    },
    evidence: [
      "Precedent from financial and pandemic emergencies shows fast expansion of executive tools.",
      "Frontier compute is concentrated enough to be a regulatory choke point.",
    ],
    counter: "Legislatures may resist ceding durable authority absent an acute, legible trigger.",
  },
  {
    id: "synthetic-trust",
    claim: "Synthetic media erodes default trust in unauthenticated audio and video.",
    timeWindow: "2027 – 2030",
    domains: ["culture", "politics"],
    confidence: "High",
    divergence: "Medium",
    impacts: { culture: 82, politics: 70, security: 55, daily: 50 },
    delta: {
      race: "Authentication lags; trust collapses before tooling catches up.",
      governed: "Provenance standards ship early and hold the line.",
      multipolar: "Competing standards leave gaps adversaries exploit.",
    },
    evidence: [
      "Generation quality already exceeds casual human detection thresholds.",
      "Provenance and watermarking standards remain fragmented and voluntary.",
    ],
    counter: "Cryptographic provenance could become ubiquitous and restore a trust baseline.",
  },
  {
    id: "compute-accord",
    claim: "A binding international compute-monitoring accord is signed by top producers.",
    timeWindow: "2030 – 2036",
    domains: ["politics", "technology", "security"],
    confidence: "Low",
    divergence: "High",
    impacts: { politics: 72, technology: 68, security: 60 },
    delta: {
      race: "No accord; monitoring is unilateral and contested.",
      governed: "Accord anchors the slowdown and enables verification.",
      multipolar: "Partial accords among blocs, not global.",
    },
    evidence: [
      "Compute supply chains have few chokepoints, making monitoring technically feasible.",
      "Arms-control precedents show verification regimes are possible under rivalry.",
    ],
    counter: "Strategic advantage from frontier compute creates strong incentives to defect.",
  },
  {
    id: "drug-discovery",
    claim: "AI-designed therapeutics reach approval at multiples of the current annual rate.",
    timeWindow: "2032 – 2038",
    domains: ["biology", "technology"],
    confidence: "Medium",
    divergence: "Medium",
    impacts: { biology: 86, technology: 58, economy: 44, daily: 40 },
    delta: {
      race: "Fast pipeline, thin safety review; access stays unequal.",
      governed: "Slower approvals, broader and safer access.",
      multipolar: "Regional approval races create arbitrage and divergence.",
    },
    evidence: [
      "Structure prediction and generative chemistry already compress early discovery.",
      "Trial design and biomarker discovery are increasingly model-assisted.",
    ],
    counter: "Clinical trials, not discovery, remain the binding constraint on approvals.",
  },
  {
    id: "companionship",
    claim: "Persistent AI companions become a routine part of daily life for a large minority.",
    timeWindow: "2028 – 2033",
    domains: ["daily", "culture"],
    confidence: "High",
    divergence: "Medium",
    impacts: { daily: 84, culture: 66, work: 44 },
    delta: {
      race: "Rapid, lightly regulated adoption; attention economics intensify.",
      governed: "Guardrails on minors and dependency shape the market.",
      multipolar: "Norms vary sharply by culture and jurisdiction.",
    },
    evidence: [
      "Companion apps already show high retention and daily engagement.",
      "Voice and memory features close the gap with human-feeling interaction.",
    ],
    counter: "Novelty churn and backlash could keep companions niche rather than routine.",
  },
]

export const siteMeta = {
  name: "Singularity Impact Atlas",
  subtitle: "A scenario-driven map of predictions",
  blurb:
    "A structured library of predictions, mapped to impacts across economic, social, political, cultural, and technological life.",
}

/* ---------- Lookups ---------- */

export function getDomain(id: string): Domain | undefined {
  return domains.find((d) => d.id === id)
}

export function getPrediction(id: string): Prediction | undefined {
  return predictions.find((p) => p.id === id)
}

export function getTrajectory(id: string): Trajectory | undefined {
  return trajectories.find((t) => t.id === id)
}

export function predictionsForDomain(id: DomainId): Prediction[] {
  return predictions.filter((p) => p.domains.includes(id))
}

// Confidence / divergence ranks for sorting.
export const confRank: Record<Confidence, number> = { High: 3, Medium: 2, Low: 1 }
export const divRank: Record<Divergence, number> = { High: 3, Medium: 2, Low: 1 }

// Rough magnitude used for delta bars.
export const magnitudeMap: Record<Confidence | Divergence, number> = { Low: 40, Medium: 68, High: 92 }

// Peak pressure a domain reaches across the full window for a trajectory.
export function peakPressure(domain: Domain, trajectory: TrajectoryId): number {
  return Math.max(...years.map((y) => domainPressure(domain, y, trajectory)))
}

// Renaissance allegory plate per domain (used by the dual-layer mockups).
export const domainArt: Record<DomainId, { src: string; allegory: string }> = {
  economy: { src: "/atlas/economy.png", allegory: "Commerce & Fortune" },
  work: { src: "/atlas/work.png", allegory: "Labor & Learning" },
  culture: { src: "/atlas/culture.png", allegory: "The Muses" },
  politics: { src: "/atlas/politics.png", allegory: "Governance & Justice" },
  security: { src: "/atlas/security.png", allegory: "War & Defense" },
  technology: { src: "/atlas/technology.png", allegory: "Invention" },
  biology: { src: "/atlas/biology.png", allegory: "Medicine & Life" },
  daily: { src: "/atlas/daily.png", allegory: "Hearth & Companionship" },
}

export const heroArt = { src: "/atlas/hero-fresco.png", allegory: "The Reaching Hands" }
