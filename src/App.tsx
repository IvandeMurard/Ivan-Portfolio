import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { Home } from "./pages/Home";
import Sonor from "./pages/Sonor";
import Wttj from "./pages/cases/Wttj";
import WttjDefaultCase from "./pages/cases/wttj-default";
import AgentsEval from "./pages/cases/AgentsEval";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Portfolio app
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <FeedbackWidget
              provider={{ type: "form", url: "https://formspree.io/f/mqaywvpg" }}
              includeMeta={true}
              nudge={{ enabled: true, delayMs: 25000, scrollPct: 0.8, exitIntent: false }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study/sonor" element={<Sonor />} />
              <Route path="/cases/wttj" element={<Wttj />} />
              <Route path="/case-study/wttj-conversion-seniors" element={<Wttj />} />
              <Route path="/case-study/agents-eval" element={<AgentsEval />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
