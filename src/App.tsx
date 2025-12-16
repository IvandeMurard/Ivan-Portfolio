import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HighContrastProvider } from "@/contexts/HighContrastContext";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { Home } from "./pages/Home";
import Sonor from "./pages/Sonor";
import WTTJCaseStudy from "./pages/cases/wttj-case-study";
import AgentsEval from "./pages/cases/AgentsEval";
import ResourceLibrary from "./pages/ResourceLibrary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Portfolio app
const App = () => {
  const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <HighContrastProvider>
          <LanguageProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <ScrollToTop />
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
            <Routes>
              <Route path="/" element={<Home onKeyboardHelpToggle={() => setIsKeyboardHelpOpen(!isKeyboardHelpOpen)} />} />
              <Route path="/case-study/sonor" element={<Sonor />} />
              <Route path="/case-study/wttj" element={<WTTJCaseStudy />} />
              <Route path="/cases/wttj" element={<WTTJCaseStudy />} />
              <Route path="/case-study/wttj-conversion-seniors" element={<WTTJCaseStudy />} />
              <Route path="/case-study/agentic-evaluation" element={<AgentsEval />} />
              <Route path="/case-study/agents-eval" element={<AgentsEval />} />
              <Route path="/resource-library" element={<ResourceLibrary />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
      </HighContrastProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
