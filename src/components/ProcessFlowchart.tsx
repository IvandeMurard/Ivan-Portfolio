import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
        label: "Knowledge",
        description: "Knowledge management",
        tools: [{ name: "Obsidian", icon: "/img/obsidian-icon.svg", url: "https://obsidian.md" }],
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
          { name: "Linear", icon: "/img/linear_icon.svg", url: "https://linear.app" },
          { name: "Cursor", icon: "/img/cursor-icon.svg", url: "https://cursor.sh" },
          { name: "Warp", icon: "/img/Warp_icon.png", url: "https://warp.dev" },
        ],
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
        label: "Connaissances",
        description: "Gestion des connaissances",
        tools: [{ name: "Obsidian", icon: "/img/obsidian-icon.svg", url: "https://obsidian.md" }],
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
          { name: "Linear", icon: "/img/linear_icon.svg", url: "https://linear.app" },
          { name: "Cursor", icon: "/img/cursor-icon.svg", url: "https://cursor.sh" },
          { name: "Warp", icon: "/img/Warp_icon.png", url: "https://warp.dev" },
        ],
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

  const titleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4, ease: "easeOut" as const },
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
                 bg-card/95 dark:bg-slate-900/70
                 border border-border/60 hover:border-border/80
                 shadow-sm hover:shadow-md
                 transition-all duration-200 hover:scale-[1.02]
                 min-w-[160px] md:min-w-[190px] flex-1"
      aria-label={`${step.label}: ${step.description}`}
    >

      {/* Tools icons */}
      <div className="flex items-center justify-center gap-2" aria-label="Tools" role="list">
        {step.tools.map((tool) => (
          <TooltipProvider key={tool.name} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${tool.name} (opens in a new tab)`}
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
      <h4 className="text-sm font-semibold text-foreground">{step.label}</h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground text-center leading-snug">
        {step.description}
      </p>
    </motion.div>
  );

  return (
    <motion.section
      className="w-full py-12 md:py-16 bg-transparent"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Title */}
        <motion.h3
          className="text-lg md:text-xl text-foreground/80 font-semibold mb-8 md:mb-10 text-center"
          variants={titleVariants}
        >
          {currentContent.title}
        </motion.h3>

        {/* Desktop: Horizontal flow with inline arrows */}
        <motion.div
          className="hidden lg:flex items-stretch justify-center gap-3"
          variants={containerVariants}
        >
          {currentContent.steps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-3">
              <StepCard step={step} index={index} />
              {index < currentContent.steps.length - 1 && (
                <motion.div variants={itemVariants}>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Tablet/Mobile: Grid layout */}
        <motion.div
          className="grid lg:hidden grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
        >
          {currentContent.steps.map((step, index) => (
            <StepCard key={step.label} step={step} index={index} />
          ))}
        </motion.div>

        {/* CTA under My Process */}
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group hover:bg-contact hover:text-contact-foreground hover:border-contact transition-all duration-300"
          >
            <a href="#contact">
              Let's connect
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </a>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};
