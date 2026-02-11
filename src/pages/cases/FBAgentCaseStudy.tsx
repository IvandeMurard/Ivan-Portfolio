// FBAgentCaseStudy.tsx - Main case study page
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, FAQItem, QuoteBlock, Section } from "@/components/casestudy";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/Navigation";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { designTokens } from "@/design-tokens";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import "@/styles/fb-agent.css";
const FBAgentCaseStudy: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const sections = [
    {
      id: "problem",
      label: "1. Problem",
    },
    {
      id: "role",
      label: "2. Role",
    },
    {
      id: "solution",
      label: "3. Solution",
    },
    {
      id: "roadmap",
      label: "4. Process",
    },
    {
      id: "architecture",
      label: "5. Architecture",
    },
    {
      id: "challenges",
      label: "6. Challenges",
    },
    {
      id: "faq",
      label: "7. FAQ",
    },
    {
      id: "go-further",
      label: "8. More",
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* <ProgressIndicator sections={sections} /> */}

      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-8 max-w-[1400px]">
        <CaseStudyHero
          title="Building an AI Agent to Predict Hospitality Staff and F&B Needs"
          subtitle="Bridging external context (events, weather) with internal operations (PMS, staffing, calendar)"
          backgroundImage="/img/2025_HOTFuture_TheManner_Lobby_1299.webp"
          tools={[
            {
              name: "Claude",
              icon: "/img/claude_icon.svg",
            },
            {
              name: "Qdrant",
              icon: "/img/qdrant-brandmark-red.svg",
            },
            {
              name: "ElevenLabs",
              icon: "/img/elevenlabs_icon.svg",
            },
            {
              name: "Cursor",
              icon: "/img/cursor-icon.svg",
            },
            {
              name: "GitHub",
              icon: "/img/github-icon.svg",
            },
            {
              name: "Figma",
              icon: "/img/figma-icon.svg",
            },
          ]}
        />
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 lg:px-8 pb-16 max-w-[1400px]">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* Sidebar - Metadata */}
          <CaseStudySidebar
            role="Product Manager & Technical Lead"
            duration="Side Project (Nov 2025 - Present)"
            client="Personal Project"
            industry="Hospitality Tech"
            context="Hackathon + Side Project"
          />

          {/* Content */}
          <div>
            {/* TL;DR */}
            <div className="py-10 border-b border-border mb-8">
              <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">TL;DR</h3>
                <div className="space-y-4 text-foreground">
                  <p>
                    <strong>Context:</strong> Hotel F&B managers still rely on manual pattern matching (PMS + events + weather) to plan staffing. It takes 5–8 hours per week and often stays around ~70% accuracy.
                  </p>
                  <p>
                    <strong>Problem:</strong> This leads to over/under-staffing, operational stress, food waste, and missed revenue. Existing tools don't bridge external context (events, weather) with internal PMS data for F&B operations.
                  </p>
                  <p>
                    <strong>Solution:</strong> A PMS-agnostic AI agent that uses{" "}
                    <Tooltip
                      term="RAG (Retrieval-Augmented Generation)"
                      definition="A technique that combines vector database search with LLM reasoning. Instead of relying solely on an AI model's training, RAG retrieves relevant information from a database and uses it to generate more accurate, explainable responses."
                    >
                      RAG
                    </Tooltip>{" "}
                    (Qdrant + Claude) over 495 historical F&B patterns to predict covers, recommend staffing, and explain each decision in natural language.
                  </p>
                  <p>
                    <strong>My role:</strong> End-to-end ownership — market research, problem framing, data modelling, RAG architecture (Mistral + Qdrant), FastAPI backend, deployment, and roadmap design (Before / Now / Next / Later) with PMS integrations in mind.
                  </p>
                  <p>
                    <strong>What's now/next:</strong> Solidifying the manager-in-the-loop workflow and metrics (Now), then building a dashboard and PMS integrations (Next), and evolving towards an operations copilot for hospitality (Later).
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1: Context & Problem */}
            <Section id="problem" title="Context & Problem" number="1">
              <div className="prose prose-lg max-w-none bg-muted -mx-8 px-8 py-8 rounded-2xl border border-border/50">
                <p className="text-foreground leading-relaxed mb-6">
                  Hotels and restaurants generate lots of data: bookings, occupancy, historical covers. Yet most Property Management Systems (PMS) are still reactive: they show what happened, not what will happen.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                  The Manager's Weekly Routine
                </h3>
                <p className="text-foreground leading-relaxed mb-4">
                  To plan staffing, F&B managers manually correlate:
                </p>
                <ul className="list-disc list-inside text-foreground space-y-2 mb-6">
                  <li>PMS occupancy and reservations</li>
                  <li>City event calendars</li>
                  <li>Weather apps</li>
                  <li>Past "similar weekends" from memory</li>
                </ul>
                <p className="text-foreground leading-relaxed mb-6">
                  It takes <strong>5–8 hours per week</strong> and often leads to rough, <strong>~70% accurate</strong> forecasts.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  The Cost of Poor Forecasting
                </h3>
                <div className="grid md:grid-cols-3 gap-6 my-6">
                  <div className="p-6 bg-card rounded-xl border-l-4 border-red-500 border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">Overstaffed Services</h4>
                    <p className="text-base text-foreground">
                      Labor costs erode margins when more staff than needed are scheduled.
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border-l-4 border-orange-500 border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">Understaffed Services</h4>
                    <p className="text-base text-foreground">
                      Guest experience suffers, reviews decline, team burns out.
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border-l-4 border-yellow-500 border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">Food Waste</h4>
                    <p className="text-base text-foreground">
                      Over-preparation from inaccurate cover predictions leads to waste and ESG concerns.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  Industry Shift: From Guest-Centric to Staff-Centric Technology
                </h3>
                <p className="text-foreground leading-relaxed mb-6">
                  For decades, hospitality technology focused on guest experience. But the industry is now recognizing that{" "}
                  <strong>operational efficiency and staff wellbeing are prerequisites for sustainable service delivery</strong>.
                </p>

                {/* Graph */}
                <div className="my-8 p-8 bg-card rounded-xl text-center border border-border">
                  <img
                    src="/img/guest-staff-chart.png"
                    alt="Industry trend: Hospitality startups increasingly target staff operations"
                    className="w-full max-w-2xl mx-auto rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Industry trend: Hospitality startups increasingly target staff operations
                  </p>
                </div>
              </div>

              {/* Food Waste Quote - moved from Roadmap section */}
              <QuoteBlock
                quote="Food waste is one of the biggest challenges in hospitality. It is one of the most immediate and measurable ways we can reduce our impact as a hotel group."
                author="Toni Stoeckl"
                role="Chief Marketing Officer, Starwood Hotels (1 Hotels)"
                sourceUrl="https://roadbook.com/travel/super-hotels-of-the-future/"
                authorImage="/img/toni_stoeckl.webp"
              />
            </Section>

            {/* Section 2: My Role */}
            <Section id="role" title="My Role & Approach" number="2">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  I drove this project end-to-end, as both product manager and technical lead.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-4">Product</h4>
                    <ul className="space-y-3 text-foreground">
                      <li>Framed the problem with a focus on real F&B pains (stress, waste, labor cost)</li>
                      <li>Designed the data model and agent behavior around "augment, not replace" managers</li>
                      <li>Defined an incremental roadmap: Phase 1–5 with clear Before / Now / Next / Later</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-4">Technical</h4>
                    <ul className="space-y-3 text-foreground">
                      <li>Processed a hotel booking dataset into 495 F&B patterns</li>
                      <li>Designed and implemented a RAG pipeline (Mistral embeddings + Qdrant)</li>
                      <li>Built and deployed a FastAPI backend that exposes a simple /predict endpoint</li>
                      <li>Set up validation scenarios and observability for predictions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 3: Solution */}
            <Section id="solution" title="Solution: An AI F&B Operations Agent" number="3">
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  At its core, this project is an <strong>AI F&B Operations Agent</strong>.
                </p>

                <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-8 rounded-2xl border border-primary/20 mb-8">
                  <h4 className="text-lg font-bold mb-4">The agent's job is to:</h4>
                  <ul className="space-y-2">
                    <li>Understand the context of an upcoming service (property, date, service type, occupancy, events, weather)</li>
                    <li>Find similar historical services</li>
                    <li>Predict covers and recommend staffing</li>
                    <li>Explain its reasoning in a way a F&B manager can trust</li>
                  </ul>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">The Experience</h3>
                <div className="grid md:grid-cols-3 gap-6 my-6">
                  <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">API-First</h4>
                    <p className="text-base text-foreground">
                      Can live inside a PMS, a staff planning tool, or a custom dashboard.
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">Transparent</h4>
                    <p className="text-base text-foreground">
                      Managers see not only a number, but also the "why" behind it.
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">Human-in-the-Loop</h4>
                    <p className="text-base text-foreground">
                      Managers can approve, adjust, or override recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Battle-tested section */}
            <section className="py-16 md:py-20 px-4 md:px-8 bg-zinc-900 dark:bg-zinc-950 rounded-3xl border border-zinc-800">
              <div className="max-w-[1400px] mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Core Design Principles for Hospitality AI
                  </h2>
                  <p className="text-lg text-zinc-400">Built for operational efficiency and human trust</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Sound waves icon */}
                        <path d="M16 32 L20 24 L20 40 Z" fill="currentColor" opacity="0.8" />
                        <path d="M24 32 L28 20 L28 44 Z" fill="currentColor" opacity="0.9" />
                        <circle cx="32" cy="32" r="6" fill="currentColor" />
                        <path d="M40 32 L36 20 L36 44 Z" fill="currentColor" opacity="0.9" />
                        <path d="M48 32 L44 24 L44 40 Z" fill="currentColor" opacity="0.8" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white">Dashboard-First with Conversational Vision</h4>
                    <p className="text-base text-zinc-400 leading-relaxed">
                      Visual dashboard for trust and adoption. Conversational layer for clarity and spontaneity.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                        <rect x="28" y="12" width="8" height="8" fill="currentColor" />
                        <rect x="44" y="12" width="8" height="8" fill="currentColor" />
                        <rect x="12" y="28" width="8" height="8" fill="currentColor" />
                        <rect x="28" y="28" width="8" height="8" fill="currentColor" />
                        <rect x="44" y="28" width="8" height="8" fill="currentColor" />
                        <rect x="12" y="44" width="8" height="8" fill="currentColor" />
                        <rect x="28" y="44" width="8" height="8" fill="currentColor" />
                        <rect x="44" y="44" width="8" height="8" fill="currentColor" />
                        <line x1="32" y1="32" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="32" y1="32" x2="44" y2="20" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="32" y1="32" x2="20" y2="44" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="32" y1="32" x2="44" y2="44" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white">Context-Aware Architecture</h4>
                    <p className="text-base text-zinc-400 leading-relaxed">
                      Bridges external signals (events, weather) with internal truth (PMS, calendars, occupancy, ...)
                      into unified prediction.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="12" width="12" height="4" fill="currentColor" />
                        <rect x="8" y="20" width="12" height="4" fill="currentColor" />
                        <rect x="8" y="28" width="12" height="4" fill="currentColor" />
                        <line x1="20" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="20" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="20" y1="30" x2="24" y2="30" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="28" y="12" width="12" height="4" fill="currentColor" />
                        <rect x="28" y="20" width="12" height="4" fill="currentColor" />
                        <rect x="28" y="28" width="12" height="4" fill="currentColor" />
                        <line x1="40" y1="14" x2="44" y2="14" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="40" y1="22" x2="44" y2="22" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="40" y1="30" x2="44" y2="30" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white">Explainable Predictions</h4>
                    <p className="text-base text-zinc-400 leading-relaxed">
                      RAG architecture provides transparency: managers see historical scenarios used, not just numbers.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="28" y="28" width="8" height="8" fill="currentColor" />
                        <line x1="32" y1="32" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="32" y1="32" x2="52" y2="12" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="32" y1="32" x2="12" y2="52" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="32" y1="32" x2="52" y2="52" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                        <circle cx="52" cy="12" r="4" fill="currentColor" />
                        <circle cx="12" cy="52" r="4" fill="currentColor" />
                        <circle cx="52" cy="52" r="4" fill="currentColor" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white">Human-in-the-Loop Design</h4>
                    <p className="text-base text-zinc-400 leading-relaxed">
                      The agent recommends and managers approve, adjust, or override based on local expertise.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Avi Brosh Quote */}
            <QuoteBlock
              quote="Technology has brought incredible convenience, but the human element is irreplaceable. A warm welcome, a local tip from the front desk, a morning conversation over coffee, these are the things that linger in a guest's memory."
              author="Avi Brosh"
              role="Founder, Palisociety"
              source="The future of hotels: innovations shaping hospitality | Roadbook"
              sourceUrl="https://roadbook.com/travel/super-hotels-of-the-future/"
              authorImage="/img/avi_brosh.webp"
            />

            {/* Section 4: Roadmap */}
            <Section id="roadmap" title="Roadmap" number="4">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6">
                  {/* Horizontal Timeline - 5 Phases */}
                  <div className="relative">
                    <div className="hidden md:block absolute top-4 left-0 right-0 h-[2px] bg-primary/30" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
                      {[
                        {
                          period: "Before",
                          title: "Phase 1 — Foundations",
                          goal: "Validate core architecture",
                          deliverables: [
                            "Set up FastAPI backend with /predict endpoint",
                            "Configured Qdrant vector database",
                            "Integrated Claude API for reasoning",
                            "Proof-of-concept: RAG works for hospitality",
                          ],
                          status: "completed" as const,
                        },
                        {
                          period: "Before",
                          title: "Phase 2 — RAG with Real Patterns",
                          goal: "Build pattern library from real data",
                          deliverables: [
                            "Processed hotel dataset into 495 F&B patterns",
                            "Implemented Mistral embeddings",
                            "Optimized similarity search",
                            "Validated pattern quality",
                          ],
                          status: "completed" as const,
                        },
                        {
                          period: "Now",
                          title: "Phase 3 — Productisation & Observability",
                          goal: "Production-ready API",
                          deliverables: [
                            "Manager-in-the-loop workflow",
                            "Prediction confidence scoring",
                            "Error handling and logging",
                            "API documentation",
                          ],
                          status: "in-progress" as const,
                          currentStage: "Solidifying workflow and metrics",
                        },
                        {
                          period: "Next",
                          title: "Phase 4 — Dashboard & PMS Integrations",
                          goal: "Real-world deployment",
                          deliverables: [
                            "Visual dashboard for managers",
                            "PMS API integration (Mews, Opera, etc.)",
                            "Event & weather data connectors",
                            "Staff calendar sync",
                          ],
                          status: "planned" as const,
                        },
                        {
                          period: "Later",
                          title: "Phase 5 — Operations Copilot",
                          goal: "Expand to full F&B operations",
                          deliverables: [
                            "F&B demand prediction",
                            "Inventory optimization",
                            "Menu recommendations",
                            "Waste reduction tracking",
                          ],
                          status: "planned" as const,
                        },
                      ].map((phase, index) => (
                        <motion.div
                          key={index}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                            margin: "-50px",
                          }}
                          transition={{
                            delay: index * 0.08,
                            duration: 0.4,
                          }}
                          className="relative"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md mb-3 mx-auto md:mx-0 border-2 ${phase.status === "completed" ? "bg-primary border-primary" : phase.status === "in-progress" ? "bg-primary border-primary" : "bg-muted border-border"}`}
                          >
                            <span
                              className={`text-sm font-bold ${phase.status === "completed" || phase.status === "in-progress" ? "text-primary-foreground" : "text-muted-foreground"}`}
                            >
                              {index + 1}
                            </span>
                          </div>

                          <div className="text-center md:text-left p-4 bg-card rounded-lg border border-border shadow-sm">
                            <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded mb-2 ${phase.period === "Before" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : phase.period === "Now" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : phase.period === "Next" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"}`}>
                              {phase.period}
                            </span>
                            <h5 className="text-sm font-semibold text-foreground mb-2">{phase.title}</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Goal:</strong> {phase.goal}
                            </p>
                            {phase.deliverables.length > 0 && (
                              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                {phase.deliverables.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            )}
                            {phase.currentStage && (
                              <p className="text-xs text-primary mt-2">
                                <strong>Current:</strong> {phase.currentStage}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strategic Decisions */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  Strategic Decisions
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      number: "1",
                      title: "API-First, Then Dashboard",
                      rationale:
                        "A robust API allows integration with any PMS or tool. Dashboard comes after core prediction is solid.",
                      tradeoff: "No visual interface initially, but ensures flexibility and portability.",
                    },
                    {
                      number: "2",
                      title: "RAG Over Fine-Tuning",
                      rationale: "Patterns change continuously. RAG allows dynamic updates without retraining.",
                      tradeoff: "Requires quality vector DB, but scales as data grows.",
                    },
                    {
                      number: "3",
                      title: "Staff Before F&B Demand",
                      rationale: "Simpler problem validates architecture before tackling full complexity.",
                      tradeoff: "Delays ESG impact story, but de-risks technical approach.",
                    },
                  ].map((decision) => (
                    <div key={decision.number} className="p-6 bg-card rounded-xl border border-border shadow-sm">
                      <div className="text-2xl font-bold text-primary mb-3">{decision.number}</div>
                      <h4 className="text-lg font-bold text-foreground mb-3">{decision.title}</h4>
                      <p className="text-base text-foreground mb-3">
                        <strong>Rationale:</strong> {decision.rationale}
                      </p>
                      <p className="text-base text-muted-foreground">
                        <strong>Trade-off:</strong> {decision.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Section 5: Architecture */}
            <Section id="architecture" title="Architecture & Technical Implementation" number="5">
              <div className="prose prose-lg max-w-none bg-muted -mx-8 px-8 py-8 rounded-2xl border border-border/50">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                  System Architecture: Modular Agent Pipeline
                </h3>

                <p className="text-foreground leading-relaxed mb-6">
                  The system enriches context from external signals (events, weather) and internal data (PMS, occupancy), then uses <strong>495 F&B patterns</strong> embedded with Mistral and stored in Qdrant. Claude serves as the reasoning agent, generating predictions via a FastAPI <code>/predict</code> endpoint.
                </p>

                {/* Architecture diagram */}
                <div className="my-6 p-8 bg-card text-foreground rounded-xl font-mono text-sm overflow-x-auto border border-border">
                  <pre className="whitespace-pre">
                    {`┌─────────────────────────────────────────────────┐
│     USER INPUT                                  │
│  Text input (property, date, service, context)  │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│     CONTEXT ENRICHMENT                          │
│  External: Events API, Weather API              │
│  Internal: PMS occupancy, reservations          │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│     PATTERN SEARCH (Qdrant Vector DB)           │
│  • 495 F&B patterns (Mistral embeddings)        │
│  • Similarity search (cosine distance)          │
│  • Returns top 3-5 matches                      │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│     REASONING ENGINE (Claude API)               │
│  • Analyzes pattern relevance                   │
│  • Generates prediction + confidence            │
│  • Produces natural language explanation        │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│     STAFF RECOMMENDATIONS                       │
│  • Covers → staff calculation                   │
│  • Manager approval workflow                    │
└─────────────────────────────────────────────────┘`}
                  </pre>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">How It Works</h3>

                <div className="bg-card p-6 rounded-xl mb-6 border border-border shadow-sm">
                  <h4 className="text-lg font-bold text-foreground mb-3">Pattern Matching Process</h4>
                  <ol className="space-y-2 text-foreground">
                    <li>
                      <strong>1. Storage:</strong> 495 historical F&B scenarios embedded as vectors in Qdrant (Mistral embeddings)
                    </li>
                    <li>
                      <strong>2. Query:</strong> Manager asks → system enriches context → creates query embedding
                    </li>
                    <li>
                      <strong>3. Search:</strong> Qdrant finds similar past scenarios via cosine similarity
                    </li>
                    <li>
                      <strong>4. Reasoning:</strong> Claude analyzes patterns, generates weighted prediction with
                      confidence and explanation
                    </li>
                  </ol>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200/50">
                  <p className="text-foreground">
                    <strong>Example output:</strong> "145 covers (88% confidence). Based on 3 similar Saturday patterns
                    with major events nearby: Concert nights averaged 142-151 covers."
                  </p>
                </div>
              </div>
            </Section>

            {/* Section 6: Challenges */}
            <Section id="challenges" title="Challenges Faced" number="6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Synthetic Patterns vs Real Behavior",
                    issue:
                      "Synthetic patterns repeated same events regardless of context. Predictions showed identical reasoning for different scenarios.",
                    learning:
                      "POC validated RAG architecture. Synthetic data sufficient for technical proof-of-concept, but production requires diverse, real patterns.",
                    fix: "Processed hotel booking dataset into 495 real F&B patterns capturing property-specific nuances.",
                  },
                  {
                    title: "Missing Internal PMS Context",
                    issue:
                      "No access to internal signals: real-time occupancy, hotel events, staff availability, guest preferences.",
                    learning:
                      "External factors represent only ~60% of prediction equation. Internal context is the critical missing 40%.",
                    fix: "API-first architecture ready for PMS integration (Mews, Opera) to bridge external and internal context.",
                  },
                  {
                    title: "Edge Cases & Holidays",
                    issue:
                      'Christmas Day predicted as "normal high demand" despite being known anomaly. Pattern matching alone cannot handle exceptional scenarios.',
                    learning:
                      "Pure ML insufficient for hospitality's nuanced reality. Known edge cases require explicit business rules.",
                    fix: "Hybrid architecture: RAG for pattern-based predictions + rule-based overrides for known exceptions.",
                  },
                ].map((challenge, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-card rounded-xl border-l-4 border-red-500 border border-border shadow-sm"
                  >
                    <h4 className="text-lg font-bold text-foreground mb-4">{challenge.title}</h4>
                    <div className="space-y-3 text-base">
                      <p className="text-foreground">
                        <span className="text-red-600 font-bold">❌ Issue:</span> {challenge.issue}
                      </p>
                      <p className="text-foreground">
                        <span className="text-green-600 font-bold">✅ Learning:</span> {challenge.learning}
                      </p>
                      <p className="text-foreground">
                        <span className="text-blue-600 font-bold">🔧 Fix:</span> {challenge.fix}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Section 7: FAQ */}
            <Section id="faq" title="FAQ" number="7">
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <FAQItem
                  question="How is this different from a classic dashboard?"
                  answer="A dashboard shows what happened. This agent predicts what will happen and explains why. It uses RAG to find similar historical patterns, then Claude to reason about them and generate staffing recommendations with confidence scores. Managers see the 'why' behind every prediction, not just a number."
                />
                <FAQItem
                  question="Why start with staff instead of full F&B demand?"
                  answer="Staff forecasting is mathematically simpler (covers to staff ratio) with fewer variables. Starting here validated the RAG architecture with a tractable problem before tackling F&B demand's complexity (menu variations, ingredient availability, supplier constraints, waste metrics). Iterative approach: prove core architecture, then expand scope."
                />
                <FAQItem
                  question="How did you validate the approach without live PMS data?"
                  answer="Through industry research (Mews reports, sustainability studies) and processing a real hotel booking dataset into 495 F&B patterns. This validated that RAG + Claude can identify relevant historical scenarios and generate explainable predictions. Next step is PMS integration for real-time data."
                />
              </div>
            </Section>

            {/* Section 8: Go Further */}
            <Section id="go-further" title="Go Further" number="8">
              <div className="prose prose-lg max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <a
                    href="https://www.mews.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent hover:border-contact transition-all group shadow-sm"
                  >
                    <div className="h-16 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-foreground">Mews</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-foreground">Agentic AI for Hotels</h4>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                      Leading PMS provider's vision for agentic AI in hospitality.
                    </p>
                    <div className="flex items-center gap-2 text-contact text-sm hover:underline underline-offset-4 transition-all">
                      Read <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>

                  <a
                    href="https://roadbook.com/travel/super-hotels-of-the-future/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent hover:border-contact transition-all group shadow-sm"
                  >
                    <div className="h-16 flex items-center justify-center mb-4">
                      <span className="text-lg font-semibold text-foreground">Roadbook</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-foreground">
                      The Future of Hotels
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                      Industry insights on hospitality innovation trends.
                    </p>
                    <div className="flex items-center gap-2 text-contact text-sm hover:underline underline-offset-4 transition-all">
                      Read <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                </div>
              </div>
            </Section>

            {/* CTA Section */}
            <div className="py-12 text-center">
              <div className="bg-gradient-to-br from-contact to-contact/80 text-contact-foreground p-12 rounded-2xl border border-contact/20">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to discuss this project?</h3>
                <p className="text-lg text-contact-foreground/90 mb-8">
                  Let's talk about product vision and building great AI experiences
                </p>
                <button
                  onClick={() => navigate("/#contact")}
                  className="inline-block px-8 py-3 bg-background text-contact font-semibold rounded-lg hover:bg-muted transition-colors border border-contact/20"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer
        sections={[
          {
            id: "hero",
            label: language === "en" ? "Home" : "Accueil",
          },
          {
            id: "work",
            label: language === "en" ? "Work" : "Projets",
          },
          {
            id: "contact",
            label: language === "en" ? "Contact" : "Contact",
          },
        ]}
        onSectionClick={(sectionId) => {
          if (sectionId === "hero") {
            navigate("/");
          } else {
            navigate(`/#${sectionId}`);
          }
        }}
      />
    </div>
  );
};
export default FBAgentCaseStudy;
