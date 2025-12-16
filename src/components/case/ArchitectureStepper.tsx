import { NodeNetworkDiagram } from "./NodeNetworkDiagram";
import { ImageLightbox } from "@/components/ImageLightbox";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Webhook → run",
    description: "Request triggers a new normalized run.",
  },
  {
    number: 2,
    title: "Agent A generates",
    description: "Main agent produces its initial response.",
  },
  {
    number: 3,
    title: "Agent B counter-analysis",
    description: "Second agent provides adversarial coverage.",
  },
  {
    number: 4,
    title: "Evaluator scores",
    description: "5 criteria: coverage, feasibility, risks, testability, value.",
  },
  {
    number: 5,
    title: "Issues detected",
    description: "Extracted into structured outputs.",
  },
  {
    number: 6,
    title: "Data stored",
    description: "Supabase stores metrics for dashboards.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function ArchitectureStepper() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {/* Horizontal Timeline Grid */}
      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Horizontal line connecting all steps (desktop only) */}
        <div className="hidden lg:block absolute top-5 left-[8.33%] right-[8.33%] h-[2px] bg-gradient-to-r from-transparent via-[#5B7CFF] to-transparent" />

        {/* Steps grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors"
              variants={stepVariants}
              custom={index}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Step number circle */}
              <motion.div
                className="w-10 h-10 mx-auto rounded-full border-2 border-[#A8B8FF] bg-white dark:bg-background flex items-center justify-center font-bold text-sm text-[#3D56CC] dark:text-[#5B7CFF] relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {step.number}
              </motion.div>

              {/* Step content */}
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-3 mb-1 leading-tight">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Optional diagram */}
      <motion.div
        className="mt-12 space-y-4"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="relative group">
          <div
            className="relative rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F1416] cursor-pointer overflow-hidden shadow-[0_18px_40px_rgba(91,124,255,0.10)] dark:shadow-[0_18px_40px_rgba(15,23,42,0.8)]"
            onClick={() => setLightboxOpen(true)}
            tabIndex={0}
            role="button"
            aria-label="Reasoning Engine diagram. Click to enlarge."
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxOpen(true);
              }
            }}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                <ZoomIn className="w-4 h-4" />
                Click to enlarge
              </div>
            </div>
            <div className="p-6 md:p-8">
              <NodeNetworkDiagram />
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Reasoning Engine: detailed node graph showing n8n steps and Supabase tables.
        </p>
      </motion.div>

      {/* Lightbox */}
      <ImageLightbox
        images={[
          {
            src: "",
            alt: "Reasoning Engine diagram",
            caption: "Reasoning Engine: detailed node graph showing n8n steps and Supabase tables",
          },
        ]}
        currentIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={() => {}}
        customContent={
          <div className="max-w-[95vw] max-h-[90vh] overflow-auto p-4">
            <div className="p-8">
              <NodeNetworkDiagram size="full" />
            </div>
            <p className="mt-6 text-white text-center text-base md:text-lg max-w-4xl px-8">
              Reasoning Engine: detailed node graph showing n8n steps and Supabase tables
            </p>
          </div>
        }
      />
    </>
  );
}
