import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const prefersReducedMotion = useReducedMotion();

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

  // Featured tools (larger icons)
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

  // Supporting tools (slightly smaller icons)
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
    const isFeatured = size === "featured";
    const iconSize = isFeatured 
      ? "w-10 h-10 md:w-12 md:h-12" 
      : "w-9 h-9 md:w-10 md:h-10";

    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                {/* Icon with subtle hover scale */}
                <div className={`${iconSize} transition-transform duration-200 group-hover:scale-110`}>
                  <img 
                    src={tool.icon} 
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0.4';
                    }}
                  />
                </div>
                {/* Subtle permanent caption */}
                <span className={`text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground ${
                  isFeatured ? "" : "text-[11px]"
                }`}>
                  {tool.name}
                </span>
              </div>
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-sm">{tool.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <motion.div 
      className="w-full py-12 md:py-16 bg-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Title */}
        <motion.h3 
          className="text-lg md:text-xl text-foreground/60 font-medium mb-8 md:mb-10 text-center"
          variants={itemVariants}
        >
          Site built with
        </motion.h3>
        
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {/* Featured Tools Row */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {featuredTools.map((tool) => (
              <motion.div key={tool.name} variants={itemVariants}>
                <ToolItem tool={tool} size="featured" />
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div className="w-16 h-px bg-border/30" variants={itemVariants} />

          {/* Supporting Tools Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {supportingTools.map((tool) => (
              <motion.div key={tool.name} variants={itemVariants}>
                <ToolItem tool={tool} size="supporting" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
