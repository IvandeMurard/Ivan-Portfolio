/**
 * CaseBreadcrumb - Sticky breadcrumb that appears on scroll
 * Shows Home / Project Name for wayfinding in case studies
 */

import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseBreadcrumbProps {
  projectName: string;
}

export const CaseBreadcrumb = ({ projectName }: CaseBreadcrumbProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-[56px] left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border"
        >
          <div className="container mx-auto max-w-7xl px-4 lg:px-8 py-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home size={12} />
              <span>Home</span>
            </Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-foreground font-medium truncate">
              {projectName}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
