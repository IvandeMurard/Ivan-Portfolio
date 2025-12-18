import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProcessStep {
  label: string;
  description: string;
  tools: {
    name: string;
    icon: string;
    url?: string;
  }[];
}

const content = {
  en: {
    title: "My Process",
    steps: [
      {
        label: "Research",
        description: "Deep research & discovery",
        tools: [{ name: "Perplexity Pro", icon: "/img/perplexity_icon.svg", url: "https://perplexity.ai" }],
      },
      {
        label: "Reasoning",
        description: "Strategic planning",
        tools: [{ name: "Claude Opus 4.5", icon: "/img/claude_icon.svg", url: "https://claude.ai" }],
      },
      {
        label: "Building",
        description: "Development via MCP",
        tools: [
          { name: "Claude Sonnet 4.5", icon: "/img/claude_icon.svg", url: "https://claude.ai" },
          { name: "Linear", icon: "/img/linear_icon.svg", url: "https://linear.app" },
          { name: "Cursor", icon: "/img/cursor-icon.svg", url: "https://cursor.sh" },
        ],
      },
      {
        label: "Terminal",
        description: "Command line interface",
        tools: [{ name: "Warp", icon: "/img/Warp_icon.png", url: "https://warp.dev" }],
      },
      {
        label: "Knowledge",
        description: "Knowledge management",
        tools: [{ name: "Obsidian", icon: "/img/obsidian-icon.svg", url: "https://obsidian.md" }],
      },
      {
        label: "Design",
        description: "UI/UX & prototyping",
        tools: [
          { name: "Figma", icon: "/img/figma-icon.svg", url: "https://figma.com" },
          { name: "Lovable", icon: "/img/lovable_icon.svg", url: "https://lovable.dev" },
        ],
      },
    ],
  },
  fr: {
    title: "Mon Processus",
    steps: [
      {
        label: "Recherche",
        description: "Recherche approfondie",
        tools: [{ name: "Perplexity Pro", icon: "/img/perplexity_icon.svg", url: "https://perplexity.ai" }],
      },
      {
        label: "Raisonnement",
        description: "Planification stratégique",
        tools: [{ name: "Claude Opus 4.5", icon: "/img/claude_icon.svg", url: "https://claude.ai" }],
      },
      {
        label: "Construction",
        description: "Développement via MCP",
        tools: [
          { name: "Claude Sonnet 4.5", icon: "/img/claude_icon.svg", url: "https://claude.ai" },
          { name: "Linear", icon: "/img/linear_icon.svg", url: "https://linear.app" },
          { name: "Cursor", icon: "/img/cursor-icon.svg", url: "https://cursor.sh" },
        ],
      },
      {
        label: "Terminal",
        description: "Interface en ligne de commande",
        tools: [{ name: "Warp", icon: "/img/Warp_icon.png", url: "https://warp.dev" }],
      },
      {
        label: "Connaissances",
        description: "Gestion des connaissances",
        tools: [{ name: "Obsidian", icon: "/img/obsidian-icon.svg", url: "https://obsidian.md" }],
      },
      {
        label: "Design",
        description: "UI/UX & prototypage",
        tools: [
          { name: "Figma", icon: "/img/figma-icon.svg", url: "https://figma.com" },
          { name: "Lovable", icon: "/img/lovable_icon.svg", url: "https://lovable.dev" },
        ],
      },
    ],
  },
};

export const ProcessFlowchart = () => {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const currentContent = content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4, ease: "easeOut" as const },
    },
  };

  const StepCard = ({ step, index }: { step: ProcessStep; index: number }) => (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col items-center gap-3 p-4 md:p-5 rounded-xl
                 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md 
                 border border-border/30 hover:border-border/50
                 transition-all duration-200 hover:scale-[1.02]
                 min-w-[140px] md:min-w-[160px]"
    >
      {/* Step number badge */}
      <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground 
                       text-xs font-bold flex items-center justify-center shadow-sm">
        {index + 1}
      </span>

      {/* Tools icons */}
      <div className="flex items-center justify-center gap-2">
        {step.tools.map((tool) => (
          <TooltipProvider key={tool.name} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform duration-200 hover:scale-110"
                >
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = "0.4";
                    }}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-sm font-medium">{tool.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      {/* Label */}
      <span className="text-sm font-semibold text-foreground">{step.label}</span>

      {/* Description */}
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {step.description}
      </span>
    </motion.div>
  );


  return (
    <section className="w-full py-12 md:py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Title */}
        <motion.h3
          className="text-lg md:text-xl text-foreground/60 font-medium mb-8 md:mb-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
        >
          {currentContent.title}
        </motion.h3>

        {/* Responsive grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {currentContent.steps.map((step, index) => (
            <StepCard key={step.label} step={step} index={index} />
          ))}
        </motion.div>

        {/* Desktop: Arrows between cards */}
        <div className="hidden lg:flex justify-center -mt-20 mb-4">
          <div className="flex items-center gap-[116px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <ChevronRight key={i} className="w-5 h-5 text-muted-foreground/50" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
