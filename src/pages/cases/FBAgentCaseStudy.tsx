// FBAgentCaseStudy.tsx - Main case study page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, FAQItem, QuoteBlock, Section } from '@/components/casestudy';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/Navigation';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { CaseStudySidebar } from '@/components/case-study/CaseStudySidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { designTokens } from '@/design-tokens';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import '@/styles/fb-agent.css';
const FBAgentCaseStudy: React.FC = () => {
  const navigate = useNavigate();
  const {
    language
  } = useLanguage();
  const sections = [{
    id: "evolution",
    label: "0. Evolution"
  }, {
    id: "problem",
    label: "1. Problem"
  }, {
    id: "role",
    label: "2. Role"
  }, {
    id: "solution",
    label: "3. Solution"
  }, {
    id: "roadmap",
    label: "4. Process"
  }, {
    id: "architecture",
    label: "5. Architecture"
  }, {
    id: "challenges",
    label: "6. Challenges"
  }, {
    id: "faq",
    label: "7. FAQ"
  }, {
    id: "go-further",
    label: "8. More"
  }];
  return <div className="min-h-screen bg-background">
      <Navigation />
      <ProgressIndicator sections={sections} />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-8 max-w-[1400px]">
        <CaseStudyHero title="Building an AI Agent to Predict Hospitality Staffing Needs" subtitle="Bridging external context (events, weather) with internal operations\n(PMS, staffing, calendar)" backgroundImage="/img/2025_HOTFuture_TheManner_Lobby_1299.webp" tools={[{
        name: "Claude",
        icon: "/img/claude_icon.svg"
      }, {
        name: "Qdrant",
        icon: "/img/qdrant-brandmark-red.svg"
      }, {
        name: "ElevenLabs",
        icon: "/img/elevenlabs_icon.svg"
      }, {
        name: "Cursor",
        icon: "/img/cursor-icon.svg"
      }, {
        name: "GitHub",
        icon: "/img/github-icon.svg"
      }, {
        name: "Figma",
        icon: "/img/figma-icon.svg"
      }]} />
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 lg:px-8 pb-16 max-w-[1400px]">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* Sidebar - Metadata */}
          <CaseStudySidebar role="Product Manager & Technical Lead" duration="Side Project (Nov 2025 - Present)" client="Personal Project" industry="Hospitality Tech" context="Hackathon + Side Project" />

          {/* Content */}
          <div>
            {/* TL;DR */}
            <div className="py-10 border-b border-border mb-8">
              <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
                  TL;DR
                </h3>
                <div className="space-y-4 text-foreground">
                  <p>
                    <strong>Context:</strong> Hospitality managers face unpredictable demand
                    due to external factors (city events, weather, holidays) that current
                    systems don't integrate with internal operations data.
                  </p>
                  <p>
                    <strong>Problem:</strong> Results in over/under-staffing, operational
                    stress, food waste, and inability to optimize service delivery. No AI
                    tools bridge external context with internal PMS data for F&B operations.
                  </p>
                  <p>
                    <strong>Solution:</strong> Dashboard-first prediction system with conversational vision. {' '}
                    <Tooltip term="RAG (Retrieval-Augmented Generation)" definition="A technique that combines vector database search with LLM reasoning. Instead of relying solely on an AI model's training, RAG retrieves relevant information from a database and uses it to generate more accurate, explainable responses.">
                      RAG architecture
                    </Tooltip>{' '}
                    (Qdrant + Claude) combines external context (events, weather) with pattern matching to generate explainable staff predictions. Visual dashboard (Streamlit) for transparency and oversight, with conversational interface planned for Phase 2.
                  </p>
                  <p>
                    <strong>My role:</strong> End-to-end ownership: market research, problem
                    framing, RAG architecture design, API pipeline implementation (FastAPI + Qdrant + Claude), Streamlit dashboard development, conversational roadmap planning.
                  </p>
                  <p>
                    <strong>What's next:</strong> PMS API integration for real historical
                    data, conversational interface development (Phase 2), manager approval workflow, expansion to F&B demand prediction (Phase 3).
                  </p>
                </div>
              </div>
            </div>

            {/* From Reactive to Predictive */}
            <Section id="evolution">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  From Reactive to Predictive Operations
                </h2>
                <p className="text-lg text-muted-foreground">The Industry Evolution</p>
              </div>

              <div className="grid md:grid-cols-5 gap-6">
                {[{
                title: 'Where We Are',
                desc: 'Managers rely on intuition + basic occupancy data'
              }, {
                title: 'The Gap',
                desc: 'External context lives in silos. No predictive layer.'
              }, {
                title: 'The Vision',
                desc: 'Unified prediction combining ALL operational signals'
              }, {
                title: 'The Challenge',
                desc: 'Data integration + explainability + human expertise'
              }, {
                title: 'My Approach',
                desc: 'Agentic architecture + RAG + dashboard-first with conversational vision'
              }].map((item, idx) => <div key={idx} className="p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4">
                      {idx + 1}
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-base text-muted-foreground">{item.desc}</p>
                  </div>)}
              </div>
            </Section>

            {/* Section 1: Context & Problem */}
            <Section id="problem" title="Context & Problem" number="1">
              <div className="prose prose-lg max-w-none bg-muted -mx-8 px-8 py-8 rounded-2xl border border-border/50">
                <p className="text-foreground leading-relaxed mb-6">
                  Hotels and restaurants generate vast amounts of data: booking patterns,
                  occupancy rates, historical demand, yet current Property Management Systems (PMS) lack predictive capabilities that account for external factors.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  Industry Shift: From Guest-Centric to Staff-Centric Technology
                </h3>
                <p className="text-foreground leading-relaxed mb-6">
                  For decades, hospitality technology investments focused exclusively on guest
                  experience: booking engines, loyalty programs, mobile check-in. But the
                  industry is now recognizing that{' '}
                  <strong>
                    operational efficiency and staff wellbeing are prerequisites for
                    sustainable service delivery
                  </strong>
                  .
                </p>

                {/* Graph */}
                <div className="my-8 p-8 bg-card rounded-xl text-center border border-border">
                  <img src="/img/guest-staff-chart.png" alt="Industry trend: Hospitality startups increasingly target staff operations" className="w-full max-w-2xl mx-auto rounded-lg" />
                  <p className="text-sm text-muted-foreground mt-4">
                    Industry trend: Hospitality startups increasingly target staff operations
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    Source: Mews - Agentic AI for Hotels
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  The Problem: Three Operational Gaps
                </h3>

                <div className="grid md:grid-cols-3 gap-6 my-6">
                  <div className="p-6 bg-card rounded-xl border-l-4 border-red-500 border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">1. Unpredictability</h4>
                    <p className="text-base text-foreground">
                      Demand fluctuates based on city events, weather, holidays, seasonality.
                      Current PMS shows what happened, not what will happen.
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border-l-4 border-orange-500 border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">2. Operational Silos</h4>
                    <p className="text-base text-foreground">
                      Managers manually correlate PMS, event calendars, weather apps, staff
                      scheduling. Cognitive load is enormous.
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border-l-4 border-yellow-500 border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-3">3. No Shared Standard</h4>
                    <p className="text-base text-foreground">
                      Generic tools don't fit hospitality's needs: explainability,
                      human-in-the-loop, real-time adaptation, property-specific patterns.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  Impact: The Cost of Poor Forecasting
                </h3>
                <div className="grid md:grid-cols-3 gap-6 my-6 text-center">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="text-4xl font-bold text-red-600 mb-2">30-40%</div>
                    <p className="text-foreground">Food waste in hospitality operations</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="text-4xl font-bold text-orange-600 mb-2">High</div>
                    <p className="text-foreground">Labor cost volatility</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">60%</div>
                    <p className="text-foreground">Managers report forecasting as top stressor</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 2: My Role */}
            <Section id="role" title="My Role & Approach" number="2">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  I am driving this project end-to-end: from analyzing the market through hospitality research to architecting and building a functional RAG-powered prediction system.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-4">
                      Product Strategy
                    </h4>
                    <ul className="space-y-3 text-foreground">
                      <li>Market research via Mews reports and sustainability studies</li>
                      <li>User journey mapping for F&B managers</li>
                      <li>MVP scope definition for hackathon constraints</li>
                      <li>Product Strategy
Market research via Mews reports and sustainability studies
User journey mapping for F&B managers
MVP scope definition for hackathon constraints
Human-in-the-loop philosophy by design Front-end design (Phase 2)</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-4">
                      Technical Execution
                    </h4>
                    <ul className="space-y-3 text-foreground">
                      <li>Human-in-the-loop philosophy by design</li>
                      <li>FastAPI backend + Claude reasoning integration</li>
                      <li>Dashboard development: Streamlit interface for transparent prediction display and pattern visualization</li>
                      <li>Conversational interface prototyping (Phase 2 planned)</li>
                      <li>Modular agent design for scalability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 3: Solution */}
            <Section id="solution" title="Solution: Ambient Agentic Experience" number="3">
              <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-8 rounded-2xl border border-primary/20">
                <p className="text-lg leading-relaxed">Conversational interface prototyping (Phase 2 plan)<strong>conversational-first system with visual transparency</strong>. Phase 1 uses a dashboard for rapid input and oversight, managers see predictions, confidence scores, and reasoning chains. Phase 2 adds natural language queries: <em>"How many servers do I need for Saturday XX/XX/XX dinner?"</em> The dashboard remains critical for human-in-the-loop oversight and audit trails.
                </p>
              </div>
            </Section>

            {/* Battle-tested section */}
            <section className="py-16 md:py-20 px-4 md:px-8 bg-zinc-900 dark:bg-zinc-950 rounded-3xl border border-zinc-800">
              <div className="max-w-[1400px] mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Core Design Principles for Hospitality AI
                  </h2>
                  <p className="text-lg text-zinc-400">
                    Built for operational reality and human trust
                  </p>
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
                      Phase 1: Visual dashboard for transparent prediction input and reasoning display. Phase 2: Conversational layer for rapid queries during service prep. Dashboard persists for oversight, audit trails, and compliance.
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
                      Bridges external signals (events, weather) with internal operations (PMS, staff calendar) into unified predictions.
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
                      RAG architecture provides transparency: managers see which historical scenarios informed each prediction, not just numbers.
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
                      Augmentation, not automation. The agent recommends; managers approve, adjust, or override based on local expertise.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Avi Brosh Quote */}
            <QuoteBlock quote="Technology has brought incredible convenience, but the human element is irreplaceable. A warm welcome, a local tip from the front desk, a morning conversation over coffee, these are the things that linger in a guest's memory." author="Avi Brosh" role="Founder, Palisociety" source="The future of hotels: innovations shaping hospitality | Roadbook" sourceUrl="https://roadbook.com/travel/super-hotels-of-the-future/" authorImage="/img/avi_brosh.webp" />

            {/* Section 4: Process & Roadmap */}
            <Section id="roadmap" title="Process & Key Decisions" number="4">
              <div className="prose prose-lg max-w-none">
                

                <div className="space-y-6">
                  {/* Horizontal Timeline */}
                  <div className="relative">
                    <div className="hidden md:block absolute top-4 left-0 right-0 h-[2px] bg-primary/30" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                      {[{
                      period: 'November 2025',
                      title: 'Hackathon Sprint (48h)',
                      goal: 'Validate core architecture with functional MVP',
                      deliverables: ['FastAPI backend with /predict endpoint', 'Qdrant setup with synthetic patterns', 'Claude API integration for reasoning', 'Proof-of-concept: RAG works for hospitality'],
                      status: 'completed' as const
                    }, {
                      period: 'December 2025',
                      title: 'Phase 1 - Foundations (~3 weeks, part-time)',
                      goal: 'Refine architecture, add explainability',
                      deliverables: ['Pattern search optimization', 'Structured reasoning output', 'Streamlit prototype', 'Voice interface (in progress)'],
                      status: 'in-progress' as const,
                      currentStage: 'Architecture validated, limitations documented'
                    }, {
                      period: 'Q1 2026 (Planned)',
                      title: 'Phase 2 - Real Data Integration',
                      goal: 'Move from synthetic to production-grade data',
                      deliverables: ['PMS API integration', 'Event & weather APIs', 'Staff calendar connection', 'Holiday/edge case rules'],
                      status: 'planned' as const
                    }, {
                      period: 'Q2 2026 (Vision)',
                      title: 'Phase 3 - F&B Demand Prediction',
                      goal: 'Expand from staff to food/beverage forecasting',
                      deliverables: [],
                      status: 'planned' as const
                    }].map((phase, index) => <motion.div key={index} initial={{
                      opacity: 0,
                      y: 20
                    }} whileInView={{
                      opacity: 1,
                      y: 0
                    }} viewport={{
                      once: true,
                      margin: "-50px"
                    }} transition={{
                      delay: index * 0.08,
                      duration: 0.4
                    }} className="relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md mb-3 mx-auto md:mx-0 border-2 ${phase.status === 'completed' ? 'bg-primary border-primary' : phase.status === 'in-progress' ? 'bg-primary border-primary' : 'bg-muted border-border'}`}>
                            <span className={`text-sm font-bold ${phase.status === 'completed' || phase.status === 'in-progress' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                              {index + 1}
                            </span>
                          </div>
                          
                          <div className="text-center md:text-left p-4 bg-card rounded-lg border border-border shadow-sm">
                            <h4 className="text-base font-bold text-foreground mb-1">
                              {phase.period}
                            </h4>
                            <h5 className="text-sm font-semibold text-foreground mb-2">
                              {phase.title}
                            </h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Goal:</strong> {phase.goal}
                            </p>
                            {phase.deliverables.length > 0 && <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                {phase.deliverables.map((item, idx) => <li key={idx}>{item}</li>)}
                              </ul>}
                            {phase.currentStage && <p className="text-xs text-primary mt-2">
                                <strong>Current stage:</strong> {phase.currentStage}
                              </p>}
                          </div>
                        </motion.div>)}
                    </div>
                  </div>

                  {/* Food Waste Quote */}
                  <QuoteBlock quote="Food waste is one of the biggest challenges in hospitality. It is one of the most immediate and measurable ways we can reduce our impact as a hotel group." author="Toni Stoeckl" role="Chief Marketing Officer, Starwood Hotels (1 Hotels)" sourceUrl="https://roadbook.com/travel/super-hotels-of-the-future/" authorImage="/img/toni_stoeckl.webp" />

                </div>

                {/* Strategic Decisions */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  Strategic Decisions: Choices Made 
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {[{
                  number: '1',
                  title: 'Dashboard-First, Then Conversational',
                  rationale: 'Dashboard to ease trust and adoption. Conversation to enhance spontaneity and clarity of thought.',
                  tradeoff: 'Delayed conversational interface, but de-risks trust issues.'
                }, {
                  number: '2',
                  title: 'RAG Over Fine-Tuning',
                  rationale: 'Patterns change continuously. RAG allows dynamic updates without retraining.',
                  tradeoff: 'Requires quality vector DB, but scales as data grows.'
                }, {
                  number: '3',
                  title: 'Staff Before F&B Demand',
                  rationale: 'Simpler problem validates architecture before tackling full complexity.',
                  tradeoff: 'Delays ESG impact story, but de-risks technical approach.'
                }].map(decision => <div key={decision.number} className="p-6 bg-card rounded-xl border border-border shadow-sm">
                      <div className="text-2xl font-bold text-primary mb-3">
                        {decision.number}
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-3">{decision.title}</h4>
                      <p className="text-base text-foreground mb-3">
                        <strong>Rationale:</strong> {decision.rationale}
                      </p>
                      <p className="text-base text-muted-foreground">
                        <strong>Trade-off:</strong> {decision.tradeoff}
                      </p>
                    </div>)}
                </div>
              </div>
            </Section>

            {/* Section 5: Architecture */}
            <Section id="architecture" title="Architecture & Technical Implementation" number="5">
              <div className="prose prose-lg max-w-none bg-muted -mx-8 px-8 py-8 rounded-2xl border border-border/50">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                  System Architecture: Modular Agent Pipeline
                </h3>

                {/* Architecture diagram */}
                <div className="my-6 p-8 bg-card text-foreground rounded-xl font-mono text-sm overflow-x-auto border border-border">
                  <pre className="whitespace-pre">
                  {`┌─────────────────────────────────────────────────┐
│     USER INPUT                                  │
│  Phase 1: Dashboard form (date, events, weather)│
│  Phase 2: Conversational (voice/text) - Planned │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│     CONTEXT ENRICHMENT AGENTS                   │
│  External: Events API, Weather API              │
│  Internal (Phase 2): PMS, Staff Calendar        │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│     PATTERN SEARCH (Qdrant Vector DB)           │
│  • Historical patterns as embeddings            │
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

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 mt-8">
                  How It Works
                </h3>

                <div className="bg-card p-6 rounded-xl mb-6 border border-border shadow-sm">
                  <h4 className="text-lg font-bold text-foreground mb-3">Pattern Matching Process</h4>
                  <ol className="space-y-2 text-foreground">
                    <li>
                      <strong>1. Storage:</strong> Historical scenarios embedded as vectors in
                      Qdrant
                    </li>
                    <li>
                      <strong>2. Query:</strong> Manager asks → system enriches context →
                      creates query embedding
                    </li>
                    <li>
                      <strong>3. Search:</strong> Qdrant finds similar past scenarios via
                      cosine similarity
                    </li>
                    <li>
                      <strong>4. Reasoning:</strong> Claude analyzes patterns, generates
                      weighted prediction with confidence and explanation
                    </li>
                  </ol>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200/50">
                  <p className="text-foreground">
                    <strong>Example output:</strong> "145 covers (88% confidence). Based on 3
                    similar Saturday patterns with major events nearby: Concert nights averaged
                    142-151 covers."
                  </p>
                </div>
              </div>
            </Section>

            {/* Section 6: Challenges */}
            <Section id="challenges" title="Challenges Faced" number="6">
              <div className="grid md:grid-cols-3 gap-6">
                {[{
                title: 'Pattern Quality & Realism',
                issue: 'Synthetic patterns repeated same events (Coldplay/U2) regardless of context. Predictions showed identical reasoning for different scenarios.',
                learning: 'POC validated RAG architecture and reasoning engine. Synthetic data sufficient for technical proof-of-concept, but production requires diverse, real patterns.',
                fix: 'PMS API integration for actual hotel historical data. Real patterns capture property-specific nuances and seasonal variations.'
              }, {
                title: 'Internal Context Gap',
                issue: 'No access to internal signals: occupancy rates, hotel events, staff availability, guest preferences.',
                learning: 'External factors represent only 60% of prediction equation. Internal context is the critical missing 40%.',
                fix: 'Multi-source integration: PMS API, staff calendar, property event calendar. This bridges external and internal operational context.'
              }, {
                title: 'Edge Cases & Holiday Logic',
                issue: 'Christmas Day predicted as "normal high demand" despite being known anomaly. Pattern matching alone cannot handle exceptional scenarios.',
                learning: 'Pure ML insufficient for hospitality\'s nuanced reality. Known edge cases require explicit business rules.',
                fix: 'Hybrid architecture: RAG for pattern-based predictions + rule-based overrides for known exceptions.'
              }].map((challenge, idx) => <div key={idx} className="p-6 bg-card rounded-xl border-l-4 border-red-500 border border-border shadow-sm">
                    <h4 className="text-lg font-bold text-foreground mb-4">{challenge.title}</h4>
                    <div className="space-y-3 text-base">
                      <p className="text-foreground">
                        <span className="text-red-600 font-bold">❌ Issue:</span>{' '}
                        {challenge.issue}
                      </p>
                      <p className="text-foreground">
                        <span className="text-green-600 font-bold">✅ Learning:</span>{' '}
                        {challenge.learning}
                      </p>
                      <p className="text-foreground">
                        <span className="text-blue-600 font-bold">🔧 Phase 2 fix:</span>{' '}
                        {challenge.fix}
                      </p>
                    </div>
                  </div>)}
              </div>
            </Section>

            {/* Section 7: FAQ */}
            <Section id="faq" title="FAQ" number="7">
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <FAQItem question="Why not use existing forecasting tools?" answer="Generic forecasting tools don't bridge external context (city events, weather, holidays) with internal operations (PMS data, staff schedules). They provide statistical predictions without explaining why demand will shift. This agent is purpose-built for hospitality's operational reality: managers need explainable recommendations they can trust, not black-box numbers." />
                <FAQItem question="How does this differ from a dashboard?" answer="Phase 1 (Current): It is a dashboard (Streamlit) with API backend. This was intentional—visual interface validates RAG architecture and builds manager trust through transparent reasoning display. Phase 2 (Planned): Conversational layer (voice/text) for rapid queries during service prep. The dashboard persists for: prediction oversight and approval workflow, pattern analysis during operational planning, audit trails for compliance (EU AI Act, GDPR), historical data review and confidence tracking." />
                <FAQItem question="How did you validate the approach without real users?" answer="Through industry research (Mews reports, sustainability studies) and testing with realistic synthetic scenarios. Phase 1 validated the technical architecture and reasoning quality. Phase 2 will include pilot deployment with actual F&B managers to measure prediction accuracy vs. their intuition baseline and assess trust/adoption." />
                <FAQItem question="What about data privacy and security?" answer="Phase 1 uses synthetic data (no real guest or operational data). Production deployment would require: SOC 2 compliance, data anonymization protocols, clear hotel consent for PMS integration, encrypted data transmission, and audit logs. Privacy-by-design from architecture stage." />
                <FAQItem question="Why Dashboard + Conversational, Not Voice-Only?" answer="Industry research confirms: Human-in-the-loop AI requires visual transparency. All leading hospitality AI platforms combine conversational input with visual oversight, not voice-only systems. By 2030, organizations will maintain 'explanation logs' with human audit trails. GDPR Article 22 requires transparent, explainable AI decisions. Visual interfaces enable managers to verify reasoning chains, review confidence scores, and override recommendations before finalizing staffing decisions—critical for regulatory compliance. Leading platforms (Mews, Agentic Hospitality, industry standard) combine conversational input for speed with visual oversight for control. This hybrid approach builds trust, ensures compliance, and enables manager verification—essential for high-stakes operational decisions." />
                <FAQItem question="Why start with staff vs. F&B demand?" answer="Staff forecasting is mathematically simpler (covers to staff ratio) with fewer variables. Starting here validated the RAG architecture with a tractable problem before tackling F&B demand's complexity (menu variations, ingredient availability, supplier constraints, waste metrics). Iterative approach: prove core architecture, then expand scope." />
              </div>
            </Section>

            {/* Section 8: Go Further */}
            <Section id="go-further" title="Go Further" number="8">
              <div className="prose prose-lg max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <a href="https://www.mews.com" target="_blank" rel="noopener noreferrer" className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent hover:border-contact transition-all group shadow-sm">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-foreground">Mews</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 flex-grow text-foreground">Agentic AI for Hotels</h4>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4 flex-grow">
                      The Mews vision for AI in hospitality (2024)
                    </p>
                    <div className="flex items-center gap-2 text-contact text-sm hover:underline underline-offset-4 transition-all">
                      Read <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>

                  <a href="https://roadbook.com/travel/super-hotels-of-the-future/" target="_blank" rel="noopener noreferrer" className="flex flex-col p-6 rounded-lg bg-card border-2 border-transparent hover:border-contact transition-all group shadow-sm">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <span className="text-lg font-semibold text-foreground">Roadbook</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 flex-grow text-foreground">The Future of Hotels: Innovations Shaping Hospitality</h4>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4 flex-grow">
                      Industry insights on hospitality innovation and trends
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
                <button onClick={() => navigate('/#contact')} className="inline-block px-8 py-3 bg-background text-contact font-semibold rounded-lg hover:bg-muted transition-colors border border-contact/20">
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer sections={[{
      id: "hero",
      label: language === "en" ? "Home" : "Accueil"
    }, {
      id: "work",
      label: language === "en" ? "Work" : "Projets"
    }, {
      id: "contact",
      label: language === "en" ? "Contact" : "Contact"
    }]} onSectionClick={sectionId => {
      if (sectionId === "hero") {
        navigate("/");
      } else {
        navigate(`/#${sectionId}`);
      }
    }} />
    </div>;
};
export default FBAgentCaseStudy;