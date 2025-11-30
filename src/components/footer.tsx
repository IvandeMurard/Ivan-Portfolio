import * as React from "react";
import { Mail, Calendar, Linkedin, MessageCircle } from "lucide-react";
import { SITE, SOCIAL_LINKS, type SocialKey } from "@/site.config";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  siteName?: string;
  tagline?: string;
  sections: Array<{ id: string; label: string }>;
  onSectionClick?: (sectionId: string) => void;
  className?: string;
};

const ICONS: Record<Exclude<SocialKey, "x">, React.ComponentType<any>> = {
  mail: Mail,
  calendar: Calendar,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
};

export function Footer({
  siteName = SITE.name,
  tagline = SITE.tagline,
  sections,
  onSectionClick,
  className = "",
}: Props) {
  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);
  const { language } = useLanguage();

  const footerLabels = {
    en: { navigation: "Navigation", connect: "Connect", allRights: "All rights reserved", madeWith: "Made with care" },
    fr: { navigation: "Navigation", connect: "Se connecter", allRights: "Tous droits réservés", madeWith: "Fait avec soin" }
  };
  const labels = footerLabels[language];

  // Aligne l'ordre d’affichage et mappe les métadonnées depuis la config
  const socialOrder: SocialKey[] = ["mail", "calendar", "linkedin", "whatsapp", "x"];
  const socialItems = socialOrder
    .map((id) => ({ id, ...SOCIAL_LINKS[id] }))
    .filter((s) => Boolean(s.href));

  return (
    <footer className={["w-full bg-[#0B1220] text-white", className].join(" ")}>
      <div className="w-full px-6 md:px-12 lg:px-16 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Column 1: Name & Tagline */}
          <div>
            <h3 className="text-[20px] font-[700] text-white mb-2">{siteName}</h3>
            <p className="text-[14px] font-[400] leading-[1.6] text-white/70">
              {tagline}
            </p>
          </div>

          {/* Column 2: Sections - Split into 2 columns */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[13px] font-[600] tracking-[0.15em] uppercase text-white/60 mb-4">
                {labels.navigation}
              </h4>
              <nav className="space-y-2">
                {sections.slice(0, Math.ceil(sections.length / 2)).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onSectionClick?.(section.id)}
                    className="block text-[15px] font-[400] text-white/80 hover:text-[#065f46] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-[13px] font-[600] tracking-[0.15em] uppercase text-white/60 mb-4">
                &nbsp;
              </h4>
              <nav className="space-y-2">
                {sections.slice(Math.ceil(sections.length / 2)).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onSectionClick?.(section.id)}
                    className="block text-[15px] font-[400] text-white/80 hover:text-[#065f46] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 4: Social Icons + Tooltips */}
          <div>
            <h4 className="text-[13px] font-[600] tracking-[0.15em] uppercase text-white/60 mb-4">
              {labels.connect}
            </h4>

            <div className="flex items-center gap-4">
              {socialItems.map((social) => {
                const isX = social.id === "x";
                const Icon = !isX ? ICONS[social.id as Exclude<SocialKey, "x">] : null;

                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group outline-none"
                    onMouseEnter={() => setHoveredIcon(social.id)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    aria-label={social.label}
                    title={social.label}
                  >
                    {/* Icon */}
                    {!isX ? (
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={[
                          "transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                          hoveredIcon === social.id
                            ? "text-[#065f46]"
                            : "text-white/70",
                        ].join(" ")}
                      />
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={[
                          "transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                          hoveredIcon === "x" ? "stroke-[#065f46]" : "stroke-white/70",
                        ].join(" ")}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                        <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
                      </svg>
                    )}

                    {/* Tooltip (pure CSS: hover + focus-visible) */}
                    <span
                      className={[
                        "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2",
                        "rounded-md bg-white/10 px-2 py-1 text-[11px] text-white",
                        "opacity-0 shadow-lg backdrop-blur-md ring-1 ring-white/15",
                        "transition-opacity duration-200",
                        "group-hover:opacity-100 group-focus-visible:opacity-100",
                        "whitespace-nowrap",
                      ].join(" ")}
                      role="tooltip"
                    >
                      {social.label}
                      {/* petit caret */}
                      <span
                        className="absolute left-1/2 top-full -translate-x-1/2 h-2 w-2 rotate-45 bg-white/10 ring-1 ring-white/15"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-white/20 mb-6" />

        {/* Copyright */}
        <div className="text-center md:text-left">
          <p className="text-[13px] font-[400] text-white/60 leading-[1.6]">
            © {new Date().getFullYear()} {siteName}. {labels.allRights}.
            <br className="md:hidden" />
            <span className="hidden md:inline"> • </span>
            {labels.madeWith}.
          </p>
        </div>
      </div>
    </footer>
  );
}
