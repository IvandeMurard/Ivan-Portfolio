import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { useTools } from "@/hooks/useResources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { ToolSuggestionModal } from "./ToolSuggestionModal";
import { useLanguage } from "@/contexts/LanguageContext";

export function ToolsTable() {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  
  const { data: tools, isLoading } = useTools();
  const { language } = useLanguage();

  const translations = {
    title: language === 'fr' ? '🧰 Outils' : '🧰 Tools',
    description: language === 'fr' 
      ? 'Les outils et systèmes qui façonnent ma façon de construire.'
      : 'The tools and systems that shape how I build.',
    viewTable: language === 'fr' ? '📊 Tableau' : '📊 Table',
    viewCards: language === 'fr' ? '🗂️ Cartes' : '🗂️ Cards',
    searchPlaceholder: language === 'fr' ? 'Rechercher un outil...' : 'Search for a tool...',
    headerLogo: 'Logo',
    headerName: language === 'fr' ? 'Nom' : 'Name',
    headerType: 'Type',
    headerContext: language === 'fr' ? 'Contexte' : 'Context',
    headerFeedback: 'Feedback',
    headerUrl: 'URL',
    headerReferralLink: language === 'fr' ? 'Lien partenaire' : 'Referral Link',
    ctaText: language === 'fr' 
      ? 'Un produit que je devrais essayer ?' 
      : 'Thinking of a product I should try?',
    ctaButton: language === 'fr' ? 'Faites-le moi savoir 💬' : 'Let me know 💬',
    loading: language === 'fr' ? 'Chargement des outils...' : 'Loading tools...',
    scrollHint: language === 'fr' ? '↓ Plus d\'outils' : '↓ More tools',
  };

  // Auto-reveal: scroll 8px → 0 (once on mount)
  useEffect(() => {
    if (!tableRef.current || !tools?.length) return;
    
    const timer = setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollTop = 8;
        setTimeout(() => {
          if (tableRef.current) tableRef.current.scrollTop = 0;
        }, 300);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [tools]);

  // Hide scroll-hint after 2s
  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-[900px] mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">{translations.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">{translations.title}</h3>
          <p className="text-sm text-muted-foreground">
            {translations.description}
          </p>
        </div>
        
        {/* View buttons */}
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-accent/10 text-accent"
          >
            {translations.viewTable}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            disabled 
            className="opacity-50 cursor-not-allowed"
          >
            {translations.viewCards}
          </Button>
        </div>
      </div>

      {/* Search bar (V2 - UI only) */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={translations.searchPlaceholder}
          className="pl-9 bg-background/60 backdrop-blur-sm border-border/40"
          disabled
        />
      </div>

      {/* Table Container with scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative"
      >
        <div
          ref={tableRef}
          className="max-h-[400px] overflow-y-auto rounded-xl border border-border/30 bg-background/40 backdrop-blur-md relative"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <table className="w-full">
            <thead className="sticky top-0 bg-background/95 backdrop-blur-md z-10 border-b border-border/20">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 w-12">
                  {translations.headerLogo}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  {translations.headerName}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  {translations.headerType}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  {translations.headerContext}
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  {translations.headerFeedback}
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 w-12">
                  {translations.headerUrl}
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 w-16">
                  {translations.headerReferralLink}
                </th>
              </tr>
            </thead>
            
            <tbody>
              {tools?.map((tool, idx) => (
                <motion.tr
                  key={tool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="
                    border-b border-border/10 
                    even:bg-background/40 
                    hover:bg-accent/10 hover:shadow-md 
                    transition-all ease-out duration-300
                    group
                    focus-within:ring-2 focus-within:ring-accent/50
                  "
                >
                  {/* Logo */}
                  <td className="px-4 py-3">
                    <img 
                      src={tool.logo_url || "/placeholder.svg"} 
                      alt={tool.name}
                      className="w-8 h-8 rounded object-contain"
                    />
                  </td>
                  
                  {/* Name */}
                  <td className="px-4 py-3 font-medium">
                    {tool.name}
                  </td>
                  
                  {/* Type (badge) */}
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-muted/40 text-xs px-2 py-0.5">
                      {tool.tool_type}
                    </span>
                  </td>
                  
                  {/* Context (badge) */}
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-muted/40 text-xs px-2 py-0.5">
                      {tool.category}
                    </span>
                  </td>
                  
                  {/* Feedback (truncated + tooltip) */}
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px]">
                    {tool.description_long ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="truncate block cursor-help">
                              {tool.description_long}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tool.description_long}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </td>
                  
                  {/* URL */}
                  <td className="px-4 py-3 text-center">
                    {tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent/20 transition-colors"
                        aria-label={`Visit ${tool.name} website`}
                      >
                        <ExternalLink className="h-4 w-4 text-accent" />
                      </a>
                    )}
                  </td>

                  {/* Referral Link */}
                  <td className="px-4 py-3 text-center">
                    {tool.referral_link ? (
                      <a
                        href={tool.referral_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent/20 transition-colors"
                        aria-label={`Open ${tool.name} referral link`}
                      >
                        <span className="text-lg">🔗</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Scroll hint (fade out after 2s) */}
        {showScrollHint && tools && tools.length > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground flex items-center gap-1 pointer-events-none"
          >
            {translations.scrollHint}
          </motion.div>
        )}
      </motion.div>

      {/* Footer CTA - Enhanced */}
      <div className="bg-muted/30 rounded-lg p-6 mt-6 text-center space-y-3">
        <p className="text-base text-muted-foreground italic font-medium animate-pulse">
          {translations.ctaText}
        </p>
        <Button
          variant="outline"
          size="default"
          onClick={() => setModalOpen(true)}
          className="
            rounded-full backdrop-blur-md border-border/40 
            hover:bg-accent hover:text-accent-foreground hover:border-accent
            hover:scale-110 transition-all duration-300
            shadow-sm hover:shadow-lg
          "
        >
          {translations.ctaButton}
        </Button>
      </div>

      {/* Modal */}
      <ToolSuggestionModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </div>
  );
}
