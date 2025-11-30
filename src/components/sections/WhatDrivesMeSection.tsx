import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComingSoonBadge } from "@/components/ComingSoonBadge";

interface WhatDrivesMeSectionProps {
  disableSticky?: boolean;
}

export function WhatDrivesMeSection({ disableSticky = false }: WhatDrivesMeSectionProps) {
  const { language } = useLanguage();

  const sectionTitle = language === 'fr' 
    ? "Ce qui me motive"
    : "What Drives Me";

  return (
    <section id="resources" className="py-24 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={sectionTitle}
          alignment="left"
          className="mb-8"
        />

        {/* Coming Soon Content */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ComingSoonBadge />
        </div>
      </div>
    </section>
  );
}

export default WhatDrivesMeSection;

