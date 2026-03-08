import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HighContrastProvider } from "@/contexts/HighContrastContext";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { PageTransition } from "@/components/effects/PageTransition";
import { WelcomeBackToast } from "@/components/effects/WelcomeBackToast";
import { CinematicEntrance } from "@/components/effects/CinematicEntrance";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Home } from "./pages/Home";
import Sonor from "./pages/Sonor";
import WTTJCaseStudy from "./pages/cases/wttj-case-study";
import AgentsEval from "./pages/cases/AgentsEval";
import FBAgentCaseStudy from "./pages/cases/FBAgentCaseStudy";
import ResourceLibrary from "./pages/ResourceLibrary";
import NotFound from "./pages/NotFound";
import CVPage from "./pages/CV";

const queryClient = new QueryClient();

function AnimatedRoutes({ onKeyboardHelpToggle }: { onKeyboardHelpToggle: () => void }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home onKeyboardHelpToggle={onKeyboardHelpToggle} /></PageTransition>} />
        <Route path="/case-study/sonor" element={<PageTransition><Sonor /></PageTransition>} />
        <Route path="/case-study/wttj" element={<PageTransition><WTTJCaseStudy /></PageTransition>} />
        <Route path="/cases/wttj" element={<PageTransition><WTTJCaseStudy /></PageTransition>} />
        <Route path="/case-study/wttj-conversion-seniors" element={<PageTransition><WTTJCaseStudy /></PageTransition>} />
        <Route path="/case-study/agentic-evaluation" element={<PageTransition><AgentsEval /></PageTransition>} />
        <Route path="/case-study/agents-eval" element={<PageTransition><AgentsEval /></PageTransition>} />
        <Route path="/case-study/fb-agent" element={<PageTransition><FBAgentCaseStudy /></PageTransition>} />
        <Route path="/case-study/f-and-b-agent" element={<PageTransition><FBAgentCaseStudy /></PageTransition>} />
        <Route path="/resource-library" element={<PageTransition><ResourceLibrary /></PageTransition>} />
        <Route path="/cv" element={<PageTransition><CVPage /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

// Portfolio app
const App = () => {
  const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <HighContrastProvider>
          <LanguageProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <CustomCursor />
            <BrowserRouter>
            <ScrollToTop />
            <WelcomeBackToast />
            <KeyboardShortcuts onHelpToggle={() => setIsKeyboardHelpOpen(!isKeyboardHelpOpen)} />
            <KeyboardShortcutsHelp 
              isOpen={isKeyboardHelpOpen} 
              onClose={() => setIsKeyboardHelpOpen(false)} 
            />
            <FeedbackWidget
              provider={{ type: "form", url: "https://formspree.io/f/mqaywvpg" }}
              includeMeta={true}
              nudge={{ enabled: true, delayMs: 25000, scrollPct: 0.8, exitIntent: false }}
            />
            <AnimatedRoutes onKeyboardHelpToggle={() => setIsKeyboardHelpOpen(!isKeyboardHelpOpen)} />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
      </HighContrastProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
