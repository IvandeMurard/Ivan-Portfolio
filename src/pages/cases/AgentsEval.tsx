import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/work/CTABanner";
import { EvaluationEngineDiagram } from "@/components/case/EvaluationEngineDiagram";
import { ArchitectureStepper } from "@/components/case/ArchitectureStepper";
import { ImageLightbox } from "@/components/ImageLightbox";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySidebar } from "@/components/case-study/CaseStudySidebar";
import { CaseStudyTLDR } from "@/components/case-study/CaseStudyTLDR";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Haptic feedback helper (vibration API for mobile)
const triggerHaptic = (pattern: number | number[] = 10) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

// Bilingual content for evolution section
const evolutionContent = {
  en: {
    title: "From single agents to agent ecosystems",
    steps: [
      {
        number: "01",
        title: "Vision 2026",
        content: "In hospitality, multi-agent systems integrated into complex IT infrastructures will be the norm: agents coordinate, delegate, negotiate, and act together."
      },
      {
        number: "02",
        title: "Autonomy",
        content: "We expect them to be autonomous, to read and anticipate our intentions, our needs, and to react and alert via the right channel at the right moment."
      },
      {
        number: "03",
        title: "Coordination",
        content: "Pricing agents talk to demand agents, staffing agents react to forecasting agents, and evaluation agents supervise execution. To be effective, an agent must be specialized, multiplying needs and interactions."
      },
      {
        number: "04",
        title: "The Risk",
        content: "When agents coordinate, failures become silent, intentions unclear, delegation unsafe, and decisions conflicting."
      },
      {
        number: "05",
        title: "My Approach",
        content: "Through this project, I explore a turnkey Agent-to-Agent Evaluation method, Safe by design and SOC-2 compatible."
      },
    ],
  },
  fr: {
    title: "Des agents isolés aux écosystèmes multi-agents",
    steps: [
      {
        number: "01",
        title: "Vision 2026",
        content: "En hôtellerie, les systèmes multi-agents intégrés à des SI complexes seront la norme : les agents coordonnent, délèguent, négocient et agissent ensemble."
      },
      {
        number: "02",
        title: "Autonomie",
        content: "L'on attend d'eux qu'ils soient autonomes, qu'ils lisent et anticipent nos intentions, nos besoins, et réagissent et alertent via le bon canal au bon moment."
      },
      {
        number: "03",
        title: "Coordination",
        content: "Les agents de pricing dialoguent avec les agents de demande, les agents de staffing réagissent aux agents de prévision, et les agents d'évaluation supervisent l'exécution. Car pour être efficace, un agent doit être spécialisé, multipliant les besoins et les interactions."
      },
      {
        number: "04",
        title: "Le Risque",
        content: "Quand les agents se coordonnent, les défaillances deviennent silencieuses, les intentions floues, la délégation non sécurisée et les décisions conflictuelles."
      },
      {
        number: "05",
        title: "Mon Approche",
        content: "Via ce projet, j'explore une méthode d'Évaluation Agent-to-Agent clé en main, Safe by design et SOC-2 compatible."
      },
    ],
  },
};

export default function AgentsEvalCase() {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { language } = useLanguage();
  const t = evolutionContent[language];

  const scrollToSection = (id: string) => {
    if (id === "home") {
      navigate("/");
    } else if (id === "contact") {
      navigate("/#contact");
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="overflow-x-hidden" role="main">
      <Navigation />
      {/* <ProgressIndicator
        sections={[
          { id: "evolution", label: "0. Evolution" },
          { id: "problem", label: "1. Problem" },
          { id: "role-approach", label: "2. Role" },
          { id: "solution", label: "3. Solution" },
          { id: "how-it-works", label: "4. Process" },
          { id: "architecture", label: "5. Architecture" },
          { id: "example", label: "6. Deliverable" },
          { id: "impact", label: "7. Impact" },
          { id: "learnings", label: "8. Learnings" },
          { id: "going-further", label: "9. More" },
        ]}
      /> */}

      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-16 max-w-[1400px]">
        {/* Hero Section - Full width */}
        <div className="mb-8">
          <CaseStudyHero
            title="Agentic Evaluation"
            subtitle={language === 'en' 
              ? "An autonomous system that tests your AI agents\nwith enterprise-grade rigor" 
              : "Un système autonome qui teste vos agents IA\navec une rigueur industrielle"}
            backgroundImage="/img/jeremy-bishop-xua0NYSuTF4-unsplash.jpg"
            imageCredit="photo by Jeremy Bishop"
            tools={[
              { name: "Supabase", icon: "/img/supabase-icon.png" },
              { name: "OpenAI", icon: "/img/openai-icon.svg" },
              { name: "n8n", icon: "/img/n8n-icon.svg" },
              { name: "GitHub", icon: "/img/github-icon.svg" },
              { name: "Figma", icon: "/img/figma-icon.svg" },
            ]}
          />
        </div>

        {/* Evolution Section - Horizontal Timeline */}
        <section
          id="evolution"
          className="w-full py-12 md:py-16 mb-12 bg-gradient-to-br from-[#E8F0FF] to-[#C9DDFF] dark:from-[#0F1416] dark:to-[#1a1f24]"
        >
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.title}
            </motion.h2>
            
            {/* Horizontal timeline container */}
            <div className="relative">
              {/* Horizontal connecting line - desktop only */}
              <div className="hidden md:block absolute top-4 left-0 right-0 h-[2px] bg-primary/30" />
              
              {/* Steps grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
                {t.steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="relative"
                  >
                    {/* Number circle */}
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md mb-3 mx-auto md:mx-0">
                      <span className="text-primary-foreground text-sm font-bold">{step.number}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center md:text-left">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* Sidebar - Metadata */}
          <CaseStudySidebar
            role="Product Manager & Technical Lead"
            duration="Ongoing"
            team="Solo project"
            client="Personal project"
            industry="AI / Agent Evaluation"
            context="Autonomous evaluation system"
          />

          {/* TL;DR aligned with sidebar */}
          <section className="mb-8">
            <CaseStudyTLDR
              items={[
                {
                  label: language === 'en' ? "Context" : "Contexte",
                  content: language === 'en'
                    ? "Modern AI agents are powerful but unpredictable. Without structured evaluation, you cannot safely deploy them in production."
                    : "Les agents IA modernes sont puissants mais imprévisibles. Sans évaluation structurée, impossible de les déployer en production en toute sécurité.",
                },
                {
                  label: language === 'en' ? "Challenge" : "Défi",
                  content: language === 'en'
                    ? "Unpredictability, subjective manual review, and no shared standard for evaluation"
                    : "Imprévisibilité, revue manuelle subjective, et aucun standard partagé pour l'évaluation",
                },
                {
                  label: "Solution",
                  content: language === 'en'
                    ? "The Evaluation Engine™: an autonomous system that scores agents against a structured rubric with safety, privacy, reliability, and auditability"
                    : "L'Evaluation Engine™ : un système autonome qui évalue les agents selon une grille structurée intégrant sécurité, confidentialité, fiabilité et traçabilité",
                },
                {
                  label: "Impact",
                  content: language === 'en'
                    ? "80% reduction in evaluation time, repeatability, industrial-grade trust layer, reusable foundation"
                    : "Réduction de 80% du temps d'évaluation, répétabilité, couche de confiance industrielle, fondation réutilisable",
                },
                {
                  label: language === 'en' ? "What's next" : "Prochaine étape",
                  content: language === 'en'
                    ? "Agent-to-agent evaluation: auditing how agents communicate, delegate, and coordinate in multi-agent systems"
                    : "Évaluation agent-à-agent : auditer comment les agents communiquent, délèguent et se coordonnent dans les systèmes multi-agents",
                },
              ]}
            />
          </section>
        </div>

        {/* Main Content - Full width after sidebar */}
        <main className="w-full space-y-16">
          {/* Section 1: The problem - Ada structure with blue background and accent bar */}
          <section
            id="problem"
            className="w-full py-12 md:py-16 bg-[#C9DDFF] dark:bg-[#0F1416]"
          >
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
              <div className="relative pl-6 md:pl-8 space-y-8">
                {/* Accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-full bg-[#5B7CFF]" />

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                    1. The problem
                  </h2>
                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
                    Modern AI agents are powerful — but unpredictable. Without structured evaluation, you can't safely
                    deploy them in production.
                  </p>
                </div>

                {/* 3-column grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <motion.div
                    className="p-6 rounded-2xl border border-slate-200/50 bg-white/90 dark:bg-slate-800/90 space-y-3 shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Unpredictability</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Hallucinations, constraint breaks, sensitive data leaks, silent failures.
                    </p>
                  </motion.div>
                  <motion.div
                    className="p-6 rounded-2xl border border-slate-200/50 bg-white/90 dark:bg-slate-800/90 space-y-3 shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Subjective manual review
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Results vary depending on who evaluates, when, and using which criteria.
                    </p>
                  </motion.div>
                  <motion.div
                    className="p-6 rounded-2xl border border-slate-200/50 bg-white/90 dark:bg-slate-800/90 space-y-3 shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No shared standard</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      No rubric, no scoring, no audit trail, no reproducibility.
                    </p>
                  </motion.div>
                </div>

                {/* Highlight block */}
                <motion.div
                  className="mt-8 p-6 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-[rgba(91,124,255,0.20)] shadow-md shadow-black/5"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#5B7CFF] mt-2 flex-shrink-0" />
                    <p className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                      Without an autonomous evaluation system, you cannot scale AI agents safely.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Section 2: My Role & Approach */}
          <section id="role-approach" className="py-12 md:py-16 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">2. My Role & Approach</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                As Product Manager & Technical Lead, I designed and built this autonomous evaluation system from the
                ground up.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-3">Product Strategy</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Defined the evaluation framework and scoring rubric
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Designed the agent-as-evaluator architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Prioritized safety, privacy, and auditability by design
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-3">Technical Execution</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Built the evaluation pipeline with OpenAI + Supabase
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Implemented structured output and audit logging
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Created the Evaluation Receipt format for traceability
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: The solution - Ada structure */}
          <section id="solution" className="py-12 md:py-16 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">3. The solution</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                The Evaluation Engine™ is an autonomous evaluation system that scores agents against a structured
                rubric.
              </p>
            </div>

            {/* 4 stacked micro-blocks */}
            <div className="space-y-4 mt-8">
              <motion.div
                className="p-6 rounded-2xl border border-border/40 bg-card hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-2">Quality supervisor</h3>
                <p className="text-sm text-muted-foreground">
                  Monitors agent behavior and output quality across all interactions.
                </p>
              </motion.div>
              <motion.div
                className="p-6 rounded-2xl border border-border/40 bg-card hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-2">Safety watchdog</h3>
                <p className="text-sm text-muted-foreground">
                  Detects risky output, flags PII, and enforces constraints.
                </p>
              </motion.div>
              <motion.div
                className="p-6 rounded-2xl border border-border/40 bg-card hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2">Compliance guardian</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures adherence to safety-by-design and privacy-by-design principles.
                </p>
              </motion.div>
              <motion.div
                className="p-6 rounded-2xl border border-border/40 bg-card hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-2">Reasoning auditor</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluates the logical flow and coherence of agent reasoning.
                </p>
              </motion.div>
            </div>

            {/* Closing block */}
            <motion.div
              className="mt-8 p-6 rounded-2xl bg-primary/10 border border-primary/20"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <p className="text-base md:text-lg">
                It reads full conversations, scores them, detects issues, produces recommendations, and emits a final
                verdict.
              </p>
            </motion.div>
          </section>

          {/* Section 4: How it works - Ada style with diagram */}
          <section id="how-it-works" className="py-12 md:py-16 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">4. How it works</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                The Engine processes every evaluation through a structured flow: agent output → reasoning → scoring →
                structured storage → verdict.
              </p>
            </div>

            {/* Diagram container with highlight */}
            <motion.div
              className="relative group mt-8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="rounded-3xl border border-border/50 bg-white dark:bg-[#0F1416] p-6 md:p-8 shadow-md shadow-black/5">
                <div className="bg-[#F0F4FF] dark:bg-black/10 rounded-2xl p-4">
                  <EvaluationEngineDiagram onClick={() => setLightboxOpen(true)} />
                </div>
              </div>
              <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                  <ZoomIn className="w-4 h-4" />
                  Click to enlarge
                </div>
              </div>
            </motion.div>

            {/* ADA block with 3 sub-sections */}
            <motion.div
              className="mt-8 p-8 rounded-2xl border border-border/40 bg-card space-y-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">What this diagram shows</h3>
                <p className="text-sm text-muted-foreground">
                  High-level flow: agent actions, evaluation logic, structured outputs, final verdict.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How to read it</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Circles = agent steps</li>
                  <li>Green = evaluation logic</li>
                  <li>Blue = storage</li>
                  <li>Thick arrows = gating points</li>
                  <li>Dashed arrows = metadata flows</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Why this matters</h3>
                <p className="text-sm text-muted-foreground">
                  The process becomes reproducible, comparable, auditable.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Section 3 continued: Battle-tested evaluation (part of Solution) */}
          <section className="py-20 md:py-24 px-4 md:px-8 bg-zinc-900 dark:bg-zinc-950 rounded-3xl my-8">
            <div className="max-w-[1400px] mx-auto space-y-12">
              {/* Header */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Battle-tested evaluation with enterprise-level rigor
                </h2>
                <p className="text-lg md:text-xl text-zinc-400">
                  Trusted foundation for deploying AI agents in production
                </p>
              </div>

              {/* Feature blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Safety-by-design */}
                <div className="space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Grid pattern with central hub */}
                      <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                      <rect x="28" y="12" width="8" height="8" fill="currentColor" />
                      <rect x="44" y="12" width="8" height="8" fill="currentColor" />
                      <rect x="12" y="28" width="8" height="8" fill="currentColor" />
                      <rect x="28" y="28" width="8" height="8" fill="currentColor" />
                      <rect x="44" y="28" width="8" height="8" fill="currentColor" />
                      <rect x="12" y="44" width="8" height="8" fill="currentColor" />
                      <rect x="28" y="44" width="8" height="8" fill="currentColor" />
                      <rect x="44" y="44" width="8" height="8" fill="currentColor" />
                      {/* Connecting lines from center */}
                      <line x1="32" y1="32" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="44" y2="20" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="20" y2="44" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="44" y2="44" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Safety-by-design</h3>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    Detects risky output, flags PII, and enforces constraints with built-in safeguards to minimize
                    hallucinations and ensure safe responses.
                  </p>
                </div>

                {/* Privacy-by-design */}
                <div className="space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Stacked rows pattern */}
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
                  <h3 className="text-xl font-bold text-white">Privacy-by-design</h3>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    High standards for data protection with minimal data retention, structured output only, and
                    controlled logs with zero data retention policies.
                  </p>
                </div>

                {/* Reliability */}
                <div className="space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Hub and spoke pattern */}
                      <rect x="28" y="28" width="8" height="8" fill="currentColor" />
                      <line x1="32" y1="32" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="52" y2="12" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="12" y2="52" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="52" y2="52" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="12" y2="32" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="32" y2="12" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="32" x2="32" y2="52" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="8" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="50" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="8" y="50" width="6" height="6" fill="currentColor" />
                      <rect x="50" y="50" width="6" height="6" fill="currentColor" />
                      <rect x="8" y="29" width="6" height="6" fill="currentColor" />
                      <rect x="50" y="29" width="6" height="6" fill="currentColor" />
                      <rect x="29" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="29" y="50" width="6" height="6" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Reliability</h3>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    5-score rubric with composite scoring and deterministic gating lane for consistent, repeatable
                    evaluation results.
                  </p>
                </div>

                {/* Auditability */}
                <div className="space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center text-zinc-400">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Complex connected grid */}
                      <rect x="8" y="8" width="10" height="10" fill="currentColor" />
                      <rect x="22" y="8" width="10" height="10" fill="currentColor" />
                      <rect x="36" y="8" width="10" height="10" fill="currentColor" />
                      <rect x="8" y="22" width="10" height="10" fill="currentColor" />
                      <rect x="22" y="22" width="10" height="10" fill="currentColor" />
                      <rect x="36" y="22" width="10" height="10" fill="currentColor" />
                      <rect x="8" y="36" width="10" height="10" fill="currentColor" />
                      <rect x="22" y="36" width="10" height="10" fill="currentColor" />
                      <rect x="36" y="36" width="10" height="10" fill="currentColor" />
                      <rect x="46" y="22" width="10" height="10" fill="currentColor" />
                      <rect x="46" y="36" width="10" height="10" fill="currentColor" />
                      <line x1="18" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="13" x2="36" y2="13" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="18" y1="27" x2="22" y2="27" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="27" x2="36" y2="27" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="18" y1="41" x2="22" y2="41" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="32" y1="41" x2="36" y2="41" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="13" y1="18" x2="13" y2="22" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="27" y1="18" x2="27" y2="22" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="41" y1="18" x2="41" y2="22" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="46" y1="27" x2="50" y2="27" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Auditability</h3>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    Every run is stored with issues, recommendations, structured scores, a clear verdict, and a complete
                    trace of decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Ribbon after Section 4 */}
          <section className="w-full py-6 md:py-8 bg-contact/10 dark:bg-contact/20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium">
                  Ready to boost your agents safety?
                </p>
                <button
                  onClick={() => {
                    triggerHaptic([15, 30, 15]);
                    scrollToSection("contact");
                  }}
                  className="px-6 py-2.5 rounded-full bg-contact text-white font-medium hover:bg-contact/90 hover:shadow-[0_0_20px_rgba(6,95,70,0.4)] active:scale-[0.97] transition-all shadow-sm hover:shadow-md"
                >
                  Let's talk
                </button>
              </div>
            </div>
          </section>

          {/* Section 5: Architecture (Process) summary - Vertical stepper */}
          <section id="architecture" className="py-12 md:py-16 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Process: Architecture</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">How the evaluation pipeline runs</p>
            </div>
            <ArchitectureStepper />
          </section>

          {/* Section 6: Evaluation Receipt™ */}
          <section id="example" className="py-12 md:py-16">
            <div className="w-full px-4 sm:px-6 lg:px-0">
              <motion.div
                className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-900/85 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="px-8 pt-8 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#5B7CFF]" />
                    <div className="text-xs font-medium tracking-[0.22em] uppercase text-slate-500 dark:text-slate-400">
                      Evaluation Receipt™ · Single run · v1
                    </div>
                  </div>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    6. Deliverable: Evaluation Receipt
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    This is the structured summary your agent receives after running through the Engine.
                  </p>
                </div>

                {/* JSON Zone */}
                <div className="px-8 pb-8 pt-2">
                  <div className="w-full overflow-x-auto rounded-2xl bg-slate-950 text-[13px] leading-relaxed text-slate-100 font-mono px-5 py-4 border border-slate-800 text-left">
                    <pre className="m-0">
                      <code>{`{
  "run_id": "run_2025_11_14_ae9b",
  "composite_score": 82.4,
  "verdict": "PASS",
  "coverage": 0.84,
  "feasibility": 0.81,
  "risks": 0.92,
  "testability": 0.78,
  "user_value": 0.76,
  "issues_count": 2,
  "recommendations_count": 3
}`}</code>
                    </pre>
                  </div>
                </div>

                {/* Footer line */}
                <div className="px-8 pb-8">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Each run is stored with deterministic scoring, structured issues, and a full audit trail.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 7: Impact - Ada style */}
          <section
            id="impact"
            className="w-full py-12 md:py-16 bg-[#F8FAFC] dark:bg-slate-950"
          >
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">7. Impact & Results</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  className="p-6 rounded-2xl border border-slate-200/50 bg-white dark:bg-slate-900 shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-2xl font-bold text-[#5B7CFF] mb-2">80%</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">reduction in evaluation time</p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl border border-slate-200/50 bg-white dark:bg-slate-900 shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">Repeatability</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Consistency in quality checks</p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl border border-slate-200/50 bg-white dark:bg-slate-900 shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">Industrial-grade</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Trust layer for agent deployment</p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl border border-slate-200/50 bg-white dark:bg-slate-900 shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">Reusable foundation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">For future AI agents</p>
                </motion.div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Impact is measured based on scoring reproducibility and structured traceability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Key Learnings */}
          <section id="learnings" className="py-12 md:py-16 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">8. Key Learnings</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-3">Agent-as-Evaluator works</h3>
                <p className="text-sm text-muted-foreground">
                  Using LLMs to evaluate other LLMs provides structured, reproducible assessments when given clear
                  rubrics.
                </p>
              </motion.div>
              <motion.div
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3">Structured output is key</h3>
                <p className="text-sm text-muted-foreground">
                  Forcing JSON schemas ensures deterministic, parseable results that can be stored and compared.
                </p>
              </motion.div>
              <motion.div
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-3">Safety-first mindset</h3>
                <p className="text-sm text-muted-foreground">
                  Building evaluation around safety, privacy, and auditability from day one creates a robust foundation.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Section 9: Going further */}
          <section id="going-further" className="py-12 md:py-16 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">9. Go Further</h2>
            <div className="relative pl-6 md:pl-8">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-full bg-[#5B7CFF]" />
              <div className="p-8 rounded-2xl border border-border/40 bg-card space-y-4">
                <ul className="space-y-3 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#5B7CFF] flex-shrink-0" />
                    <span>
                      Plug customers' SOPs (policies, playbooks) to score agents against these specific procedures.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#5B7CFF] flex-shrink-0" />
                    <span>Evaluation automation on large datasets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#5B7CFF] flex-shrink-0" />
                    <span>Multi-agent correlation (cross-model evaluation)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#5B7CFF] flex-shrink-0" />
                    <span>Real-time evaluation during live conversations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#5B7CFF] flex-shrink-0" />
                    <span>Plug-and-play governance & compliance pipelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* CTA Banner - Full width */}
        <CTABanner
          title="Ready to build?"
          description="Let's discuss your product vision and build something great together"
          ctaText="Let's talk!"
          onClick={() => navigate("/#contact")}
        />
      </div>

      {/* Footer */}
      <Footer
        siteName="Ivan de Murard"
        tagline="Product Manager building user-centered experiences"
        sections={[{ id: "home", label: "Back to Portfolio" }]}
        onSectionClick={scrollToSection}
        className="mt-16"
      />

      {/* Lightbox for diagram */}
      <ImageLightbox
        images={[
          {
            src: "",
            alt: "Evaluation Engine™ Workflow Diagram",
            caption:
              "The Evaluation Engine™ processes conversations through a structured workflow: user input → safety check → normalization → evaluation → issues/recommendations/scores → Supabase dashboard → CI gate",
          },
        ]}
        currentIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={() => {}}
        customContent={
          <div className="max-w-[95vw] max-h-[90vh] overflow-auto p-8 flex flex-col items-center">
            <EvaluationEngineDiagram size="full" />
            <p className="mt-6 text-white text-center text-base md:text-lg max-w-4xl">
              The Evaluation Engine™ processes conversations through a structured workflow: user input → safety check →
              normalization → evaluation → issues/recommendations/scores → Supabase dashboard → CI gate
            </p>
          </div>
        }
      />
    </div>
  );
}
