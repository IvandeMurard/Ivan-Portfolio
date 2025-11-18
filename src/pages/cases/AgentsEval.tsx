import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/work/CTABanner";
import { EvaluationEngineDiagram } from "@/components/case/EvaluationEngineDiagram";
import { ArchitectureStepper } from "@/components/case/ArchitectureStepper";
import { ToolsMarquee } from "@/components/case/ToolsMarquee";
import { ImageLightbox } from "@/components/ImageLightbox";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

export default function AgentsEvalCase() {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
    <div className="overflow-x-hidden">
      <Navigation />
      <ProgressIndicator
        sections={[
          { id: "hero", label: "Hero" },
          { id: "problem", label: "Problem" },
          { id: "solution", label: "Solution" },
          { id: "how-it-works", label: "How it works" },
          { id: "why-it-matters", label: "Why it matters" },
          { id: "architecture", label: "Architecture" },
          { id: "example", label: "Example" },
          { id: "impact", label: "Impact" },
          { id: "going-further", label: "Going further" },
        ]}
      />
      <main className="w-full pt-24 pb-10 bg-background">
        {/* Section 0: Hero - Ada style with blue background */}
        <section id="hero" className="w-full py-24 md:py-32 lg:py-40 bg-[#B7D4FF] dark:bg-background">
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 text-center space-y-6 md:space-y-8">
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-sm md:text-base font-medium tracking-[0.22em] uppercase text-[#3D56CC] dark:text-[#A8B8FF]">
                Case Study · AI Agent Evaluation
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                The Evaluation Engine™
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-800 dark:text-slate-200 max-w-3xl mx-auto font-medium">
                An autonomous system that tests your AI agents with enterprise-grade rigor.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
                Automated scoring, structured reasoning, reliability, and safety — wrapped into one auditable evaluation pipeline.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 space-y-12">

          {/* Section 1.b: Tools Marquee */}
          <ToolsMarquee />

          {/* Section 1: The problem - Ada structure with blue background and accent bar */}
          <section id="problem" className="w-full -mx-4 md:-mx-8 lg:-mx-12 py-12 md:py-16 bg-[#C9DDFF] dark:bg-[#0F1416]">
            <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
              <div className="relative pl-6 md:pl-8 space-y-8">
                {/* Accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-full bg-[#5B7CFF]" />
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">1. The problem</h2>
                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
                    Modern AI agents are powerful — but unpredictable. Without structured evaluation, you can't safely deploy them in production.
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
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Subjective manual review</h3>
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

          {/* Section 2: The solution - Ada structure */}
          <section id="solution" className="py-12 md:py-16 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">2. The solution</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                The Evaluation Engine™ is an autonomous evaluation system that scores agents against a structured rubric.
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
                It reads full conversations, scores them, detects issues, produces recommendations, and emits a final verdict.
              </p>
            </motion.div>
          </section>

          {/* Section 3: How it works - Ada style with diagram */}
          <section id="how-it-works" className="py-12 md:py-16 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">3. How it works</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                The Engine processes every evaluation through a structured flow: agent output → reasoning → scoring → structured storage → verdict.
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

          {/* Section 4: Battle-tested evaluation (UNCHANGED) */}
          <section id="why-it-matters" className="py-20 md:py-24 px-4 md:px-8 bg-zinc-900 dark:bg-zinc-950 rounded-3xl my-8">
            <div className="max-w-6xl mx-auto space-y-12">
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
                    Detects risky output, flags PII, and enforces constraints with built-in safeguards to minimize hallucinations and ensure safe responses.
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
                    High standards for data protection with minimal data retention, structured output only, and controlled logs with zero data retention policies.
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
                    5-score rubric with composite scoring and deterministic gating lane for consistent, repeatable evaluation results.
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
                    Every run is stored with issues, recommendations, structured scores, a clear verdict, and a complete trace of decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Ribbon after Section 4 */}
          <section className="w-full -mx-4 md:-mx-8 lg:-mx-12 py-6 md:py-8 bg-contact/10 dark:bg-contact/20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium">
                  Ready to boost your agents safety?
                </p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-2.5 rounded-full bg-contact text-white font-medium hover:bg-contact/90 transition-colors shadow-sm hover:shadow-md"
                >
                  Let's talk
                </button>
              </div>
            </div>
          </section>

          {/* Section 5: Architecture summary - Vertical stepper */}
          <section id="architecture" className="py-12 md:py-16 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Architecture summary</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                How the evaluation pipeline runs
              </p>
            </div>
            <ArchitectureStepper />
          </section>

          {/* Section 6: Evaluation Receipt™ */}
          <section id="example" className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
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
                    6. Example evaluation receipt
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
          <section id="impact" className="w-full -mx-4 md:-mx-8 lg:-mx-12 py-12 md:py-16 bg-[#F8FAFC] dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">7. Impact</h2>
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

          {/* Section 9: Going further */}
          <section id="going-further" className="py-12 md:py-16 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">9. Going further</h2>
            <div className="relative pl-6 md:pl-8">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-full bg-[#5B7CFF]" />
              <div className="p-8 rounded-2xl border border-border/40 bg-card space-y-4">
                <ul className="space-y-3 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#5B7CFF] flex-shrink-0" />
                    <span>Plug customers' SOPs (policies, playbooks) to score agents against these specific procedures.</span>
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

          {/* CTA Banner */}
          <CTABanner
            title="Explore more projects"
            description="Discover how I build scalable systems for AI agent evaluation"
            ctaText="Back to portfolio"
            onClick={() => navigate("/")}
            className="my-6"
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
      </main>

      {/* Lightbox for diagram */}
      <ImageLightbox
        images={[
          {
            src: "",
            alt: "Evaluation Engine™ Workflow Diagram",
            caption: "The Evaluation Engine™ processes conversations through a structured workflow: user input → safety check → normalization → evaluation → issues/recommendations/scores → Supabase dashboard → CI gate",
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
              The Evaluation Engine™ processes conversations through a structured workflow: user input → safety check → normalization → evaluation → issues/recommendations/scores → Supabase dashboard → CI gate
            </p>
          </div>
        }
      />
    </div>
  );
}
