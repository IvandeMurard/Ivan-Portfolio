import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface Tool {
  name: string;
  icon: string;
  url?: string;
  description: string;
}

export const BuiltWithBanner = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    
    if (theme === "dark") {
      setIsDark(true);
    } else if (theme === "light") {
      setIsDark(false);
    } else if (theme === "system" || !theme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const getCursorIcon = () => {
    if (!mounted) return "/img/cursor-icon.svg";
    return isDark ? "/img/cursor-icon2.svg" : "/img/cursor-icon.svg";
  };

  // Featured tools (larger, primary)
  const featuredTools: Tool[] = [
    { 
      name: "Claude AI", 
      icon: "/img/claude_icon.svg",
      url: "https://claude.ai",
      description: "AI assistant for coding & analysis"
    },
    { 
      name: "Cursor", 
      icon: getCursorIcon(),
      url: "https://cursor.sh",
      description: "AI-powered code editor"
    },
    { 
      name: "Figma", 
      icon: "/img/figma-icon.svg",
      url: "https://figma.com",
      description: "UI/UX design & prototyping"
    },
    { 
      name: "Lovable", 
      icon: "/img/lovable_icon.svg",
      url: "https://lovable.dev",
      description: "AI web app builder"
    },
  ];

  // Supporting tools (smaller, secondary)
  const supportingTools: Tool[] = [
    { 
      name: "React", 
      icon: "/img/react-native-icon.png",
      url: "https://react.dev",
      description: "UI library"
    },
    { 
      name: "TypeScript", 
      icon: "/img/typescript_icon.png",
      url: "https://www.typescriptlang.org",
      description: "Typed JavaScript"
    },
    { 
      name: "Tailwind", 
      icon: "/img/tailwind-icon.svg",
      url: "https://tailwindcss.com",
      description: "Utility-first CSS"
    },
    { 
      name: "Eleven Labs", 
      icon: "/img/elevenlabs-icon.svg",
      url: "https://elevenlabs.io",
      description: "AI voice generation"
    },
  ];

  const ToolItem = ({ 
    tool, 
    size = "featured" 
  }: { 
    tool: Tool; 
    size?: "featured" | "supporting";
  }) => {
    const isHovered = hoveredTool === tool.name;
    const isFeatured = size === "featured";
    const iconSize = isFeatured ? "w-10 h-10 md:w-12 md:h-12" : "w-7 h-7 md:w-8 md:h-8";

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              onMouseEnter={() => setHoveredTool(tool.name)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <motion.div
                className="flex items-center gap-2 cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              >
                {/* Icon container with slide animation */}
                <motion.div
                  className="relative flex-shrink-0"
                  animate={prefersReducedMotion ? {} : {
                    x: isHovered ? -4 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <img 
                    src={tool.icon} 
                    alt={`${tool.name} logo`}
                    className={`${iconSize} object-contain transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0.4';
                    }}
                  />
                </motion.div>

                {/* Description slide-in (desktop only) */}
                <motion.div
                  className="hidden md:block overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.span
                    className={`whitespace-nowrap ${
                      isFeatured 
                        ? "text-sm font-medium text-foreground/80" 
                        : "text-xs font-medium text-foreground/70"
                    }`}
                    initial={{ x: -10 }}
                    animate={{ x: isHovered ? 0 : -10 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {tool.description}
                  </motion.span>
                </motion.div>
              </motion.div>
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="md:hidden">
            <p className="text-sm">{tool.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <motion.div 
      className="w-full py-12 md:py-16 bg-transparent"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Title */}
        <h3 className="text-lg md:text-xl text-foreground/60 font-medium mb-8 md:mb-10 text-center">
          Site built with
        </h3>
        
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {/* Featured Tools Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {featuredTools.map((tool) => (
              <ToolItem key={tool.name} tool={tool} size="featured" />
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-border/30" />

          {/* Supporting Tools Row */}
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
            {supportingTools.map((tool) => (
              <ToolItem key={tool.name} tool={tool} size="supporting" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
