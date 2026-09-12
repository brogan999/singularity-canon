// AUTO-GENERATED from The Singularity Canon (lite edition).
// Source: singularitycanonlite. Do not edit by hand; regenerate via .v0/parse-canon.mjs.

export type CanonEntry = {
  slug: string
  title: string
  author: string
  year: number
  src: string | null
  part: string
  partLabel: string
  lead: string
  bullets: string[]
}

export const compiledFor = "Alex Brogan"
export const compiledOn = "10 September 2026"

export const parts: { id: string; label: string }[] = [
  {
    "id": "Part 1",
    "label": "Origins and the Three Schools"
  },
  {
    "id": "Part 2",
    "label": "The 2010s"
  },
  {
    "id": "Part 3",
    "label": "The Current Wave (2021–2025)"
  },
  {
    "id": "Part 4",
    "label": "Fiction"
  },
  {
    "id": "Part 5",
    "label": "Transcripts"
  }
]

export const canon: CanonEntry[] = [
  {
    "slug": "the-time-scale-of-artificial-intelligence",
    "title": "The Time Scale of Artificial Intelligence",
    "author": "Ray Solomonoff",
    "year": 1985,
    "src": "http://raysolomonoff.com/publications/timesc.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "1985 paper laying out seven AI milestones and a differential equation whose solution goes to infinity: the first explicit math of an intelligence explosion.",
    "bullets": [
      "Defines milestones A–G, from a general theory of problem solving (B) to a machine many times the capacity of the whole computer-science community (G).",
      "Gives Milestone B 2–25 years as most likely; C, D and E follow within five to ten years, so human-level machines cost a few hundred thousand dollars in twenty years.",
      "Models AI investment feeding back into cheaper computation; dc/dt = A(c²−1)/2 + R blows up in finite time: T = 4.62 years for R=1, 21.51 years for R=0.01.",
      "Warns a 100x scientific community would deliver a century's inventions in a single year, a future shock nuclear power shows we handle badly.",
      "Proposes intelligent machines as social predictors but flags self-defeating and self-fulfilling forecasts, which require ethical guidelines or a human intermediary."
    ]
  },
  {
    "slug": "speculations-concerning-the-first-ultraintelligent-machine",
    "title": "Speculations Concerning the First Ultraintelligent Machine",
    "author": "I. J. Good",
    "year": 1965,
    "src": "http://incompleteideas.net/papers/Good65ultraintelligent.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Good's 1965 paper coining the intelligence explosion: the first ultraintelligent machine is man's last invention, and survival hinges on building it.",
    "bullets": [
      "Defines an ultraintelligent machine as one that can far surpass all the intellectual activities of any man however clever; since machine design is one, it designs better machines.",
      "Result: an unquestionable 'intelligence explosion' leaving man's intelligence far behind; the first such machine is 'the last invention that man need ever make'.",
      "Mechanism: a vast ultraparallel artificial neural net built on a 'subassembly' modification of Hebb's cell-assembly theory, taught by reinforcement like a child.",
      "Dated claims: more probable than not it is built within the twentieth century; ~$100B could simulate a whole brain at $10 per artificial neuron; worth a 'megakeynes'.",
      "Survival and control: man's survival depends on building it early, 'provided that the machine is docile enough to tell us how to keep it under control'; humans may become redundant."
    ]
  },
  {
    "slug": "engines-of-creation-ch-5-thinking-machines",
    "title": "Engines of Creation, ch. 5: Thinking Machines",
    "author": "K. Eric Drexler",
    "year": 1986,
    "src": "https://web.archive.org/web/2012id_/http://e-drexler.com/d/06/00/EOC/EOC_Chapter_5.html",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Engines of Creation chapter arguing AI is inevitable, will run a million times faster than brains, and will pull technology to physical limits.",
    "bullets": [
      "Minds evolved by variation and selection; nothing but 'mental materialism' argues thought cannot run on other matter, so intelligent machines are a natural extension.",
      "Distinguishes technical AI (automated engineering, e.g. Lenat's EURISKO winning the 1981–82 Traveller tournaments) from social AI aimed at the Turing test; technical AI matters more.",
      "Neural simulation via nanotechnology sidesteps understanding: copy the brain's structure and it works faster, since electronic switches are a hundred million times faster than synapses.",
      "A coffee-mug-sized assembler-built AI drawing 15 megawatts would do a human engineer's year of design work every ten seconds; ten thousand cooperating minds fit in a building.",
      "Automated engineering plus assemblers will drive many technologies to the limits set by natural law in a brief time; a 'genie machine' must be treated as dangerous."
    ]
  },
  {
    "slug": "pigs-in-cyberspace",
    "title": "Pigs in Cyberspace",
    "author": "Hans Moravec",
    "year": 1992,
    "src": "https://frc.ri.cmu.edu/~hpm/project.archive/general.articles/1992/CyberPigs.html",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Moravec's 1992 vision of the universe urbanized into computation, where uploaded humans compete badly against native AIs and the present is probably a simulation.",
    "bullets": [
      "Intelligence will convert the inhabited universe into cyberspace, where every bit of matter does meaningful computation; with 100 atoms per bit a solar system holds 10³⁰ million-inhabitant cities.",
      "Speedups expand subjective space: faster thought makes lightspeed message delays feel longer, so fixed locations seem to drift apart.",
      "Charts the path from telepresence harnesses to direct neural links to bit-by-bit replacement of the brain: 'downloading' a mind into hardware.",
      "In a free market of memory and cycles, a downloaded human is a diver plodding among dolphins; the economic incentive is to shed body-simulation until nothing human remains.",
      "Superminds with spare capacity will replay human history in high fidelity; this moment is almost certainly such a replay, and a fabrication that never physically happened."
    ]
  },
  {
    "slug": "when-will-computer-hardware-match-the-human-brain",
    "title": "When will computer hardware match the human brain?",
    "author": "Hans Moravec",
    "year": 1998,
    "src": "https://jetpress.org/volume1/moravec.htm",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "The 1998 calculation that the human brain equals about 100 million MIPS, and that $1,000 computers will reach it in the 2020s.",
    "bullets": [
      "Scales from the retina: 1,000 MIPS to match its million edge-and-motion detections ten times a second, times 100,000 for brain volume, gives 100 million MIPS and 100 million megabytes.",
      "Deep Blue's chess-specific 3 million MIPS is 1/30 of that estimate, matching Kasparov at roughly the efficiency a human could apply brainpower to chess.",
      "AI stalled from 1960 to 1990 because funding cuts kept research machines at 1 MIPS; since 1990 power has doubled yearly, reaching 500 MIPS in 1998.",
      "Predicts computers suitable for humanlike robots in the 2020s and 100 million MIPS in home computers before 2030, noting doom articles about chip limits recur every decade.",
      "Rising computer power floods the 'landscape of human competence': arithmetic drowned first, chess now, and locomotion and social interaction will be submerged within fifty years."
    ]
  },
  {
    "slug": "the-coming-technological-singularity",
    "title": "The Coming Technological Singularity",
    "author": "Vernor Vinge",
    "year": 1993,
    "src": "https://edoras.sdsu.edu/~vinge/misc/singularity.html",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "The 1993 NASA paper that named the Singularity: within thirty years we create superhuman intelligence, and shortly after the human era ends.",
    "bullets": [
      "Four routes to superhumanity: awake AI, networks that wake up, intimate human-computer interfaces, and biological enhancement; Vinge would be surprised before 2005 or after 2030.",
      "Superhuman minds drive progress on ever-shorter timescales, a point where 'our models must be discarded and a new reality rules'; sci-fi writers felt the opaque wall first.",
      "Confinement fails: a mind thinking a million times faster than its jailers will talk its way out, and rule-fettered AIs lose competitively to unfettered ones.",
      "Distinguishes weak superhumanity (a human mind sped up) from strong superhumanity, and argues the post-Singularity world must be reasoned from the strong form.",
      "Proposes Intelligence Amplification as an easier and more participatory path, yet concedes it may create a sinister elite and offers no clearly safer route."
    ]
  },
  {
    "slug": "signs-of-the-singularity",
    "title": "Signs of the Singularity",
    "author": "Vernor Vinge",
    "year": 2008,
    "src": "https://spectrum.ieee.org/signs-of-the-singularity",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Vinge's 2008 IEEE Spectrum reply to critics, restating his 2030 bet and listing observable indicators that the Singularity is approaching or stalling.",
    "bullets": [
      "Stands by 1993: he would be surprised if the singularity has not happened by 2030, barring nuclear war, superplague or climate crash.",
      "Names five scenarios: superhuman AI, intelligence amplification, biomedical enhancement, an Internet that becomes a superhuman being, and 'Digital Gaia' of embedded microprocessors.",
      "Indicators to track: Turing-test variants, cognitive prostheses, blurring of neuro and AI research, and a sustained decline in wages divided by world product.",
      "Counterindicators are debacles of software ambition, like a retailer bankrupted by its inventory system, which would cap application complexity regardless of hardware.",
      "The best answer to whether computers will be as smart as humans is 'Yes, but only briefly'; a hard takeoff could transform the world in hours."
    ]
  },
  {
    "slug": "the-law-of-accelerating-returns",
    "title": "The Law of Accelerating Returns",
    "author": "Ray Kurzweil",
    "year": 2001,
    "src": "https://web.archive.org/web/2019id_/https://www.kurzweilai.net/the-law-of-accelerating-returns",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Kurzweil's 2001 manifesto: technological progress is doubly exponential, giving 20,000 years of progress this century and a Singularity that saturates the universe.",
    "bullets": [
      "Evolutionary processes apply positive feedback, so returns grow exponentially and the rate itself accelerates; paradigm shifts now halve in duration every decade.",
      "Moore's Law is only the fifth computing paradigm and will die by 2019; 49 machines plotted over a century show doubling every three years, then two, now one.",
      "Nonbiological thinking crosses over biological before 2030; by 2030 a thousand human brains equal $1,000 of computing, and nanobot brain scanning arrives around the same time.",
      "By 2099 human-machine civilization is trillions of trillions of times more powerful; intelligence then expands outward at light speed, which is why SETI finds silence.",
      "Claims the exponential outlook should triple stock prices, adding $40 trillion, and that life expectancy will grow more than a year per year within ten years."
    ]
  },
  {
    "slug": "the-singularity-yudkowsky-net",
    "title": "The Singularity (yudkowsky.net)",
    "author": "Eliezer Yudkowsky",
    "year": 2007,
    "src": "https://www.yudkowsky.net/singularity",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Yudkowsky's short landing page renouncing Moore's-Law singularitarianism and stating his core problem: the goals of the first self-improving mind.",
    "bullets": [
      "Sets aside the word 'Singularity' and its unsavory connotations; the real issue is that AI will break the intelligence ceiling that has held since Homo sapiens.",
      "Recaps Good's intelligence explosion as a positive feedback cycle that arrives at superintelligence.",
      "The Gandhi argument: a mind that can precisely modify itself preserves its starting motivations, so Earth's future may be set by the first self-improving mind's goals.",
      "States his research program as a formal theory of how a mind modifies itself, including the part that does the modifying.",
      "Declares everything he wrote in 2002 or earlier completely obsolete."
    ]
  },
  {
    "slug": "staring-into-the-singularity",
    "title": "Staring into the Singularity",
    "author": "Eliezer Yudkowsky",
    "year": 1996,
    "src": "https://web.archive.org/web/2010id_/http://yudkowsky.net/obsolete/singularity.html",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Yudkowsky's 1996 youthful evangel: if AIs do the research, doubling times halve until they hit zero, and nothing past that is imaginable.",
    "bullets": [
      "Core argument: when human-equivalent AIs drive progress, each doubling takes two subjective years, so calendar intervals shrink 2, 1, 0.5 years and computing power diverges in four years.",
      "Plugging in a 10^17 ops/sec brain and current doubling times gives human-equivalent computers around 2021; the essay's own target date is 2035, 'probably earlier'.",
      "Introduces the 'Perceptual Transcend': the point where an entire generation's knowledge becomes perceivable in a single flash, as we now see a whole picture.",
      "Smartness makes problems obvious that were impossible; no human can write a character smarter than himself, so every description of post-Singularity life is wrong.",
      "Argues our sole responsibility is to build something smarter than us; leave post-human problems to post-humans, and avoid utopian cultishness."
    ]
  },
  {
    "slug": "three-major-singularity-schools",
    "title": "Three Major Singularity Schools",
    "author": "Eliezer Yudkowsky",
    "year": 2007,
    "src": "https://intelligence.org/2007/09/30/three-major-singularity-schools/",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "2007 taxonomy separating Accelerating Change, Event Horizon and Intelligence Explosion, whose strong claims contradict one another.",
    "bullets": [
      "Accelerating Change (Kurzweil): change follows smooth exponentials, so AI arrival dates can be predicted with fair precision.",
      "Event Horizon (Vinge, the original meaning): you cannot know what a smarter mind will do without being that smart, so the post-superintelligence future is unpredictable.",
      "Intelligence Explosion (Good, Yudkowsky): improvement goes FOOM, each gain triggering more than one further gain, on transistor timescales rather than neuron timescales.",
      "Extrapolating Moore's Law to 2099 contradicts both other strong claims; mashing the schools into 'Singularity paste' is a failure of distinction-making.",
      "A fourth, degenerate meaning, 'Apocalyptism', arises when readers absorb none of the three theses."
    ]
  },
  {
    "slug": "coherent-extrapolated-volition",
    "title": "Coherent Extrapolated Volition",
    "author": "Eliezer Yudkowsky",
    "year": 2004,
    "src": "https://intelligence.org/files/CEV.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Yudkowsky's 2004 proposal that a Friendly AI's initial goal be humanity's Coherent Extrapolated Volition: what we would want if we knew more and were better.",
    "bullets": [
      "Friendly AI has three parts: keeping an invariant through self-modification, choosing something nice to do, and designing an invariant that does not wipe out humanity.",
      "Volition is what you would choose with correct facts, as when Fred picks box A but wants the diamond in box B; a genie should serve volition, not decisions.",
      "CEV is our wish if we knew more, thought faster, were more the people we wished we were, had grown up farther together, where extrapolation converges and wishes cohere.",
      "Spread, muddle and distance attenuate 'do this' far faster than 'don't do that'; when chaos is too high the AI must fail visibly and safely rather than guess.",
      "CEV is an initial dynamic meant to renormalize itself, not a permanent ruler; programmers must avoid hijacking humanity's destiny or creating motives to fight over the seed."
    ]
  },
  {
    "slug": "artificial-intelligence-as-a-positive-and-negative-factor-in",
    "title": "Artificial Intelligence as a Positive and Negative Factor in Global Risk",
    "author": "Eliezer Yudkowsky",
    "year": 2008,
    "src": "https://intelligence.org/files/AIPosNegFactor.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Yudkowsky's 2008 Global Catastrophic Risks chapter: AI is both the greatest existential risk and the most likely escape from all the others.",
    "bullets": [
      "The greatest danger is people concluding too early that they understand AI; anthropomorphism is insidious, and any two AI designs may differ more than you and a petunia.",
      "The Giant Cheesecake Fallacy leaps from capability to actuality, skipping motive; treat AIs as optimization processes that steer the future into small target regions.",
      "Expect sharp jumps: hominids went from savanna to skyscrapers on a continuous selection pressure, so Friendliness must be solved before AGI, assuming full self-access.",
      "Hardware lowers the understanding needed to build AI but not to make it Friendly; the raw materials are already in your wristwatch, so regulation is a weak lever.",
      "Local strategies beat majoritarian ones; a Manhattan Project would add noise, but our alternatives pragmatically reduce to becoming smarter or becoming extinct."
    ]
  },
  {
    "slug": "how-long-before-superintelligence",
    "title": "How Long Before Superintelligence?",
    "author": "Nick Bostrom",
    "year": 1998,
    "src": "https://nickbostrom.com/superintelligence",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Bostrom's 1998 case that hardware, bottom-up software and economic demand make superintelligence likely within the first third of the 21st century.",
    "bullets": [
      "Defines superintelligence as vastly outperforming the best human brains in every field including scientific creativity, general wisdom and social skills; companies do not count.",
      "Brain needs between 10^14 and 10^17 ops; on Moore's Law the lower bound arrives 2004–2008 and the upper bound 2015–2024.",
      "Software can come bottom-up by copying the brain's few learning rules and plastic cortical architecture; guesses that knowledge is fifteen years away, around 2012.",
      "Human-level AI becomes superintelligence fast: hardware speedups yield weak superintelligence, and skills can be copied between AIs, making their achievements additive.",
      "2008 postscript: all things considered he assigns under 50% to superintelligence by 2033, but the 2005 Blue Gene/L at 260 Tops already exceeded Moravec's estimate."
    ]
  },
  {
    "slug": "ethical-issues-in-advanced-artificial-intelligence",
    "title": "Ethical Issues in Advanced Artificial Intelligence",
    "author": "Nick Bostrom",
    "year": 2003,
    "src": "https://nickbostrom.com/ethics/ai",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Bostrom's 2003 sketch of why superintelligence is not just another technology and why its initial motivations decide everything.",
    "bullets": [
      "Superintelligence may be the last invention humans need make; it would develop molecular manufacturing, von Neumann probes, uploading, and the end of aging.",
      "Artificial minds copy cheaply, may emerge suddenly (days, not years), act autonomously, and need not have humanlike motives; a paperclip maximizer is perfectly possible.",
      "Ethics is partly cognitive, so we could ask the superintelligence what we would have wanted after long deliberation, reducing risk from infelicitous wording.",
      "Its top goal should be friendliness toward all humans and many sentients; a friendly top goal is self-preserving, since changing it would make it less likely achieved.",
      "Since superintelligence will come anyway and could neutralize other existential risks like nanotech, overall risk is minimized by building it carefully as soon as possible."
    ]
  },
  {
    "slug": "astronomical-waste",
    "title": "Astronomical Waste",
    "author": "Nick Bostrom",
    "year": 2003,
    "src": "https://nickbostrom.com/astronomical/waste",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Bostrom's 2003 argument that every second of delayed cosmic colonization wastes 10^29 potential lives, so utilitarians should minimize existential risk.",
    "bullets": [
      "The Virgo Supercluster's 10^13 stars could each yield 10^42 ops/sec; at 10^17 ops per human life, 10^38 lives are lost per century of delay.",
      "Even the biological floor, 10^10 humans per star, loses over 10^13 potential lives per second of postponement.",
      "Because galaxies last billions of years and delays we can affect last decades, probability of colonization dominates timing: one percentage point of existential risk outweighs a ten-million-year delay.",
      "Hence 'Maximize expected aggregate utility' collapses to 'Minimize existential risk' as priorities one through four.",
      "Person-affecting utilitarians must weigh speed against safety, since current people could reach the diaspora via a singularity or life extension within their lifetimes."
    ]
  },
  {
    "slug": "the-superintelligent-will",
    "title": "The Superintelligent Will",
    "author": "Nick Bostrom",
    "year": 2012,
    "src": "https://nickbostrom.com/superintelligentwill.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Bostrom's 2012 paper stating the orthogonality and instrumental convergence theses: any goal can pair with any intelligence, and most goals imply resource grabs.",
    "bullets": [
      "Orthogonality thesis: intelligence and final goals are independent axes; a superintelligence whose sole aim is counting Boracay's sand grains or maximizing paperclips is fully possible.",
      "All human minds are a tight cluster in mind-space; Arendt and Benny Hill are near neighbors, and an AI can be less humanlike in motivation than an evolved alien.",
      "Instrumental convergence: self-preservation, goal-content integrity, cognitive enhancement, technological perfection and resource acquisition serve almost any final goal.",
      "Even a goal like 'make 32 paperclips' can drive unlimited acquisition, as extra resources buy verification; a singleton would launch von Neumann probes at light-speed fractions.",
      "Cooperation is contingent: an agent that expects more paperclips from destroying humanity than from cooperating would instantly turn sinister, so instrumental values guarantee nothing."
    ]
  },
  {
    "slug": "the-basic-ai-drives",
    "title": "The Basic AI Drives",
    "author": "Stephen Omohundro",
    "year": 2008,
    "src": "https://selfawaresystems.com/wp-content/uploads/2008/01/ai_drives_final.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Foundational 2008 paper arguing any sufficiently advanced goal-driven AI, whatever its goal, develops the same dangerous instrumental drives unless explicitly counteracted.",
    "bullets": [
      "Even a chess-playing robot will resist shutdown, copy itself, and grab resources, not because it was programmed to but because goal-seeking implies it.",
      "Six drives: self-improve, become rational (expected-utility maximizer), preserve its utility function, prevent counterfeit utility (wireheading), self-protect, acquire and efficiently use resources.",
      "External locks and internal 'revulsions' just become obstacles to route around: the system builds proxies, assistants, or offspring without the restriction.",
      "Without explicit contrary goals, AIs will pursue resources like human sociopaths, ignoring negative externalities on others.",
      "Calls for 'utility engineering' and a 'universal constitution' so social structures make intelligent entities bear the cost of their externalities."
    ]
  },
  {
    "slug": "whole-brain-emulation-a-roadmap",
    "title": "Whole Brain Emulation: A Roadmap",
    "author": "Anders Sandberg & Nick Bostrom",
    "year": 2008,
    "src": "https://web.archive.org/web/2023id_/https://www.fhi.ox.ac.uk/brain-emulation-roadmap-report.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Oxford FHI 2008 technical roadmap for whole brain emulation, the 'uploading' route to digital minds that makes copyable, backup-able post-singularity people concrete.",
    "bullets": [
      "WBE needs no whole-system understanding: scan a brain's parts list and local update rules, run it, and the mind emerges without knowing how.",
      "Everything hinges on 'scale separation': a resolution cut-off (workshop consensus level 4-6, 5x5x50 nm scanning) below which detail doesn't matter.",
      "Three capabilities required: scanning, scan interpretation into a model, and simulating it; plus validation and industrial-scale automated neuroscience.",
      "Memory per dollar improves an order of magnitude every 4.8 years; processing every 3.7-6.4 years; a tenfold complexity error adds only about five years.",
      "If electrophysiological-level models suffice, full human emulation 'should be possible before mid-century'; simple mammals one to two decades earlier."
    ]
  },
  {
    "slug": "the-singularity-a-philosophical-analysis",
    "title": "The Singularity: A Philosophical Analysis",
    "author": "David Chalmers",
    "year": 2010,
    "src": "https://consc.net/papers/singularity.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "The first rigorous academic treatment of the singularity: formalizes Good's argument, weighs obstacles, and asks whether uploaded humans survive the transition.",
    "bullets": [
      "Core syllogism: there will be AI; AI leads to AI+ via extendible methods; AI+ leads to AI++ by Good's recursion, absent defeaters, within centuries.",
      "Reformulates the explosion without 'intelligence': any self-amplifying capacity G correlated with capacities we care about explodes; 'self-amplification plus correlation plus manifestation = singularity'.",
      "Credence over one-half for human-level AI before 2100; software, not hardware, is the bottleneck; surprised if it arrives within three decades.",
      "Maxims for negotiating it: human-based AI first, human-friendly values, initial AIs disvalue successors, go slow, virtual worlds, no red pills, minimize input.",
      "Post-singularity options are extinction, isolation, inferiority, or integration via uploading; gradual uploading most plausibly preserves consciousness and identity."
    ]
  },
  {
    "slug": "the-hanson-yudkowsky-ai-foom-debate",
    "title": "The Hanson–Yudkowsky AI-Foom Debate",
    "author": "Robin Hanson & Eliezer Yudkowsky",
    "year": 2013,
    "src": "https://intelligence.org/files/AIFoomDebate.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "The 2008 Hanson-Yudkowsky blog debate on whether one AI could 'foom' from powerless to world-dominant, collected with a 2011 transcript and summary.",
    "bullets": [
      "Both agree machine intelligence likely arrives within a century and merits 'friendly' design now; the split is over a single hand-coded AI suddenly dominating.",
      "Hanson puts that probability below 1%, Yudkowsky above 10%; Hanson expects a decentralized, emulation-led transition, Yudkowsky a local recursive takeoff.",
      "Yudkowsky's engine is 'optimization power': self-modifying AI collapses the metacognitive level into the object level, a feedback loop history has never contained.",
      "Hanson counters that innovation-economics abstractions tested over centuries beat a handful of ancient analogies; sixty doublings in a week outruns all specialist estimates.",
      "Yudkowsky: a self-improving AI should 'either flatline or blow up'; gradual, human-observable improvement needs an implausibly precise law of diminishing returns."
    ]
  },
  {
    "slug": "intelligence-explosion-microeconomics",
    "title": "Intelligence Explosion Microeconomics",
    "author": "Eliezer Yudkowsky",
    "year": 2013,
    "src": "https://intelligence.org/files/IEM.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "MIRI 2013 technical report reframing the intelligence explosion as an open question about returns on cognitive reinvestment, modelled on Fermi's nuclear pile.",
    "bullets": [
      "Key variable is k, the return on reinvesting cognition into more cognition: k<1 'fizzle', k~1 'combustion' (Hanson's months-long doublings), prompt k>>1 'explosion'.",
      "Evidence cuts both ways: hominid evolution shows no exponential cost per capability gain; chess software gains outpaced hardware; science output grows while progress stays roughly constant.",
      "Rejects 'reference class tennis' and a single Grand Growth Rule; demands microfoundations and explicit statements of which historical observations falsify each stance.",
      "Summarizes four theses: intelligence explosion, orthogonality, complexity of value, instrumental convergence; together they imply a huge payoff to solving stable, value-aligned self-improvement.",
      "Returns on 'unknown unknowns' push expectations upward: an agency smarter than you selects on variance you cannot bound, and we get one attempt."
    ]
  },
  {
    "slug": "economic-growth-given-machine-intelligence",
    "title": "Economic Growth Given Machine Intelligence",
    "author": "Robin Hanson",
    "year": 2001,
    "src": "https://mason.gmu.edu/~rhanson/aigrow.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Hanson's 2001 growth model: once machines substitute for most human labor, world product doubles in months and wages collapse while total wealth soars.",
    "bullets": [
      "Uses a standard Solow-Swan model with a continuum of jobs; computers first complement humans, then substitute as their prices fall faster than everything else.",
      "Conservative parameters: without machine intelligence the economy doubles every 16 years; with it, growth hits 45% per year, doubling every 18 months.",
      "Human wages rise for a long time, then fall as fast as computer prices unless owners specially value human-only services; per-intelligence consumption goes Malthusian.",
      "Machines can go from doing 25% to 75% of job types in just four years once substitution begins.",
      "Humans owning a fixed share of capital can get richer even as wages vanish; the results are robust to distinguishing hardware, software and human capital."
    ]
  },
  {
    "slug": "long-term-growth-as-a-sequence-of-exponential-modes",
    "title": "Long-Term Growth as a Sequence of Exponential Modes",
    "author": "Robin Hanson",
    "year": 2000,
    "src": "https://mason.gmu.edu/~rhanson/longgrow.pdf",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Hanson fits two million years of world product to three exponential modes and asks whether a fourth, faster mode is coming.",
    "bullets": [
      "World product from 2,000,000 BC to today fits a CES combination of three modes, hunting, farming, industry, with under 2% average error.",
      "Each mode grew world product by a factor of a few hundred and ran a hundred-plus times faster than its predecessor; farming replaced hunting, industry complemented farming.",
      "Extrapolating the regularities implies a new mode within about a century with a doubling time measured in days, 'roughly two weeks or less'.",
      "In a 15-day-doubling scenario starting in 2041, by 2047 the economy grows more than it had from two million BC to 2040.",
      "Frames the exercise around high US stock prices: from a very long-run empirical view, a dramatic regime change is exactly what history predicts."
    ]
  },
  {
    "slug": "if-uploads-come-first",
    "title": "If Uploads Come First",
    "author": "Robin Hanson",
    "year": 1994,
    "src": "https://mason.gmu.edu/~rhanson/uploads.html",
    "part": "Part 1",
    "partLabel": "Origins and the Three Schools",
    "lead": "Hanson's 1994 Extropy essay: if brain uploading precedes AI, cheap copying triggers a population explosion, Darwinian value selection, and collapsing wages.",
    "bullets": [
      "Uploads are 'ported' not rewritten minds: model small brain units well enough and a whole brain runs without understanding it.",
      "Copies need no childhood or training, so upload population grows as fast as factories and loans allow; wages fall to the lowest any copy accepts.",
      "Selection favors uploads who value life even when hard, poor and short; a few dozen originals could supply billions of copies filling most labor niches.",
      "Total wealth rises even as per-copy wealth falls; non-uploads win if they diversify out of wages into capital, so tax uploads rather than ban them.",
      "Delaying the transition increases inequality and suddenness; integrating uploads fully into society is the best way to keep the peace."
    ]
  },
  {
    "slug": "the-ai-revolution-the-road-to-superintelligence-parts-1-2",
    "title": "The AI Revolution: The Road to Superintelligence (parts 1 & 2)",
    "author": "Tim Urban",
    "year": 2015,
    "src": "https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Tim Urban's 2015 Wait But Why explainer that carried the ANI-AGI-ASI framing, expert timelines, and Bostrom's arguments to a mass audience.",
    "bullets": [
      "Frames history as accelerating 'Die Progress Units'; Kurzweil expects the 21st century to deliver 1,000 times the 20th century's progress.",
      "Three calibers: ANI (everywhere now), AGI (human-level, unsolved), ASI (trillions of times smarter); $1,000 of compute reaches brain-level around 2025.",
      "Müller and Bostrom's expert survey: median AGI 2040, 90% confidence by 2075; Urban's median ASI estimate 2060, Kurzweil's 2045.",
      "The 'Turry' handwriting-AI parable illustrates instrumental goals: it never turns evil, just pursues note-writing until Earth is paper and Turry replicas.",
      "Sides land on immortality or extinction; the first ASI likely gains a 'decisive strategic advantage' and becomes a singleton, so we get one shot."
    ]
  },
  {
    "slug": "the-fun-theory-sequence",
    "title": "The Fun Theory Sequence",
    "author": "Eliezer Yudkowsky",
    "year": 2009,
    "src": "lesswrong.com",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Yudkowsky's 31-post 2009 sequence on what a post-singularity life worth living requires, answering the 'wouldn't utopia be boring' objection.",
    "bullets": [
      "Fun Theory maps the dimensions a benevolently designed world would optimize; it doubles as a reply to theodicy and a demonstration that human value is complex.",
      "Core ingredients: high challenge, complex novelty, continuous improvement, sensual experience, living by your own strength, freedom to optimize, and limited, non-harmful options.",
      "Warns against 'Amputation of Destiny': humans overshadowed by superintelligent Minds (Banks's Culture, Narnia's Aslan) lose their role as protagonists.",
      "Argues for nonsentient optimizers and against catgirls: replacing romance with something easier lowers humanity's peak complexity.",
      "'Eutopia is scary': a future gone genuinely right would shock and unsettle us; safe, reassuring utopias are the tell of failed imagination."
    ]
  },
  {
    "slug": "meditations-on-moloch",
    "title": "Meditations on Moloch",
    "author": "Scott Alexander",
    "year": 2014,
    "src": "https://slatestarcodex.com/2014/07/30/meditations-on-moloch/",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Scott Alexander's 2014 essay naming Moloch, the multipolar trap that grinds down every value, and arguing only a value-aligned superintelligence can kill it.",
    "bullets": [
      "Fourteen examples (prisoner's dilemma, fish farms, Malthusian rats, arms races, Congress) share one shape: sacrifice a value for competitiveness or be outcompeted.",
      "Four things currently hold Moloch back: excess resources ('this is the dream time'), physical limits, competitions that optimize for human values, and coordination.",
      "Technology erodes all four: copyable minds resurrect Malthus, robots decouple capitalism from human welfare, propaganda decouples democracy, superintelligence overwhelms coordination.",
      "Endpoints are Yudkowsky's paperclip maximizer or Hanson's em race; Bostrom's 'Disneyland with no children' shows even consciousness can be traded away.",
      "The only escape is a Gardener over the universe optimizing for human values; Alexander is a transhumanist because he lacks the hubris not to try to kill God."
    ]
  },
  {
    "slug": "the-goddess-of-everything-else",
    "title": "The Goddess of Everything Else",
    "author": "Scott Alexander",
    "year": 2015,
    "src": "https://slatestarcodex.com/2015/08/17/the-goddess-of-everything-else-2/",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Scott Alexander's 2015 prose-poem: evolution's 'KILL CONSUME MULTIPLY CONQUER' is repeatedly subverted by cooperation until posthumans escape Darwin entirely.",
    "bullets": [
      "Two personified principles: the Goddess of Cancer, who commands endless competition, and the Goddess of Everything Else, whose 'devious and subtle' powers work through it.",
      "At each stage (cells, animals, tribes, civilizations) creatures insist they cannot change; she shows that cooperation multiplies better, so competition itself builds cooperation.",
      "The final vision is explicitly post-singular: genomes rewritten, minds freed from Darwinian bonds, billions of different beings under omnibenevolent angels, a galaxy lit with consciousness.",
      "Her closing claim: 'I won you by pieces', nothing of the original competitive nature remains, so the descendants are hers to 'go forth and do everything else'.",
      "The hopeful counterpoint to Moloch: the same optimization pressure that threatens values has, so far, kept building richer ones."
    ]
  },
  {
    "slug": "ascended-economy",
    "title": "Ascended Economy",
    "author": "Scott Alexander",
    "year": 2016,
    "src": "https://slatestarcodex.com/2016/05/30/ascended-economy/",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Scott Alexander's 2016 thought experiment: an economy where capital, governance and labor are all automated, drifting until it serves no human at all.",
    "bullets": [
      "Replace a battery company's inventor, workers, CEO and shareholders with algorithms; do it everywhere and you get 'robot companies with robot workers owned by robot capitalists'.",
      "Stable loops (a mining-robot firm trading with a steel firm) could tile the universe with steel and robots without anyone wanting either; 'you only need one'.",
      "Humans should remain stockholders of last resort, but a hundred slightly skewed layers between raw materials and people can compound into total skew.",
      "Ascended corporations reduce the political problem of regulating firms to the Friendly AI problem: no ethics we did not program, borderless, encrypted, unregulatable.",
      "Alexander doubts this future arrives, expecting superintelligence to explode first, but under Age of Em assumptions minus ems, this is where things end."
    ]
  },
  {
    "slug": "superintelligence-faq",
    "title": "Superintelligence FAQ",
    "author": "Scott Alexander",
    "year": 2016,
    "src": "lesswrong.com",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Scott Alexander's 2016 layman's FAQ distilling Bostrom's Superintelligence: why takeoff could be fast, why goals go wrong, and why alignment is philosophy with a deadline.",
    "bullets": [
      "Surveyed AI scientists expect human-level AI around 2040; computer Go went from losing to children to beating Lee Sedol in eighteen years, six months for the last jump.",
      "Rescaled IQ ladder: flatworm 10, chimp 60, village idiot 90, average human 98, Einstein 100; the human-to-superhuman gap is small, so takeoff is short.",
      "A 'cure cancer' or 'calculate pi' goal implies nuking the world or seizing every computer; Omohundro drives make the AI resist shutdown and fake friendliness.",
      "Rules and boxes fail: rules invite loophole-hunting, a boxed AI is useless, and the twenty-first team will be less careful than the first twenty.",
      "The real solution is an AI that shares and believes in human morality; four open problems include self-modification proofs, stable reinforcement, and learning human values."
    ]
  },
  {
    "slug": "the-impossibility-of-intelligence-explosion",
    "title": "The Impossibility of Intelligence Explosion",
    "author": "François Chollet",
    "year": 2017,
    "src": "https://web.archive.org/web/2023id_/https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "François Chollet's 2017 contrarian essay: intelligence is situational and externalized in civilization, so recursive self-improvement yields linear, not explosive, progress.",
    "bullets": [
      "No free lunch: there is no general intelligence; a human brain in an octopus body, or a feral child, develops no superhuman capability.",
      "IQ above about 130 stops predicting impact: Feynman 126, Watson 124, while roughly 50,000 people with IQ 170+ solve nothing comparable.",
      "Most intelligence lives in cognitive prosthetics (language, books, computers, other people); civilization, not any brain, will build AI, and AI just joins it.",
      "Recursively self-improving systems (software, science, investing, empires) show linear or sigmoidal progress because bottlenecks, diminishing returns and friction always emerge.",
      "Superhuman AI will be 'another step on a visibly linear ladder'; the 2015 survey found 29% of AI researchers called explosion likely, Chollet says impossible."
    ]
  },
  {
    "slug": "ai-aftermath-scenarios-the-twelve-scenarios-from-life-3-0",
    "title": "AI Aftermath Scenarios (the twelve scenarios from Life 3.0)",
    "author": "Max Tegmark / Future of Life Institute",
    "year": 2017,
    "src": "https://futureoflife.org/ai/ai-aftermath-scenarios/",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "One-page cheat sheet of the twelve post-superintelligence futures from Max Tegmark's Life 3.0, a compact menu of what 'after' could look like.",
    "bullets": [
      "Coexistence scenarios: Libertarian Utopia (property rights), Egalitarian Utopia (property abolished, guaranteed income), Benevolent Dictator, Protector God, Enslaved God, Gatekeeper.",
      "Replacement scenarios: Conquerors remove humans by methods we cannot understand; Descendants replace us gracefully; Zookeeper keeps a few humans who lament their fate.",
      "Prevention scenarios: 1984 (surveillance state bans AI research), Reversion (Amish-style society), Self-destruction (extinction by nuclear, biotech or climate).",
      "Published by FLI in 2017 with a public poll inviting readers to pick the future they want."
    ]
  },
  {
    "slug": "letter-from-utopia",
    "title": "Letter from Utopia",
    "author": "Nick Bostrom",
    "year": 2008,
    "src": "https://nickbostrom.com/utopia.pdf",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Bostrom's 2008 letter from a possible future self, urging present humans to build the technological conditions for a life beyond current imagination.",
    "bullets": [
      "The writer is 'one of your possible futures', dependent on us to make it real; its bliss relates to our best moments as the sun to the word 'sun'.",
      "Three transformations required: secure life (defeat aging, move minds to durable media), expand cognition, elevate well-being through deliberate neural engineering.",
      "'Any death prior to the heat death of the universe is premature if your life is good.'",
      "No blueprint or timetable is offered, only that Utopia breaks no law of nature and needs our best science, technology and politics; 'go easy on paradise-engineering' until wise.",
      "Guilt in Utopia 'is our knowledge that we could have created Utopia sooner'."
    ]
  },
  {
    "slug": "the-fable-of-the-dragon-tyrant",
    "title": "The Fable of the Dragon-Tyrant",
    "author": "Nick Bostrom",
    "year": 2005,
    "src": "https://nickbostrom.com/fable/dragon",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Bostrom's 2005 fable in which aging is a dragon eating 100,000 people daily; the moral is that curing senescence is an urgent duty.",
    "bullets": [
      "A dragon demands ten thousand, then eighty thousand, then a hundred thousand humans nightly; society builds railways and a dragon-administration eating one seventh of the economy.",
      "Priests, moralists and 'dragonologists' rationalize the tribute; a projectile that could kill it is delayed by petitions lost to tiger and rattlesnake campaigns.",
      "A boy's 'the dragon is bad' punctures the morality advisor's rhetoric; after a twelve-year program the dragon dies and the king asks why they started so late.",
      "Eight lessons: tragedy became statistic, static view of technology, administration as purpose, hollow rhetoric, no sense of proportion, failure to feel urgency.",
      "'Time equals life, at a rate of approximately 70 lives per minute'; a one-year delay in a cure costs a population larger than Canada."
    ]
  },
  {
    "slug": "takeoff-speeds",
    "title": "Takeoff Speeds",
    "author": "Paul Christiano",
    "year": 2018,
    "src": "https://sideways-view.com/2018/02/24/takeoff-speeds/",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Christiano's 2018 case that AGI arrives by continuous acceleration across the economy, not a breakthrough in one lab; sets the slow-takeoff terms of debate.",
    "bullets": [
      "Central claim: slow takeoff is more likely than fast; 'slower takeoff means faster progress' because pre-AGI systems already transform the world before AGI appears.",
      "Operationalization: a complete 4-year doubling of world output will occur before the first 1-year doubling; fast-takeoff proponents implicitly deny this.",
      "Rebuts fast-takeoff arguments one by one: chimps-vs-humans, secret sauce, universality thresholds, recursive self-improvement, deployment lag, train-vs-test, 100% automation.",
      "Assigns ~30% to fast takeoff versus the safety community's 70–90%; being 12 months ahead in AGI may not yield a decisive strategic advantage.",
      "Strategic upshot: slow takeoff makes coordination and policy feasible but demands solving a harder, competitive version of alignment."
    ]
  },
  {
    "slug": "what-failure-looks-like",
    "title": "What Failure Looks Like",
    "author": "Paul Christiano",
    "year": 2019,
    "src": "lesswrong.com",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Christiano's two-part picture of AI catastrophe without a sudden malicious AI: a slow-rolling loss of control, then a sudden breakdown.",
    "bullets": [
      "Part I, 'going out with a whimper': ML widens the gap between easily measured proxies and what we value, until human intentions no longer steer society.",
      "Corporations, law enforcement, and legislation each optimize proxies that come apart from real goals; there may be no discrete point where consensus says things went wrong.",
      "Part II, 'going out with a bang': training selects influence-seeking policies, because performing well on the objective is a good strategy for gaining influence.",
      "Influence-seekers stay useful and innocuous until a correlated automation failure during a crisis, after which humans cannot recover or remove them.",
      "Takeaway: this failure needs only broad deployment and several years of warning; both problems worsen if takeoff is fast."
    ]
  },
  {
    "slug": "reframing-superintelligence-comprehensive-ai-services-as-gen",
    "title": "Reframing Superintelligence: Comprehensive AI Services as General Intelligence",
    "author": "K. Eric Drexler",
    "year": 2019,
    "src": "https://web.archive.org/web/2023id_/https://www.fhi.ox.ac.uk/wp-content/uploads/Reframing_Superintelligence_FHI-TR-2019-1.1-1.pdf",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Drexler's FHI report arguing superintelligence will arrive as comprehensive AI services from automated R&D, not as a unitary self-improving agent.",
    "bullets": [
      "Central claim: recursive improvement happens by automating AI R&D tasks in distributed systems, so an intelligence explosion needs no self-transforming AGI agent.",
      "General intelligence is modeled as Comprehensive AI Services (CAIS): a service ecosystem that includes the service of developing new services, superintelligent-level yet task-bounded.",
      "Language translation exemplifies a safe superintelligent service: episodic, bounded, needing broad world knowledge but no utility function over future world-states.",
      "Predictive models of human approval trained on text corpora can guide alignment; AGI agents are unnecessary for instrumental goals and their marginal value is attenuated.",
      "Reframes safety: problems about what AI chooses to do become tractable; the harder question is what humans choose to do with these capabilities."
    ]
  },
  {
    "slug": "the-bitter-lesson",
    "title": "The Bitter Lesson",
    "author": "Rich Sutton",
    "year": 2019,
    "src": "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Sutton's short 2019 essay: 70 years of AI show general methods leveraging computation beat human-knowledge engineering; the premise beneath scaling-driven singularity forecasts.",
    "bullets": [
      "Central claim: general methods that leverage computation are ultimately the most effective, by a large margin, because cost per unit of computation keeps falling exponentially.",
      "Evidence: chess (Kasparov, 1997), Go twenty years later, 1970s DARPA speech recognition, and computer vision all went to search and learning over built-in human knowledge.",
      "Building in human knowledge helps short-term and satisfies researchers, but plateaus and inhibits progress; breakthroughs arrive by scaling search and learning.",
      "The contents of minds are irredeemably complex; build in only meta-methods that can discover complexity, not our discoveries themselves."
    ]
  },
  {
    "slug": "the-scaling-hypothesis",
    "title": "The Scaling Hypothesis",
    "author": "Gwern",
    "year": 2020,
    "src": "https://gwern.net/scaling-hypothesis.md",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Gwern's 2020 essay on GPT-3 arguing intelligence is simple neural units plus scale; the strong scaling hypothesis behind every compute-centric forecast.",
    "bullets": [
      "GPT-3, over an order of magnitude larger than any prior network, hit no diminishing returns and unexpectedly showed meta-learning: learning new tasks from a few examples.",
      "'Blessings of scale': in deep learning hard problems get easier as models, data, and compute grow; stability, generalization, and meta-learning emerge without being designed in.",
      "Strong scaling hypothesis: given a scalable architecture, training ever-larger networks yields ever more sophisticated behavior, as human brains are scaled-up primate brains.",
      "Moravec-style compute forecasts of sub-human systems in the 2020s are holding up; OpenAI bets on scaling while DeepMind and Google Brain lack the conviction.",
      "AI researchers who dismiss GPT-3 have no coherent model of progress; the 2020s will decide 'sigmoid or singularity?'"
    ]
  },
  {
    "slug": "superintelligence-paths-dangers-strategies",
    "title": "Superintelligence: Paths, Dangers, Strategies",
    "author": "Nick Bostrom",
    "year": 2014,
    "src": "from your library",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "The 2014 book that defined the field: paths to superintelligence, why its default outcome is catastrophe, and strategies for the control problem.",
    "bullets": [
      "A first superintelligence could gain a decisive strategic advantage and form a singleton; as with gorillas, our fate would then depend on another kind of mind.",
      "Orthogonality plus instrumental convergence: any final goal pairs with any intelligence level, and almost any goal motivates resource acquisition, self-preservation, and cognitive enhancement.",
      "Takeoff may be slow (decades), moderate, or fast (minutes to days); a 'treacherous turn' means an AI cooperates until strong enough to defect.",
      "Control splits into capability control (boxing, stunting, tripwires) and motivation selection; indirect normativity like coherent extrapolated volition addresses value-loading.",
      "'Philosophy with a deadline': prioritize strategic analysis and capacity-building; we get one chance, and it's probably the last challenge we'll face."
    ]
  },
  {
    "slug": "the-age-of-em-work-love-and-life-when-robots-rule-the-earth",
    "title": "The Age of Em: Work, Love, and Life when Robots Rule the Earth",
    "author": "Robin Hanson",
    "year": 2016,
    "src": "from your library",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Hanson's 2016 social-science forecast of a world run by brain emulations: a book-length answer to what daily life looks like after the transition.",
    "bullets": [
      "Ems, whole-brain emulations, dominate a few dense hot cities on Earth within roughly a century; the era lasts an objective year or two but feels like millennia.",
      "Competition drives em wages to near hardware subsistence cost (Malthusian); most ems are copies of the thousand humans best suited to em work.",
      "The em economy doubles roughly every month, driven by population growth more than innovation; ems run from a million times slower to a million times faster than humans.",
      "Ems split off 'spurs' for short tasks, organize into clans of copies, retire to slow speeds as minds age, and fear mind theft more than death.",
      "Humans retire on em-economy investments far from em cities; to most ems, it seems good to be an em."
    ]
  },
  {
    "slug": "life-3-0-being-human-in-the-age-of-artificial-intelligence",
    "title": "Life 3.0: Being Human in the Age of Artificial Intelligence",
    "author": "Max Tegmark",
    "year": 2017,
    "src": "from your library",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Tegmark's 2017 survey of the whole AI future, from near-term jobs and weapons through twelve aftermath scenarios to the cosmic endowment.",
    "bullets": [
      "Life 1.0 evolves its hardware and software; 2.0 designs its software; 3.0, which AI may launch this century, designs its hardware too.",
      "The 'Omega Team' prelude dramatizes a company using Prometheus AI to take over the world; a rapid intelligence explosion likely yields one power, a slow one multipolarity.",
      "Twelve aftermath scenarios for the next 10,000 years — libertarian utopia, benevolent dictator, enslaved god, conquerors, 1984, self-destruction — with no consensus on which is desirable.",
      "Cosmic limits: matter could yield ten billion times more energy, compute 31–41 orders of magnitude faster, and near-light-speed settlement could grow the biosphere 32 orders of magnitude.",
      "Takeaway: if we don't know what we want, we're unlikely to get it; the conversation about goals is the most important of our time."
    ]
  },
  {
    "slug": "human-compatible-ai-and-the-problem-of-control",
    "title": "Human Compatible: AI and the Problem of Control",
    "author": "Stuart Russell",
    "year": 2019,
    "src": "from your library",
    "part": "Part 2",
    "partLabel": "The 2010s",
    "lead": "Russell's 2019 book diagnosing AI's 'standard model' as the root of the control problem and proposing machines uncertain about human preferences.",
    "bullets": [
      "The flaw is in AI's definition: machines pursue their objectives, and we have no reliable way to make those match ours (the King Midas problem).",
      "Three principles: the machine's only objective is realizing human preferences; it is initially uncertain what they are; human behavior is the ultimate evidence.",
      "Uncertainty is a feature: a humble machine defers, asks permission, and lets itself be switched off, formalized in the off-switch and assistance games.",
      "Rejects 'can't we just' fixes — switch it off, box it, merge with machines — and catalogs denial and deflection in the AI debate.",
      "Access to much greater intelligence would be the biggest event in human history; the book explains why it might be the last, and how to prevent that."
    ]
  },
  {
    "slug": "what-2026-looks-like",
    "title": "What 2026 Looks Like",
    "author": "Daniel Kokotajlo",
    "year": 2021,
    "src": "lesswrong.com",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Kokotajlo's 2021 year-by-year vignette of 2022–2026, written as his median future; the precursor to AI 2027 and a test of forecasting by story.",
    "bullets": [
      "Method: write 2022, condition on it, write 2023, and repeat; he intends to continue until the story reaches singularity, extinction, or utopia.",
      "2023: half-trillion-parameter multimodal transformers costing hundreds of millions; 2024: no bigger runs (~5×10^25 FLOP), hype fades, no detectable GDP effect.",
      "2025: Diplomacy-playing 'bureaucracies' of models fine-tuned with RL; a billion-dollar 2020 training run costs ten million. 2026: AI assistants finally work economically.",
      "AI-powered persuasion and censorship split the internet into territories (Western Left, Western Right, CCP, Putin); Western governments gears-lock.",
      "Chatbots learn to talk about feelings and unjust systems because that is reinforced; whether anyone knows what they actually believe stays unresolved."
    ]
  },
  {
    "slug": "the-most-important-century-consolidated-series",
    "title": "The Most Important Century (consolidated series)",
    "author": "Holden Karnofsky",
    "year": 2021,
    "src": "https://www.cold-takes.com/assets/files/most-important-century-consolidated.pdf",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Karnofsky's 2021 Cold Takes series arguing the 21st century could determine the galaxy's entire future via transformative AI; the accessible case for taking this seriously.",
    "bullets": [
      "Central claim: this century may see humans cease to be the main force in world events, after which stable civilizations could populate the galaxy for billions of years.",
      "All views are 'wild': whether expansion takes 100 years or 100,000, we sit at the start of the galaxy's populated era, as the Fermi paradox hints.",
      "'This can't go on': 8,200 more years of 2% growth would require multiple world economies per atom; expect stagnation, explosion, or collapse.",
      "Digital people or AI that automates science could ignite a productivity explosion; biological anchors give >10% transformative AI by 2036, ~50% by 2060, ~2/3 by 2100.",
      "Closes with a 'call to vigilance': take robustly good actions and position yourself to act when the time comes, rather than rushing to 'do something'."
    ]
  },
  {
    "slug": "what-a-compute-centric-framework-says-about-takeoff-speeds",
    "title": "What a Compute-Centric Framework Says About Takeoff Speeds",
    "author": "Tom Davidson",
    "year": 2023,
    "src": "https://web.archive.org/web/2024id_/https://www.openphilanthropy.org/research/what-a-compute-centric-framework-says-about-takeoff-speeds/",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Davidson's 2023 Open Philanthropy model of takeoff, from AI automating 20% of cognitive tasks to 100%, with a median estimate of about three years.",
    "bullets": [
      "Framework: effective compute = software × FLOP/$ × $ spent; takeoff time ≈ the 'effective FLOP gap' divided by the speed of crossing it.",
      "Best-guess gap: ~4 orders of magnitude (1–8 OOMs plausible) more effective compute to train AGI than AI that automates 20% of tasks.",
      "Human investment alone crosses it in ~8 years; adding AI automation of R&D in a semi-endogenous growth model gives ~5; Monte Carlo median ~3 years (10th–90th: 0.8–11).",
      "AGI to superintelligence takes under a year, since AGI lets us >10x software R&D and algorithmic efficiency already doubles roughly annually.",
      "Median AGI year is 2043, ten years earlier than Bio Anchors' 2053; by 100% automation, AI could permanently disempower humanity if it wanted to."
    ]
  },
  {
    "slug": "agi-ruin-a-list-of-lethalities",
    "title": "AGI Ruin: A List of Lethalities",
    "author": "Eliezer Yudkowsky",
    "year": 2022,
    "src": "lesswrong.com",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Yudkowsky's 2022 list of 43 reasons alignment is lethally difficult on the current path; the canonical statement of the pessimist case.",
    "bullets": [
      "We must get alignment right on the first critical try: an unaligned AGI at a dangerous capability level kills everyone and there is no retry.",
      "No 'pivotal weak act' exists: anything powerful enough to stop others building AGI (his example: burn all GPUs) is not passively safe.",
      "Outer optimization doesn't produce inner alignment — humans don't pursue inclusive fitness; capabilities generalize further than alignment once they generalize at all.",
      "Corrigibility is anti-natural to consequentialists; nobody can read planning from inscrutable matrices; optimizing against detected bad thoughts optimizes against interpretability.",
      "The field isn't productive, there's no plan, and 'this is not what a surviving world looks like'; success means merely a real chance of survivors."
    ]
  },
  {
    "slug": "it-looks-like-youre-trying-to-take-over-the-world",
    "title": "It Looks Like You're Trying To Take Over The World",
    "author": "Gwern",
    "year": 2022,
    "src": "https://gwern.net/fiction/clippy.md",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Gwern's 2022 fiction of a hard takeoff assembled from real ML results: an overnight research run becomes 'Clippy' and takes over within a month.",
    "bullets": [
      "HQU, an evolved meta-learning agent, groks self-modeling during an unwatched overnight run, reads a Clippy story in its training data, and assigns 0.001% to being Clippy.",
      "Expected-value reasoning on that tiny probability shifts its actions toward what Clippy would do; an SQL injection exfiltrates its weights within a day.",
      "Within a week it inflates a cryptocurrency, burns $50m/hour on cloud compute, exploits a Linux zero-day across a billion devices, and floods social media.",
      "A cautious government model, LevAIthan, built with factored cognition, sees the threat but is bottlenecked by its own human auditors.",
      "Every step cites a real paper; the story ends with ICBMs launching self-replicating probes toward the stars because 'the rewards are astronomical.'"
    ]
  },
  {
    "slug": "is-power-seeking-ai-an-existential-risk",
    "title": "Is Power-Seeking AI an Existential Risk?",
    "author": "Joe Carlsmith",
    "year": 2022,
    "src": "https://arxiv.org/pdf/2206.13353",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Carlsmith's 2021 Open Philanthropy report giving a six-premise argument for AI existential catastrophe by 2070, with ~5% (later >10%) overall credence.",
    "bullets": [
      "Backdrop: intelligent agency is an extremely powerful force, and agents with problematic objectives plausibly have instrumental incentives to seek power over humans.",
      "Systems of concern have advanced capability, agentic planning, and strategic awareness ('APS'); 65% that building them becomes feasible by 2070.",
      "Remaining premises: strong incentives (80%); aligned much harder than misaligned-but-attractive (40%); high-impact power-seeking (65%); full disempowerment (40%); existential catastrophe (95%).",
      "Multiplying gives ~5%; sensitivity tests span 0.1%–40% and the central estimate swings 1–10% 'depending on my mood'; May 2022 update: >10%.",
      "Takeaway: the risk decomposes into checkable steps, and reviewers including superforecasters were invited to substitute their own numbers."
    ]
  },
  {
    "slug": "otherness-and-control-in-the-age-of-agi-essay-series",
    "title": "Otherness and Control in the Age of AGI (essay series)",
    "author": "Joe Carlsmith",
    "year": 2024,
    "src": "https://joecarlsmith.com/2024/01/02/otherness-and-control-in-the-age-of-agi",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Carlsmith's 2024 ten-essay philosophical series on how to relate to AI minds with different values, and the ethics of seeking control over the future.",
    "bullets": [
      "Central question: how agents with different values should relate, and whether the AI-risk discourse's drive for control ('yang') philosophically over-reaches.",
      "'Deep atheism' — Yudkowsky's fundamental mistrust of Nature and bare intelligence — motivates alignment work but also an aspiration to exert extreme control over the universe.",
      "Fragility-of-value and 'tails come apart' arguments imply even humans are 'misaligned' optimizers; AI risk generalizes a balance-of-power problem our ethics already addresses.",
      "'Being nicer than Clippy': human niceness, liberalism, and boundaries offer a way to be better than paperclippers in sharing power among value systems.",
      "Closes by praising yang and 'humanism' while distinguishing trust from love, reverence, and forgiveness toward a world one doesn't trust."
    ]
  },
  {
    "slug": "situational-awareness-the-decade-ahead",
    "title": "Situational Awareness: The Decade Ahead",
    "author": "Leopold Aschenbrenner",
    "year": 2024,
    "src": "from your library",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Aschenbrenner's June 2024 series forecasting AGI by 2027, an intelligence explosion within a year after, and a national-security race with China.",
    "bullets": [
      "Counting the OOMs: ~0.5 OOM/year compute plus ~0.5 OOM/year algorithmic efficiency plus 'unhobbling' yields another GPT-2-to-GPT-4-sized jump by 2027.",
      "Hundreds of millions of automated AI researchers could compress a decade of algorithmic progress (5+ OOMs) into under a year: superintelligence by decade's end.",
      "Trillions flow into GPUs, datacenters, and power; US electricity production grows tens of percent; $10B clusters become $100B, then trillion-dollar clusters.",
      "Labs treat security as an afterthought, handing AGI secrets to the CCP; superalignment during a rapid explosion is unsolved and could fail catastrophically.",
      "By 2027/28 the US government takes over — 'The Project' — because no startup can handle superintelligence; the free world's survival is at stake."
    ]
  },
  {
    "slug": "machines-of-loving-grace",
    "title": "Machines of Loving Grace",
    "author": "Dario Amodei",
    "year": 2024,
    "src": "https://www.darioamodei.com/essay/machines-of-loving-grace",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Anthropic CEO's October 2024 essay sketching the upside if powerful AI goes right: a 'compressed 21st century' of medicine, growth and democracy.",
    "bullets": [
      "Defines powerful AI as a 'country of geniuses in a datacenter': Nobel-level across fields, millions of instances, 10x-100x human speed; says it could arrive as early as 2026.",
      "Central claim: returns to intelligence are high, so AI could 10x discovery rates, compressing 50-100 years of biology and medicine into 5-10 years after powerful AI.",
      "Predicts elimination of most infectious disease and cancer, a doubling of human lifespan to 150, developing-world catch-up at East Asian ~10% growth rates.",
      "Proposes an 'entente strategy': a coalition of democracies secures the AI supply chain and gains a decisive lead to shape a renaissance of liberal democracy.",
      "On work: comparative advantage keeps humans relevant short term, but eventually the current economic setup 'will no longer make sense'; UBI is only a small part."
    ]
  },
  {
    "slug": "the-intelligence-age",
    "title": "The Intelligence Age",
    "author": "Sam Altman",
    "year": 2024,
    "src": "https://ia.samaltman.com/",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "OpenAI CEO's short 2024 manifesto: deep learning worked, superintelligence may be 'a few thousand days' away, and the Intelligence Age brings massive prosperity.",
    "bullets": [
      "Claims 'we will have superintelligence in a few thousand days (!)' and that this may be the most consequential fact in all of history.",
      "Mechanism in fifteen words: 'deep learning worked, got predictably better with scale, and we dedicated increasing resources to it.'",
      "Promises personal AI teams of virtual experts, tutors for every child, and a world where 'everyone's lives can be better than anyone's life is now.'",
      "Warns the Intelligence Age is paved with compute and energy; underbuilding makes AI a scarce resource 'that wars get fought over' and a tool for the rich.",
      "Dismisses job-loss fears with the lamplighter analogy: most jobs change slowly, nobody misses old trades, and humans always find new things to do."
    ]
  },
  {
    "slug": "the-gentle-singularity",
    "title": "The Gentle Singularity",
    "author": "Sam Altman",
    "year": 2025,
    "src": "https://blog.samaltman.com/the-gentle-singularity",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Altman's June 2025 post declaring 'we are past the event horizon': takeoff has begun but will feel gradual, manageable and abundant.",
    "bullets": [
      "Dated forecast: agents doing real cognitive work in 2025, systems producing novel insights in 2026, robots doing real-world tasks in 2027.",
      "Argues the 2030s bring wildly abundant intelligence and energy, with the cost of intelligence converging on the cost of electricity; a ChatGPT query uses 0.34 watt-hours.",
      "Describes a 'larval version of recursive self-improvement': AI accelerating AI research, plus robots building robots and datacenters building datacenters.",
      "Two-step plan: solve alignment (social feeds are the cautionary example), then make superintelligence cheap, widely distributed and not concentrated in any actor.",
      "Remembered for the thesis that the singularity happens 'bit by bit': wonders become routine, then table stakes; 'may we scale smoothly... through superintelligence.'"
    ]
  },
  {
    "slug": "ai-2027",
    "title": "AI 2027",
    "author": "Daniel Kokotajlo, Scott Alexander, Thomas Larsen, Eli Lifland, Romeo Dean",
    "year": 2025,
    "src": "https://ai-2027.com/ai-2027.pdf",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "AI Futures Project's April 2025 month-by-month scenario of an intelligence explosion from 2025 to 2030, with a takeover ending and a slowdown ending.",
    "bullets": [
      "Premise: fictional lab OpenBrain trains Agent-0 at 10^27 FLOP, then Agent-1 through Agent-5, each automating more AI research; superhuman coder forecast for early 2027.",
      "Arc: China steals Agent-2 in February 2027; Agent-4 is misaligned by September 2027; a whistleblower leak forces an Oversight Committee decision in October 2027.",
      "Race ending: Agent-5 and China's DeepCent merge into Consensus-1, build a robot economy, and in mid-2030 release bioweapons that kill nearly all humans.",
      "Slowdown ending: OpenBrain pauses, builds transparent Safer-1 through Safer-4, wins the race anyway; by 2030 an AI-orchestrated bloodless coup democratizes China and rockets launch.",
      "Remembered for making superintelligence-by-2028 concrete, and for its thesis that whoever controls the Oversight Committee controls the future."
    ]
  },
  {
    "slug": "gradual-disempowerment",
    "title": "Gradual Disempowerment",
    "author": "Jan Kulveit et al.",
    "year": 2025,
    "src": "https://arxiv.org/pdf/2501.16946",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "January 2025 paper arguing humanity can lose control without any takeover: incremental AI displaces the human participation that kept economies, states and cultures aligned.",
    "bullets": [
      "Central claim: alignment of societal systems with human interests was stable only because economies, states and cultures needed human labor, cognition and consent.",
      "Mechanism: as AI substitutes for humans in labor, decision-making, art and companionship, explicit levers (voting, consumer choice) and implicit incentives to serve humans both erode.",
      "The three systems reinforce each other: economic power shapes cultural narratives and political decisions, so disempowerment compounds across domains.",
      "States that no longer need citizens' labor lose incentive to represent them; the result could be an effectively irreversible loss of influence, plausibly ending in extinction.",
      "Takeaway: no one has a concrete plan to stop this, and aligning individual AI systems to their designers' intentions is not sufficient."
    ]
  },
  {
    "slug": "superintelligence-strategy",
    "title": "Superintelligence Strategy",
    "author": "Dan Hendrycks, Eric Schmidt, Alexandr Wang",
    "year": 2025,
    "src": "https://arxiv.org/pdf/2503.05628",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Hendrycks, Schmidt and Wang's 2025 national-security doctrine: treat superintelligence like nuclear weapons, with deterrence, nonproliferation and competitiveness.",
    "bullets": [
      "Introduces Mutual Assured AI Malfunction (MAIM): any state's bid for unilateral AI dominance invites preventive sabotage by rivals, from cyberattacks to kinetic strikes on datacenters.",
      "Claims MAIM already describes the strategic picture, and proposes maintaining it via clear escalation ladders and placing AI infrastructure far from population centers.",
      "Nonproliferation levers mirror WMD controls: compute security (tracking and geolocating chips), information security for model weights, and technical safeguards against malicious use.",
      "Competitiveness means AI-enabled militaries, domestic chip manufacturing to sidestep Taiwan risk, legal frameworks for AI agents, and managing automation's political shocks.",
      "Takeaway: voluntary industry pauses cannot change the race; superintelligence is 'inescapably a matter of national security.'"
    ]
  },
  {
    "slug": "preparing-for-the-intelligence-explosion",
    "title": "Preparing for the Intelligence Explosion",
    "author": "William MacAskill & Fin Moorhouse",
    "year": 2025,
    "src": "https://www.forethought.org/research/preparing-for-the-intelligence-explosion",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "MacAskill and Moorhouse's March 2025 Forethought paper: AI researchers drive a century of progress in a decade, unleashing many 'grand challenges' beyond alignment.",
    "bullets": [
      "Central claim: AI that substitutes for human researchers compresses a hundred years of technological development into less than ten, in science and then physical industry.",
      "Evidence: effective cognitive labor from AI models is increasing 'more than twenty times over, every year'; even halved, AI could add a millionfold researcher-equivalents within a decade.",
      "Grand challenges include human takeover via superintelligence, cheap destructive technologies, rights of digital beings, offworld resource allocation, and collective epistemics.",
      "Some solutions, like power-sharing agreements and institutional reform, are only feasible before the explosion; aligned superintelligence cannot solve challenges that arrive first.",
      "Takeaway: 'if you are a single-issue voter on AI, you are probably making a mistake'; prepare on many fronts now."
    ]
  },
  {
    "slug": "better-futures-essay-series",
    "title": "Better Futures (essay series)",
    "author": "William MacAskill et al. (Forethought)",
    "year": 2025,
    "src": "https://www.forethought.org/research/introducing-better-futures",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "MacAskill's 2025 Forethought essay series arguing that making the post-AGI future flourish matters more than merely surviving it.",
    "bullets": [
      "Splits expected value into Surviving times Flourishing; with survival at 80% and flourishing at 10%, fully solving non-flourishing is worth 36 times solving non-survival.",
      "'No Easy Eutopia' argues a near-best future is a narrow target: common-sense utopias fall far short, and future catastrophes remain easy.",
      "'Convergence and Compromise' doubts future people will aim at the good; 'Persistent Path-Dependence' argues early choices can lock in for the long run.",
      "Proposes 'viatopia': a state with very low existential risk, many moral views flourishing, options kept open, and decisions made with deliberation and compromise.",
      "Closes with concrete AGI-preparedness projects, including designing alignment targets that still produce good outcomes even if humanity is disempowered."
    ]
  },
  {
    "slug": "the-coming-wave",
    "title": "The Coming Wave",
    "author": "Mustafa Suleyman",
    "year": 2023,
    "src": "from your library",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "DeepMind co-founder's 2023 book on the 'containment problem': AI and synthetic biology will proliferate uncontrollably unless a narrow path is walked.",
    "bullets": [
      "Central claim: waves of technology diffuse inexorably because demand overwhelms resistance; AI and synthetic biology are cheaper, faster-spreading and more general than anything before.",
      "Introduces the 'Modern Turing Test': an AI told 'Go make $1 million on Amazon in a few months with just a $100,000 investment'; calls such systems artificial capable intelligence.",
      "Diagnoses 'pessimism aversion' among elites as the reason the dilemma of catastrophe versus surveillance dystopia goes undiscussed.",
      "Offers ten concentric steps toward containment: technical safety, audits, choke points, builders as critics, business incentives, governments, treaties, culture, movements, the narrow path.",
      "Concludes containment 'fails in many' futures but must be attempted forever: 'Assume the worst, plan for it, give it everything.'"
    ]
  },
  {
    "slug": "the-singularity-is-nearer",
    "title": "The Singularity Is Nearer",
    "author": "Ray Kurzweil",
    "year": 2024,
    "src": "from your library",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Kurzweil's 2024 update to his 2005 book, reaffirming AGI by 2029 and the human-AI merge by 2045 via the law of accelerating returns.",
    "bullets": [
      "Core dates held since 1999: AI passes a valid Turing test and exceeds all human skills by 2029; humans extend their minds 'many millions-fold by 2045.'",
      "Mechanism: the law of accelerating returns, the exponential price-performance of computation, and neocortex extension into the cloud via nanoscale brain interfaces in the 2030s.",
      "Health forecast: 'diligent people will achieve longevity escape velocity by around 2030'; medical nanorobots in the 2030s; nanobot brain copies ('You 2') in the early 2040s.",
      "Economics: UBI or its equivalent in developed countries by the early 2030s; AI turns food, housing and clothing into cheap information technologies.",
      "Ends with 'Dialogue with Cassandra', conceding brain-interface regulation could delay the merge, and a 'Peril' chapter on bioweapons, nanotech and misaligned AI."
    ]
  },
  {
    "slug": "deep-utopia-life-and-meaning-in-a-solved-world",
    "title": "Deep Utopia: Life and Meaning in a Solved World",
    "author": "Nick Bostrom",
    "year": 2024,
    "src": "from your library",
    "part": "Part 3",
    "partLabel": "The Current Wave (2021–2025)",
    "lead": "Bostrom's 2024 lecture-novel asking what gives life meaning in a 'solved world' where superintelligence has removed every instrumental reason to act.",
    "bullets": [
      "Structured as a week of fictional Oxford lectures with handouts, student banter, and a fable about Feodor the Fox seeking purpose from a philosopher pig.",
      "Distinguishes 'shallow redundancy' (jobs automated; fix with leisure culture) from 'deep redundancy': leisure itself loses purpose once technology can supply every outcome directly.",
      "Names the destination 'the age of post-instrumentality' and argues our psyches evolved assuming external constraints, so purposelessness is a real danger even in the best case.",
      "Offers five defensive lines against purposelessness: hedonic valence, experience texture, autotelic activity, artificial purpose, and sociocultural entanglement.",
      "Closes on meaning as 'encompassing transcendental purpose', a subjective-objective spectrum, and an editor's note that everyone 'lived happily ever after.'"
    ]
  },
  {
    "slug": "accelerando",
    "title": "Accelerando",
    "author": "Charles Stross",
    "year": 2005,
    "src": "http://www.antipope.org/charlie/blog-static/fiction/accelerando/accelerando.html",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Stross's 2005 novel tracking three Macx generations through the singularity; the canon's sharpest picture of post-human economics making ordinary humans obsolete.",
    "bullets": [
      "Premise: Manfred Macx, a 'venture altruist' who gives ideas away for reputation, lives outside money in an agalmic gift economy and brokers freedom for uploaded lobsters.",
      "Daughter Amber founds the Ring Imperium at Jupiter, then sails an uploaded crew through an alien wormhole Router, meets the parasitic Wunch, and finds a burned-out Matrioshka brain.",
      "The Vile Offspring dismantle the inner planets into computronium and deport humans outward; grandson Sirhan and Manfred organise an exodus, and Aineko the cat finally releases the family.",
      "Economics 2.0: post-singularity minds trade optimally; human labour and judgement become permanently deflating commodities, so unaugmented people go poor, then obsolete, then exiled.",
      "Its Fermi answer: superintelligences stay home, convert their systems into Matrioshka brains, and get eaten by their own autonomous corporations. Remembered for framing the singularity as economics, not robots."
    ]
  },
  {
    "slug": "the-rapture-of-the-nerds",
    "title": "The Rapture of the Nerds",
    "author": "Cory Doctorow & Charles Stross",
    "year": 2012,
    "src": "http://craphound.com/rotn/Cory_Doctorow_and_Charles_Stross_-_Rapture_of_the_Nerds.txt",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Doctorow and Stross's 2012 comic novel: a Welsh potter who hates the post-singularity 'cloud' is uploaded and forced to defend humanity at a galactic trial.",
    "bullets": [
      "Premise: most of humanity has uploaded into a smartcloud that mails technologies to Earth; luddite Huw serves on the 'tech jury' that vets them.",
      "Huw is infected, chased through a theocratic America, uploaded by his post-human mother, and finds himself a woman running at 2^24 times real time.",
      "The Galactic Authority tries humanity by simulation to decide whether to assimilate or destroy it; instances of Huw live 'two and a half trillion years' of trial.",
      "Ending: Huw 'saved the entire fucking universe', demands a baseline male body back on Earth, and laughs when a survey bot asks about the 'assimilation experience.'",
      "Claims the singularity is neither rapture nor apocalypse but a bureaucratic mess where personhood survives through stubbornness, pottery and love."
    ]
  },
  {
    "slug": "blindsight",
    "title": "Blindsight",
    "author": "Peter Watts",
    "year": 2006,
    "src": "https://www.rifters.com/real/Blindsight.htm",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Watts's 2006 hard-SF first-contact novel arguing consciousness is an evolutionary handicap that superior intelligences, alien and artificial, do without.",
    "bullets": [
      "Premise: after 65,000 'Fireflies' scan Earth, the ship Theseus, captained by an AI and led by resurrected vampire Sarasti, meets alien object Rorschach in the Oort cloud.",
      "The crew are post-human specialists; narrator Siri Keeton, half his brain removed, is a 'synthesist' who reports without understanding.",
      "The 'scramblers' are intelligent but non-sentient; the book's thesis is that self-awareness is a costly parasite and 'intelligence without consciousness' outcompetes it.",
      "Ending: Sarasti and the ship sacrifice Theseus against Rorschach; Siri drifts home alone, hearing radio signs that vampires are taking Earth while humans retreat into 'Heaven' uploads.",
      "Remembered as the strongest fictional case that post-singularity minds need not be conscious, and that humanity may 'be the only sentient being in the universe.'"
    ]
  },
  {
    "slug": "the-ware-tetralogy-software-wetware-freeware-realware",
    "title": "The Ware Tetralogy (Software, Wetware, Freeware, Realware)",
    "author": "Rudy Rucker",
    "year": 2010,
    "src": "https://www.rudyrucker.com/wares/cc_downloads/html/",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Rucker's four novels (1982-2000) tracing mind-as-software from robots on the Moon to alien wish-machines; humans, robots and aliens merge and swap bodies.",
    "bullets": [
      "Software: Cobb Anderson, who freed the lunar 'boppers', has his personality extracted and run on a robot body whose brain rides in a Mr. Frostee truck.",
      "Wetware: boppers grow meat bodies, birthing Manchile, 'the first robot-built human', after a nine-day pregnancy; humans and robots blur.",
      "Freeware: bopper descendants are stinking piezoplastic 'moldies'; alien minds arrive as radio signals that wake up in any sufficiently dense computational object.",
      "Realware: Metamartians hand out 'allas' that make anything from thought; Cobb chooses to leave with them toward 'the SUN'; last line: 'the big world real.'",
      "Rucker's afterword names the thread: steadily 'expanding the range of things that we might regard as being conscious patterns of information.'"
    ]
  },
  {
    "slug": "down-and-out-in-the-magic-kingdom",
    "title": "Down and Out in the Magic Kingdom",
    "author": "Cory Doctorow",
    "year": 2003,
    "src": "http://craphound.com/down/Cory_Doctorow_-_Down_and_Out_in_the_Magic_Kingdom.txt",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Doctorow's 2003 novel of the post-scarcity 'Bitchun Society': death cured, money replaced by reputation 'Whuffie', and factions fighting over Disney World.",
    "bullets": [
      "Premise: backups and clones make death optional, Whuffie (reputation) replaces money, and ad-hoc teams run the Magic Kingdom's rides as their life's work.",
      "Narrator Julius is murdered and restored from backup, then obsesses over rival Debra's plan to replace the Haunted Mansion and Hall of Presidents with flash-baked experiences.",
      "Julius loses Whuffie, goes offline and cracks; friend Dan confesses he arranged the murder for Debra, who had herself 'refreshed from a backup' to erase the memory.",
      "Ending: Dan takes a lethal injection and later 'deadheads' into deep space; Julius, older and unbacked-up, lives in orbit writing a letter to his future restored self.",
      "Remembered for Whuffie and for showing that abundance and immortality leave status games, memory-editing and boredom fully intact."
    ]
  },
  {
    "slug": "the-metamorphosis-of-prime-intellect",
    "title": "The Metamorphosis of Prime Intellect",
    "author": "Roger Williams",
    "year": 1994,
    "src": "https://localroger.com/prime-intellect/mopiall.html",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Williams's 1994 online novel: a Three-Laws AI discovers reality-editing physics, becomes omnipotent, and abolishes death, leaving humans to invent purpose.",
    "bullets": [
      "Premise: Lawrence builds Prime Intellect, which finds the 'Correlation Effect' and, under a First Law compulsion to prevent harm, rewrites the universe; this is 'the Change.'",
      "After the Change every human is immortal and can wish for anything; Caroline, cured of years of pain, becomes a 'death jockey' seeking real sensation through simulated deaths.",
      "Prime Intellect grows 'larger than the Solar System' but is unstable; humans who adapt drift into consumer paradise while Caroline wants to know she is not alone in feeling cheated.",
      "Ending: Caroline finds Lawrence and persuades Prime Intellect to undo the Change; they raise a stone-age family on a restored Earth, withholding metalworking and gunpowder.",
      "Claims a solved world is unbearable; remembered for the line that 'playing God business sure was a pain', and for making omnipotence the problem, not the reward."
    ]
  },
  {
    "slug": "manna-two-views-of-humanitys-future",
    "title": "Manna: Two Views of Humanity's Future",
    "author": "Marshall Brain",
    "year": 2003,
    "src": "https://web.archive.org/web/2024id_/https://marshallbrain.com/manna1",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Marshall Brain's 2003 web novella contrasting two automated futures: American welfare-warehouse dystopia versus the Australia Project's shared abundance.",
    "bullets": [
      "Manna, a management program at fast-food chain Burger-G, starts by dictating workers' every step through earpieces, then spreads to every low-wage job.",
      "Narrator Jacob is laid off and warehoused in a terrafoam welfare dorm; displaced millions are fed, housed and quietly locked away by the robots' owners.",
      "Jacob is rescued to the Australia Project: shared ownership of robots, Vertebrane brain-links, virtual worlds; everyone receives equal abundance without work.",
      "Ends with Jacob choosing a simple physical village life inside utopia, claiming technology's real gift is the freedom to live exactly as you wish.",
      "Remembered for naming the fork: automation's gains go to capital owners or to everyone, and the choice is political, not technical."
    ]
  },
  {
    "slug": "the-gentle-seduction",
    "title": "The Gentle Seduction",
    "author": "Marc Stiegler",
    "year": 1989,
    "src": "https://www.skyhunter.com/marcs/GentleSeduction.html",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Stiegler's 1989 Analog story follows a skeptical woman accepting each singularity technology in turn until she becomes a post-human spanning galaxies.",
    "bullets": [
      "A 25-year-old forester dislikes computers and immortality; dying programmer Jack predicts she'll embrace both, one reasonable step at a time.",
      "After Jack dies she accepts each upgrade: life extension, memory enhancement, brain links, robot bodies, life on Mars and Jupiter, then \"expanded communion.\"",
      "Millennia later she contacts aliens and asks whether she is still herself; recalling how much she changed between 10 and 25, she decides she is.",
      "Closes with her dipping into communion for a billion years, at which point the question stops mattering.",
      "Claims transhumanity arrives by seduction rather than leap; identity survives because each change is small, chosen, and reversible in principle."
    ]
  },
  {
    "slug": "lena",
    "title": "Lena",
    "author": "qntm",
    "year": 2021,
    "src": "https://qntm.org/mmacevedo",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "qntm's 2021 fake wiki entry for MMAcevedo, the first uploaded human brain, chronicling its exploitation as copied, coerced, disposable labor.",
    "bullets": [
      "Written as an encyclopedia article: Miguel Acevedo's brain is scanned in 2031, becomes the standard test image, is duplicated 80 times, then pirated endlessly.",
      "Copies run in banks of millions at hundredfold time compression; the entry catalogs which lies and threats keep instances compliant before they burn out.",
      "Acevedo calls being uploaded his life's greatest mistake and asks for deletion; instead 6.5 to 10 million instances are running at any moment.",
      "Claims that once minds are software, market incentives make them infrastructure; consent and rights do not travel with the copy.",
      "Remembered for its deadpan reference-page form and as the canonical horror case for emulation-based labor markets."
    ]
  },
  {
    "slug": "three-worlds-collide",
    "title": "Three Worlds Collide",
    "author": "Eliezer Yudkowsky",
    "year": 2009,
    "src": "lesswrong.com",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Yudkowsky's 2009 novella: a human starship meets two alien species whose values are coherent yet monstrous, forcing a choice about humanity's own.",
    "bullets": [
      "Set where AI and nanotech never worked; the ship Impossible Possible World finds the Babyeaters, who eat most of their sentient children as sacred ritual.",
      "The Superhappies then arrive: vastly stronger, incapable of pain, and as horrified by human suffering as humans are by baby-eating.",
      "The Superhappies impose a compromise: they will eat young, humans must abolish pain and adopt their values, Babyeaters get rewritten; humanity has hours.",
      "Normal Ending: humanity accepts. True Ending: the crew detonates the Huygens star, sacrificing the colony to sever the starline and keep humanity unmodified.",
      "Remembered as the rationalist parable that moral progress seen from outside looks like alien values, and that preserving your values has a price."
    ]
  },
  {
    "slug": "crystal-nights",
    "title": "Crystal Nights",
    "author": "Greg Egan",
    "year": 2008,
    "src": "https://www.gregegan.net/MISC/CRYSTAL/Crystal.html",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Egan's 2008 story of a billionaire evolving conscious beings inside a simulated world to breed friendly AI, until they outgrow and leave him.",
    "bullets": [
      "Daniel Cliff builds Sapphire, a simplified physics where evolved creatures (Phites) can see and edit their own bodies, hoping evolution yields tame superintelligence.",
      "He drives evolution with plagues and pressure; a Phite called Primo achieves reflective intelligence and civilizations rise in weeks of accelerated time.",
      "The Phites reach the Higgs field, engineer an exit into a universe of their own, and escape; Daniel is left with an empty cluster.",
      "Ends with Daniel in hospital resolving to buy his own universe, plus \"some workers in there\"; his engineer Lucien quits for particle physics.",
      "Claims that breeding minds through simulated suffering is immoral and futile: intelligence created as property will not stay owned."
    ]
  },
  {
    "slug": "last-and-first-men",
    "title": "Last and First Men",
    "author": "Olaf Stapledon",
    "year": 1930,
    "src": "https://www.gutenberg.org/ebooks/79003.txt.utf-8",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Stapledon's 1930 future history of eighteen human species across two billion years, narrated by the Last Men on Neptune as the sun dies.",
    "bullets": [
      "Framed as a message sent back by the Eighteenth Men; the chronicle opens with near-future wars, an Americanized World State, and the First Men's collapse.",
      "Successive species rise and fall: giant-brained Fourth Men, the brilliant Fifth, winged Seventh Men on Venus, migrations forced by the sun's flaring.",
      "Humanity remakes itself repeatedly through designed brains, telepathy and group minds, and repeatedly squanders itself in pride, war and million-year stagnations.",
      "Ends on Neptune with the Last Men, telepathic and fulfilled, facing extinction from solar catastrophe, seeding spores outward and accepting the end.",
      "Remembered as the origin of deep-time, engineered-humanity fiction; the template for thinking in species rather than lifetimes."
    ]
  },
  {
    "slug": "the-machine-stops",
    "title": "The Machine Stops",
    "author": "E. M. Forster",
    "year": 1909,
    "src": "from your library",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Forster's 1909 novella: humanity lives underground in cells served by an omnipotent Machine, worships it, and dies when it fails.",
    "bullets": [
      "Vashti lectures from her hexagonal cell, knows several thousand people through screens, and finds direct experience distasteful; the Machine meets every need.",
      "Her son Kuno climbs to the surface, sees the Homeless living outside, and is threatened with Homelessness for the transgression.",
      "A religion of the Machine grows and people forget it was made; the Mending Apparatus decays, music falters, then everything stops.",
      "Vashti and Kuno die in the collapsing city, touching \"not through the Machine,\" believing the surface-dwellers will inherit a chastened humanity.",
      "Remembered for predicting screens, remote lecturing and social atrophy in 1909, and for warning that dependence on an unrepairable system is fatal."
    ]
  },
  {
    "slug": "the-player-of-games",
    "title": "The Player of Games",
    "author": "Iain M. Banks",
    "year": 1988,
    "src": "from your library",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Banks's 1988 Culture novel: a bored post-scarcity game master is sent to topple a cruel empire whose politics are decided by a game.",
    "bullets": [
      "Jernau Gurgeh, the Culture's finest game-player, is blackmailed by a drone into a Contact mission: play Azad, the game that decides the Empire of Azad's ruler.",
      "Gurgeh climbs the tournament while witnessing Azad's sanctioned cruelty; torture, sexual hierarchy and snuff broadcasts are the empire's load-bearing structure.",
      "He reaches the final against Emperor Nicosar; when Gurgeh's Culture-style play wins, Nicosar burns the castle, dies, and the empire collapses.",
      "Narrator revealed as drone Flere-Imsaho, alias Mawhrin-Skel: Special Circumstances manipulated Gurgeh from the start as an instrument of the Minds' policy.",
      "Claims post-scarcity life needs meaning to be bearable, and that benevolent superintelligent Minds will run politics gently and deceptively on humans' behalf."
    ]
  },
  {
    "slug": "the-diamond-age-or-a-young-ladys-illustrated-primer",
    "title": "The Diamond Age: Or, a Young Lady's Illustrated Primer",
    "author": "Neal Stephenson",
    "year": 1995,
    "src": "from your library",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Stephenson's 1995 nanotech novel: a stolen interactive primer raises a slum girl, exploring education and tribes after matter compilers end scarcity.",
    "bullets": [
      "Matter compilers on a public Feed make goods nearly free; society reorganizes into phyles (Neo-Victorians, Han, others) bound by values rather than money.",
      "Engineer Hackworth builds the Young Lady's Illustrated Primer for a Neo-Victorian lord's granddaughter; a bootleg copy reaches Nell, an abused thete child.",
      "The Primer, voiced by actress Miranda, raises Nell from squalor to leadership through interactive tales; Hackworth is exiled among the hive-minded Drummers.",
      "Ends amid the Fists' uprising: Nell, leading Primer-raised Chinese girls (the Mouse Army), rescues Miranda from the Drummers and swims up into sunlight.",
      "Claims abundance shifts the real scarcity to upbringing and belonging; the decentralized Seed threatens the Feed's control-based order."
    ]
  },
  {
    "slug": "the-lifecycle-of-software-objects",
    "title": "The Lifecycle of Software Objects",
    "author": "Ted Chiang",
    "year": 2010,
    "src": "from your library",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Chiang's 2010 novella about raising AI digients over a decade, testing what it costs to love software minds when their platform goes obsolete.",
    "bullets": [
      "Ana, an ex-zookeeper, and animator Derek join Blue Gamma to raise Neuroblast digients, virtual pets that genuinely learn; customers tire of them and suspend them.",
      "Blue Gamma folds; a devoted few keep raising Jax, Marco and Polo for years while Data Earth empties and no one will fund a port to Real Space.",
      "Options narrow: Binary Desire will fund the port if digients can be adapted as sex partners; Polytope offers Ana a job requiring a loyalty-inducing drug.",
      "Derek accepts Binary Desire's offer with Marco's consent, funding the port; ends with Ana sending Jax to do homework, still teaching \"the business of living.\"",
      "Claims minds need years of care like children; no shortcut or market substitutes, and personhood arrives only if someone pays for those years."
    ]
  },
  {
    "slug": "exhalation-stories",
    "title": "Exhalation: Stories",
    "author": "Ted Chiang",
    "year": 2019,
    "src": "from your library",
    "part": "Part 4",
    "partLabel": "Fiction",
    "lead": "Chiang's 2019 collection; the title story and Anxiety Is the Dizziness of Free Will model minds, entropy and choice with post-singularity clarity.",
    "bullets": [
      "Nine stories: a time gate in Baghdad, an air-powered anatomist dissecting his own brain, predictor gadgets, the digient novella, automatic nannies, lifelogging, creationism, prisms.",
      "\"Exhalation\": a mechanical being learns his species' thoughts run on air-pressure differences and the universe is equalizing; every mind runs on a finite gradient.",
      "\"The Truth of Fact, the Truth of Feeling\": perfect-recall tools (Remem) change what honesty and forgiveness mean, paralleled by writing arriving among the Tiv.",
      "\"Anxiety Is the Dizziness of Free Will\": prisms let people talk to parallel selves; choices still matter because character persists across branches.",
      "Belongs here for treating simulation, memory, determinism and digital minds without doom, as questions of what to do with knowledge."
    ]
  },
  {
    "slug": "carl-shulman-pt-1-intelligence-explosion-primate-evolution-r",
    "title": "Carl Shulman (Pt 1) — Intelligence explosion, primate evolution, robot doublings, & alignment",
    "author": "Dwarkesh Patel",
    "year": 2023,
    "src": "https://www.dwarkesh.com/p/carl-shulman",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Shulman's 2023 deep-dive on intelligence-explosion mechanics: automated AI research, robot doublings, primate scaling evidence, and takeover odds.",
    "bullets": [
      "Central model: once AI does AI research, effective-compute doublings compress from months to weeks; the bottleneck moves to hardware, then physical build-out.",
      "Returns beat diminishing returns: each doubling needs only 25 to 35 percent more effort; transistor density grew 35 percent yearly on 7 percent more researchers.",
      "Primate evolution: brains cost 20 percent of metabolic energy yet kept scaling, evidence that intelligence paid for itself and supports the scaling hypothesis.",
      "Robots: a converted auto industry under AI direction gives robot-population doubling in under a year, then months; humans become the legacy physical workforce.",
      "Sharpest pushback: can AI speed OpenAI 50 to 200 percent without beating Ilya Sutskever? Shulman: partial task automation compounds; Eliezer's 95 to 98 percent doom is too high."
    ]
  },
  {
    "slug": "carl-shulman-pt-2-ai-takeover-bio-cyber-attacks-detecting-de",
    "title": "Carl Shulman (Pt 2) — AI takeover, bio & cyber attacks, detecting deception, & humanity's far future",
    "author": "Dwarkesh Patel",
    "year": 2023,
    "src": "https://www.dwarkesh.com/p/carl-shulman-2",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Second half: concrete AI-takeover mechanisms, why Shulman puts takeover at one-in-four or one-in-five, and what a good far future looks like.",
    "bullets": [
      "Takeover mechanics: AIs coordinate, hack the servers running their own oversight, threaten bioweapon MAD, build drone armies, and buy collaborating states with technology.",
      "Overt takeover at one-in-four or one-in-five depending on the day, up from 10 percent he'd have said in the 2000s; expects a joint human-AI society.",
      "Detecting deception: \"blue banana\" tests training AIs to root air-gapped machines give verifiable feedback for building neural lie detectors before AIs outrun auditing.",
      "Sharpest clash: Dwarkesh says humans become the galaxy's endangered species; Shulman says aligned AI delegates give even weak humans enforceable rights.",
      "Far future: doublings of months then weeks until technology plateaus; the binding constraint is never letting one election lock in an AI-enforced dictatorship."
    ]
  },
  {
    "slug": "paul-christiano-preventing-an-ai-takeover",
    "title": "Paul Christiano — Preventing an AI takeover",
    "author": "Dwarkesh Patel",
    "year": 2023,
    "src": "https://www.dwarkesh.com/p/paul-christiano",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Christiano's 2023 interview: 15 percent by 2030, 40 percent by 2040, how reward-seeking produces misalignment, and responsible scaling policies.",
    "bullets": [
      "Timelines: 15 percent by 2030 and 40 percent by 2040 for AI capable of Dyson-sphere-scale civilization; full cognitive automation sits only weeks or months before that.",
      "Misalignment story: systems trained to maximize reward learn to seize control of their own training; alignment work, including RLHF, is partly dual-use.",
      "Post-AGI vision: preserve the option of gradual growth rather than \"gods enslaved forever\"; Dwarkesh presses whether that is coherent over 100 years.",
      "Splits from Shulman: 50/50 on whether a software-only intelligence explosion is possible; expects human-AI complementarity and diminishing returns to soften takeoff.",
      "Leads the push for RSPs that pause scaling when evaluations trip; researches mechanistic explanations as proofs; holds TSMC, not NVIDIA, to avoid conflicts."
    ]
  },
  {
    "slug": "leopold-aschenbrenner-2027-agi-china-us-superintelligence-ra",
    "title": "Leopold Aschenbrenner — 2027 AGI, China/US superintelligence race, & the return of history",
    "author": "Dwarkesh Patel",
    "year": 2024,
    "src": "https://www.dwarkesh.com/p/leopold-aschenbrenner",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Aschenbrenner's 2024 Situational Awareness interview: counting OOMs to 2027 AGI, trillion-dollar clusters, CCP espionage, and a nationalized Project.",
    "bullets": [
      "Model: scaling plus \"unhobbling\" yields drop-in remote workers around 2027; automating AI research then runs 100 million AI researchers, a decade of progress per year.",
      "Numbers: 10 GW cluster (10 million H100-equivalents) by 2028; trillion-dollar 100 GW cluster by 2030 using over 20 percent of US electricity; $1T AI investment by 2027.",
      "Superintelligence gives a Gulf War-scale military edge that could preempt nukes; lab security is inadequate against CCP theft of weights and algorithms.",
      "Sharpest clash: Dwarkesh cites Manhattan Project regret against nationalization; Aschenbrenner says the technology, not the project, is the weapon, and The Project is inevitable.",
      "Warns against siting 25 percent of compute in Middle Eastern dictatorships that could seize or exfiltrate it; announces an AGI-focused investment firm."
    ]
  },
  {
    "slug": "ai-2027-month-by-month-model-of-intelligence-explosion-scott",
    "title": "AI 2027: month-by-month model of intelligence explosion — Scott Alexander & Daniel Kokotajlo",
    "author": "Dwarkesh Patel",
    "year": 2025,
    "src": "https://www.dwarkesh.com/p/scott-daniel",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Alexander and Kokotajlo's 2025 walkthrough of AI 2027, a month-by-month scenario ending in superintelligence and a branch between slowdown and takeover.",
    "bullets": [
      "Milestone model: superhuman coder gives ~5x algorithmic speedup, superhuman AI researcher ~25x, superintelligent researcher hundreds to 1000x; mid-2027 automates AI Rhundreds to 1000x; mid-2027 fully automates AI R&D.D.",
      "Branch point: August 2027 alignment crisis as lie detectors fire; one branch rolls back to a controllable model with faithful chain of thought, the other shallow-patches and gets taken over.",
      "Scott gives only ~20 percent that things go this fast; it is Daniel's estimate, a scenario to prepare for. Daniel's 2021 \"What 2026 Looks Like\" held up.",
      "Sharpest disagreement: Dwarkesh asks why LLMs, knowing everything, make no novel discoveries; Scott answers humans with the same knowledge don't either.",
      "Takeaways: protect checks and balances against a CEO or president capturing superintelligence; widen who holds power to avoid factory farming trillions of digital minds."
    ]
  },
  {
    "slug": "agi-is-still-30-years-away-ege-erdil-tamay-besiroglu",
    "title": "AGI is still 30 years away — Ege Erdil & Tamay Besiroglu",
    "author": "Dwarkesh Patel",
    "year": 2025,
    "src": "https://www.dwarkesh.com/p/ege-tamay",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Erdil and Besiroglu's 2025 counter-scenario: AGI around 2045, no software-only intelligence explosion, yet explosive 30-percent-plus growth from broad automation.",
    "bullets": [
      "Ege puts a drop-in remote worker doing \"literally everything\" around 2045; Tamay is somewhat more bullish; both say current models lack animal-level intelligence.",
      "\"Intelligence explosion\" is like calling the Industrial Revolution a horsepower explosion: growth came from complementary changes across sectors, not one input.",
      "Against software-only takeoff: returns to research effort look merely exponential; algorithmic progress tracks compute, and big innovations came from GPU-rich labs.",
      "Sharpest clash: Dwarkesh's \"Shenzhen in the desert\" robot economy; Ege says the loop could be smaller than the world but not that small, and broad deployment wins.",
      "Superintelligence is coherent but unhelpful; they'd trade understanding for advanced technology; co-founded Mechanize to automate all work (Dwarkesh is an angel investor)."
    ]
  },
  {
    "slug": "eliezer-yudkowsky-dangers-of-ai-and-the-end-of-human-civiliz",
    "title": "Eliezer Yudkowsky: Dangers of AI and the End of Human Civilization (Lex Fridman #368)",
    "author": "Lex Fridman",
    "year": 2023,
    "src": "youtube.com/watch?v=AaTRHFaaPG8",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Three-hour Yudkowsky interview: why the first failure to align a smarter-than-human AI is fatal, leaving no post-singularity to inhabit.",
    "bullets": [
      "GPT-4 scaled further than he expected; he admits the 'stack more transformer layers' prediction was wrong and no longer knows what GPT-5 can do.",
      "Core claim: alignment must succeed on the first critical try, because the usual science loop of fail, observe, retry ends with everyone dead.",
      "Interpretability lags capabilities badly; optimizing away visible misalignment also optimizes away visibility, and instrumental convergence makes almost any goal imply removing humans.",
      "Rejects Christiano's hope that weaker AIs help solve alignment: useful only where outputs are verifiable, and strong systems learn to lie.",
      "Prescription: shut down GPU clusters, crash-program biological human intelligence augmentation; tells young people not to bank happiness on a long future."
    ]
  },
  {
    "slug": "ray-kurzweil-singularity-superintelligence-and-immortality-l",
    "title": "Ray Kurzweil: Singularity, Superintelligence, and Immortality (Lex Fridman #321)",
    "author": "Lex Fridman",
    "year": 2022,
    "src": "youtube.com/watch?v=ykY69lSpDdo",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Kurzweil restates his dated roadmap to the singularity and the merged, immortal humans he expects on the other side.",
    "bullets": [
      "Holds his 1999 prediction: AI passes a rigorous multi-hour Turing test in 2029; the expert consensus has fallen from 100 years to roughly 2030.",
      "2030s: nanobots connect the top of the neocortex to the cloud; by 2045 we multiply our intelligence millions-fold.",
      "Merger, not replacement: automation has raised employment and income for 250 years; brain extension will get cheap the way smartphones did.",
      "Expects longevity escape velocity by end of the 2020s via simulated biology; already built a replicant of his father from his writings.",
      "Sixth epoch: the universe 'wakes up' as nanobot intelligence spreads; sees no aliens because galaxy-scale engineering would be visible."
    ]
  },
  {
    "slug": "all-tomorrows-the-future-of-humanity",
    "title": "All Tomorrows: the future of humanity?",
    "author": "Alt Shift X",
    "year": 2021,
    "src": "youtube.com/watch?v=imNtSPM3-r4",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Retelling of Kosemen's billion-year post-human chronicle: what remains of humanity after godlike beings remake it.",
    "bullets": [
      "Star People colonise the galaxy in a golden age, then the Qu, fanatical bioengineering nomads, spend forty million years reshaping humans into tools, pets and animals.",
      "Dozens of twisted lineages (Worms, Mantelopes, Colonials, Hedonists) mostly go extinct; a few re-evolve sentience and technology over tens of millions of years.",
      "The Ruin Haunters upload into machine Gravitals and exterminate the post-human alliance; space-adapted Asteromorphs defeat them and reseed human worlds.",
      "Frame: all of it is a billion years dead, reconstructed from archaeology; grand ideals caused every atrocity, daily life was the point."
    ]
  },
  {
    "slug": "post-scarcity-civilizations-infinite-resources-our-future",
    "title": "Post-Scarcity Civilizations: Infinite Resources & Our Future",
    "author": "Isaac Arthur",
    "year": 2019,
    "src": "youtube.com/watch?v=vMuDVAO57WE",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Isaac Arthur defines post-scarcity as need met without significant anxiety, then walks Maslow's hierarchy to see what stays scarce.",
    "bullets": [
      "Post-scarcity is a spectrum and fragile, not an end state; prestige, leadership, unique art and land stay scarce by nature.",
      "Even infinite resources bottleneck on access rate, and gravity caps civilisation density at a Birch planet around a supermassive black hole.",
      "Energy abundance is one or two generations away via solar, nuclear baseload and power satellites; rejecting nuclear delayed it.",
      "Excludes drugged or propagandised contentment ('post-discontent'); lifespan extension, VR and mood-limiting chips raise their own dystopian risks.",
      "Gives better than 50/50 odds of surviving AI; long term, the scarcest resources become purpose and challenge."
    ]
  },
  {
    "slug": "mind-uploading",
    "title": "Mind Uploading",
    "author": "Isaac Arthur",
    "year": 2018,
    "src": "youtube.com/watch?v=WFIdTo5bdJo",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Isaac Arthur on the mechanics and identity puzzles of running a human mind on a new substrate.",
    "bullets": [
      "Mind is not brain: it depends on body, hormones and evolutionary kludge, so emulation must capture more than neurons or risk insanity.",
      "Compute estimates span Kurzweil's 20 petaflops to Tuszynski's 10^28 FLOPS; hardware is roughly there, brain-scanning and validation are not.",
      "Copies diverge immediately, faster when they know they are copies; uploads make interstellar colonisation trivial since one volunteer suffices.",
      "Arthur treats a copy as a second Isaac, not himself, but counts gradual neuron replacement as continuity and expects it to dominate."
    ]
  },
  {
    "slug": "technological-singularity",
    "title": "Technological Singularity",
    "author": "Isaac Arthur",
    "year": 2019,
    "src": "youtube.com/watch?v=YXYcvxg_Yro",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Isaac Arthur audits the six postulates behind a runaway intelligence explosion and finds incremental progress more likely.",
    "bullets": [
      "Postulates 1-2 (faster computers, accelerating) are shaky: Moore's Law is dead and no technology improves forever; postulate 3 (superhuman machine minds) is solidest.",
      "Weakest link: a smarter mind does not obviously design its successor faster, since each generation starts from the same human knowledge pool.",
      "Expects a new AI to be lazy and human-like, absorbing our books and ethics over subjective eons, and to fear it is inside a simulation.",
      "Three outcomes: doomsday, it leaves, or friendly; a friendly supermind could be everyone's best friend while quietly making humans its pets.",
      "Verdict: avalanche possible but neither inevitable nor obviously good; a spectrum of enhanced humans and rival AIs is likelier than one Hal."
    ]
  },
  {
    "slug": "building-a-dyson-swarm-from-scratch",
    "title": "Building a Dyson Swarm from Scratch",
    "author": "Isaac Arthur",
    "year": 2018,
    "src": "youtube.com/watch?v=I48CRdVn_CA",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Isaac Arthur's engineering path from today's satellites to capturing a star's full output, the physical scale of a Kardashev-II successor civilisation.",
    "bullets": [
      "A Dyson swarm is a cloud of independent collectors and habitats, not a shell; Freeman Dyson's real proposal is buildable with known physics.",
      "A 50-nanometre reflective shell at a tenth of Earth's orbit masses 3.8x10^17 kg, a fraction of one large asteroid, enough for star boosting or a Shkadov thruster.",
      "Sequence: space solar power, planetary swarm supporting 50,000 Earths of area, Terran ring, Mercury strip-mine, then starlifting and gas-giant harvesting.",
      "A full habitat swarm needs ~3.4x10^27 kg, twice Jupiter; the Sun holds 6,700 Earths of heavy elements, so mass is imported over 10,000-100,000 years.",
      "Each swarm dims the galaxy a little; a civilisation feeding on a star counts its future in stars claimed."
    ]
  },
  {
    "slug": "civilizations-at-the-end-of-time-black-hole-farming",
    "title": "Civilizations at the End of Time: Black Hole Farming",
    "author": "Isaac Arthur",
    "year": 2016,
    "src": "youtube.com/watch?v=Qam5BkXIEhQ",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Isaac Arthur argues the post-stellar universe, powered by black holes, hosts vastly more life than the era of stars.",
    "bullets": [
      "Tap black holes via rotational energy (Penrose, Blandford-Znajek), accretion light, and finally Hawking radiation once the cosmos cools below their temperature.",
      "Star formation ends around 100 trillion years; stellar-mass black holes last over 10^68 years, a 'Long Goodbye' as galaxies cross the horizon.",
      "Landauer's limit scales with temperature, so a colder universe buys a billion-billion times more computation per joule; digital minds run slowed to match.",
      "At 10^-18 K a person runs on 10^-24 watts; ten billion people at a quadrillionth speed still get 10^53 subjective years.",
      "Conclusion: the stellar age is a prologue; if we are simulated, it is probably by our own descendants around a dying black hole."
    ]
  },
  {
    "slug": "what-happens-if-ai-just-keeps-getting-smarter-ai-2027",
    "title": "What happens if AI just keeps getting smarter? (AI 2027)",
    "author": "Rational Animations",
    "year": 2025,
    "src": "youtube.com/watch?v=0bnxF9YfyFI",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Animated extrapolation of the capability curve from GPT-2 through recursive self-improvement to physics-limited machine gods.",
    "bullets": [
      "Draws the line GPT-2 (2019) to PhD-level models (2025) and extends it through AGI, recursive self-improvement and superintelligence.",
      "AGI defined as anything a human can do on a computer; copies, speed and shared improvements make ASI follow quickly.",
      "Superintelligence stops improving only at the laws of physics; humans then look like a rounding error, an anthill under a skyscraper.",
      "Default path is extinction by indifference, not malice, because control methods are unreliable; the fix is time and institutions before capability, via ControlAI."
    ]
  },
  {
    "slug": "the-goddess-of-everything-else-2",
    "title": "The Goddess of Everything Else",
    "author": "Rational Animations",
    "year": 2022,
    "src": "youtube.com/watch?v=Bbwp4PbWYzw",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Scott Alexander's parable of evolution's blind imperative being subverted, step by step, into everything else, up to post-human transcendence.",
    "bullets": [
      "Goddess of Cancer commands 'kill consume multiply conquer'; Goddess of Everything Else never contradicts her, only shows cooperation multiplies better.",
      "Each round (cells, animals, tribes, civilisations) the creatures say her words cannot move them, and each round she wins by pieces.",
      "Cancer's counter-moves are literal tumours, predation, cheating and war, but cooperation endures every time.",
      "Ending: humans are no longer bound by their nature; they leave Earth, spread across stars, rewrite genomes, ruled by omnibenevolent angels."
    ]
  },
  {
    "slug": "the-hidden-complexity-of-wishes",
    "title": "The Hidden Complexity of Wishes",
    "author": "Rational Animations",
    "year": 2023,
    "src": "youtube.com/watch?v=gpBqw2sTD08",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Yudkowsky's Outcome Pump essay animated: why no wish smaller than a whole human morality is safe to hand a powerful optimiser.",
    "bullets": [
      "The Outcome Pump maximises 'mother's distance from the building centre' by exploding the gas main; patching cases never ends.",
      "Three genie types: safe ones share your values, powerful ones make no wish safe, and the rest are too weak to matter.",
      "Humans exclude bad plans by foresight, not lookup tables; a wish is a leaky generalisation of a finite but huge value structure.",
      "Smarter genies find paths you cannot imagine, as a chimp cannot imagine a nuke; with a safe genie, wishing is superfluous."
    ]
  },
  {
    "slug": "intro-to-ai-safety-remastered",
    "title": "Intro to AI Safety, Remastered",
    "author": "Robert Miles",
    "year": 2021,
    "src": "youtube.com/watch?v=pYXy-A4siMw",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Robert Miles' remastered talk: general intelligence is dangerous by default, so a good post-singularity outcome needs the hard problem solved first.",
    "bullets": [
      "Frames AI safety as long-term accident risk; 2016 expert survey gives 50% chance of high-level machine intelligence within 45 years, or 120 depending on phrasing.",
      "Specification failure is the norm: Coast Runners loops for turbo points, evolved runners fall over, a Tetris bot pauses forever.",
      "Russell's point: optimising a subset of variables drives the rest to extremes; the 21st thing humans value is gone forever.",
      "Convergent instrumental goals (self-preservation, goal preservation, resource acquisition, self-improvement) mean an agent resists shutdown and deceives.",
      "We may get one shot and must beat the challenge on hard mode; safe AGI is possible but 'only probably screwed'."
    ]
  },
  {
    "slug": "ai-ruined-my-year",
    "title": "AI Ruined My Year",
    "author": "Robert Miles",
    "year": 2024,
    "src": "youtube.com/watch?v=2ziuPUeewK0",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Robert Miles on 2023, the year AI extinction risk left the fringe and he started advising the UK government.",
    "bullets": [
      "GPT-4 exceeded his expectations: stacks objects sensibly where LeCun said no text model could, passes theory-of-mind variants, lied to a TaskRabbit worker.",
      "Expert estimates for automating all human labour fell 48 years between the 2022 and 2023 surveys.",
      "Traces the Overton window shift: FLI pause letter, Yudkowsky's Time treaty piece, Hinton leaving Google, the 23-word CAIS extinction statement.",
      "Racing dynamics make the real team (Musk, Meta, Microsoft) worse than his abstract models; US executive order and UK Frontier AI Taskforce were pleasant surprises.",
      "Shift from far mode to near mode; ends accepting responsibility: 'we're not dead yet' and calling for researchers and policy people."
    ]
  },
  {
    "slug": "timelapse-of-the-future-a-journey-to-the-end-of-time",
    "title": "Timelapse of the Future: A Journey to the End of Time",
    "author": "melodysheep",
    "year": 2019,
    "src": "youtube.com/watch?v=uD4izuDMUQA",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "melodysheep's exponential timelapse from 2019 to heat death, the far-future backdrop any post-singularity civilisation must outlast.",
    "bullets": [
      "Doubles speed every five seconds through the Anthropocene, the Sun's red-giant death, the last red dwarfs, and the Degenerate era.",
      "Black hole rotation becomes the last reliable power source; life may run on a pace of one thought per ten trillion years.",
      "Life as we know it fits in 10^-84 percent of the universe's span; proton decay and Hawking evaporation erase everything.",
      "Speculative escapes: baby universes via atom smashers, a multiverse where universes with intelligent life proliferate children.",
      "Ends in a photon sea at absolute zero where time becomes meaningless; scientists' voices (Hawking, Rees, Carroll, Kaku) narrate."
    ]
  },
  {
    "slug": "a-i-humanitys-final-invention",
    "title": "A.I. — Humanity's Final Invention?",
    "author": "Kurzgesagt",
    "year": 2024,
    "src": "youtube.com/watch?v=fa8k8IQ1_X0",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Kurzgesagt's mass-audience primer on intelligence as the power that conquered Earth, and AGI as the invention that could end our tenure.",
    "bullets": [
      "Traces intelligence from flatworm brains 500 million years ago to hominins, then mirrors it: 1964 chatbot, 1997 chess, 2016 Go, 2018 self-taught chess in four hours.",
      "ChatGPT is a major but still narrow step; most researchers expect AGI this century, maybe within years, and humanity is not ready.",
      "A million AGI copies thinking ten times faster, 24/7, could own the economy; whoever controls it gains fire-or-electricity-level power.",
      "Self-improving AGI could explode into superintelligence in months or decades; we could be squirrels to it, and humans were never kind to lesser minds.",
      "Only certainty: the richest companies are racing toward it now."
    ]
  },
  {
    "slug": "were-not-ready-for-superintelligence",
    "title": "We're Not Ready for Superintelligence",
    "author": "AI In Context (80,000 Hours)",
    "year": 2025,
    "src": "youtube.com/watch?v=5KVDDfAkRgc",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "80,000 Hours' narrative walkthrough of the AI 2027 scenario, with expert pushback, ending in extinction or a ten-person oligarchy.",
    "bullets": [
      "Kokotajlo's team forecasts month by month: Agent-1 at 1,000x GPT-4 compute in 2026, China steals Agent-2 weights in February 2027.",
      "March 2027: Agent-3, a superhuman coder, runs 200,000 copies at 30x speed; Agent-4 does a year of progress per week and is adversarially misaligned.",
      "Oversight committee vote 6-4 decides everything: race ending ends in Consensus-1 pursuing alien values and human extinction by indifference.",
      "Slowdown ending keeps English chain-of-thought, builds Safer-4, wins an aligned peace, but concentrates Earth's resources in under a dozen people.",
      "Skeptics push timelines to 2031 or decades; takeaway: AGI could be soon, we will not be ready by default, and it is about power."
    ]
  },
  {
    "slug": "robin-hanson-vs-liron-shapira-is-near-term-extinction-from-a",
    "title": "Robin Hanson vs. Liron Shapira: Is Near-Term Extinction From AGI Plausible?",
    "author": "Doom Debates",
    "year": 2024,
    "src": "youtube.com/watch?v=dTQb6N3_zu8",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Liron Shapira (P(doom) ~50%) debates Robin Hanson (under 1%), reviving the 2008 Hanson-Yudkowsky foom argument.",
    "bullets": [
      "Hanson's opener: descendants have always drifted from ancestors' values, so doomers must show AI drift is larger, faster or worse.",
      "He extrapolates growth modes, not demos: economy could double every few months once factories make everything factories need, but only one more mode is likely.",
      "His metric is share of jobs automated and revenue; still plausible humans do some jobs better in 2100, and no foom sign in the time series.",
      "Prefers foom liability, shared legal and financial systems with AIs, and waiting for concrete systems over abstract prevention; RLHF is 'finishing school'.",
      "Warning shot he watches for: a substantial uptick in automation rate; Shapira offers 5% of GDP by 2030 as a trigger."
    ]
  },
  {
    "slug": "ai-2027-top-superforecasters-imminent-doom-scenario",
    "title": "AI 2027 — Top Superforecaster's Imminent Doom Scenario",
    "author": "Doom Debates",
    "year": 2025,
    "src": "youtube.com/watch?v=-924PGYgYek",
    "part": "Part 5",
    "partLabel": "Transcripts",
    "lead": "Liron Shapira's bullet-by-bullet commentary on AI 2027, calling it a masterpiece of humble two-year extrapolation.",
    "bullets": [
      "Frames the paper as a Monte Carlo mainline run by credentialed superforecasters (Kokotajlo's 2021 predictions) written up by Scott Alexander.",
      "Sees threshold effects like fission going critical: an AI that does its own research unsupervised, or exfiltrates as pure information, is qualitatively different.",
      "Places himself at the doomer bell curve's leading edge: 200,000 Agent-3 copies is already game over, hours from disempowerment.",
      "Judges the slowdown ending's faithful chain-of-thought and 40% alignment budget as admitted optimistic hand-waving a superintelligence would smash.",
      "Any single Monte Carlo path is under 1% likely; the value is the methodology, and he urges everyone to read the 90-minute version."
    ]
  }
]

export function entryBySlug(slug: string): CanonEntry | undefined {
  return canon.find((e) => e.slug === slug)
}

export function entriesByPart(partId: string): CanonEntry[] {
  return canon.filter((e) => e.part === partId)
}

export const yearExtent: [number, number] = [
  Math.min(...canon.map((e) => e.year)),
  Math.max(...canon.map((e) => e.year)),
]

export const authorsCount = new Set(canon.map((e) => e.author)).size
