import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Tool {
  name: string;
  icon: string;
  iconSize?: "normal" | "large";
}

export const BuiltWithBanner = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Gestion du thème
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

  // Calcul de l'icon Cursor selon le thème
  const getCursorIcon = () => {
    if (!mounted) return "/img/cursor-icon.svg";
    return isDark ? "/img/cursor-icon2.svg" : "/img/cursor-icon.svg";
  };

  // Organisation en 3 lignes équilibrées
  const line1: Tool[] = [
    { name: "Claude AI", icon: "/img/claude_icon.svg" },
    { name: "Obsidian", icon: "/img/obsidian-icon.svg" },
    { name: "Figma", icon: "/img/figma-icon.svg" },
    { name: "Mobbin", icon: "/img/mobbin_icon.svg", iconSize: "large" },
  ];

  const line2: Tool[] = [
    { name: "Cursor", icon: getCursorIcon() },
    { name: "React", icon: "/img/react-native-icon.png" },
    { name: "TypeScript", icon: "/img/typescript_icon.png" },
    { name: "Tailwind CSS", icon: "/img/tailwind-icon.svg" },
  ];

  const line3: Tool[] = [
    { name: "Eleven Labs", icon: "/img/elevenlabs-icon.svg", iconSize: "large" },
    { name: "Lovable", icon: "/img/lovable_icon.svg" },
    { name: "GitHub", icon: "/img/github-icon.svg" },
  ];

  const lines = [line1, line2, line3];

  // Animation variants améliorées avec courbes d'easing plus fluides
  const toolVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const, // Courbe d'easing plus naturelle
      },
    }),
    rest: {
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    hover: {
      scale: 1.2,
      y: -12,
      zIndex: 10,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1] as const, // Courbe d'easing avec rebond subtil
      },
    },
  };

  // Animation continue fluide avec mouvement multidirectionnel
  const floatVariants = (index: number) => {
    const phase = (index * 0.5) % (Math.PI * 2);
    const amplitude = 4;
    const xOffset = Math.sin(phase) * 2;
    const rotation = Math.cos(phase) * 1.5;
    
    return {
      float: {
        y: [0, -amplitude, 0],
        x: [0, xOffset, 0],
        rotate: [0, rotation, 0],
        transition: {
          duration: 3 + (index % 3) * 0.4, // Durée variable entre 3 et 4.2s
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as const, // Courbe d'easing très fluide (ease-in-out)
          repeatDelay: 0,
        },
      },
    };
  };

  return (
    <motion.div 
      className="w-full py-16 bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Titre discret */}
        <h3 className="text-xl text-foreground/60 font-[500] mb-12 text-center">
          Site built with
        </h3>
        
        {/* 3 lignes équilibrées */}
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {lines.map((line, lineIndex) => {
            let toolIndex = 0;
            // Calculer l'index global pour le stagger
            for (let i = 0; i < lineIndex; i++) {
              toolIndex += lines[i].length;
            }
            
            return (
              <div
                key={lineIndex}
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 md:gap-x-6 md:gap-y-4 w-full"
              >
                {line.map((tool, toolIndexInLine) => {
                  const globalIndex = toolIndex + toolIndexInLine;
                  
                  // Taille des logos : responsive avec taille réduite sur mobile
                  const logoSize = tool.iconSize === "large" 
                    ? "w-10 h-10 sm:w-12 sm:h-12" 
                    : "w-8 h-8 sm:w-10 sm:h-10";
                  
                  const isElevenLabs = tool.name === "Eleven Labs";
                  
                  return (
                    <motion.div
                      key={tool.name}
                      custom={globalIndex}
                      variants={toolVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover="hover"
                      className={`flex items-center gap-3 cursor-pointer group relative z-0 ${
                        isElevenLabs ? "px-2 py-1" : ""
                      }`}
                      style={{
                        zIndex: 1,
                      }}
                      aria-label={tool.name}
                      title={tool.name}
                    >
                      <motion.div
                        custom={globalIndex}
                        variants={floatVariants(globalIndex)}
                        animate="float"
                        initial={false}
                        style={{
                          willChange: "transform",
                        }}
                      >
                        <img 
                          src={tool.icon} 
                          alt={`${tool.name} logo`}
                          className={`${logoSize} object-contain flex-shrink-0 transition-all duration-500 group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]`}
                          loading="lazy"
                          style={{ willChange: "transform" }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.error(`Failed to load logo for ${tool.name}: ${tool.icon}`);
                            target.style.opacity = '0.4';
                            target.style.filter = 'grayscale(100%)';
                          }}
                          onLoad={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.opacity = '1';
                            target.style.filter = 'none';
                          }}
                        />
                      </motion.div>
                      <motion.span 
                        className="text-sm sm:text-base md:text-lg font-[500] text-foreground/80 whitespace-nowrap transition-colors duration-500 group-hover:text-foreground"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ 
                          opacity: 1,
                          x: 2,
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: [0.34, 1.56, 0.64, 1] as const,
                        }}
                      >
                        {tool.name}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
