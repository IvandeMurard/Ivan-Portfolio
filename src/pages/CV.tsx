import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Calendar, MapPin, Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { continuousLearning } from "@/data/continuousLearning";
import { cvContact, cvSkills, cvSideProjects, cvTagline } from "@/data/cv";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/TextReveal";

const PDF_URL = "/cv/CV_Ivan_de_Murard_Product_Manager.pdf";

const labels = {
  en: {
    back: "Back to portfolio",
    download: "Download PDF",
    experience: "Experience",
    skills: "Skills",
    education: "Education & Learning",
    sideProjects: "Side Projects & Volunteering",
  },
  fr: {
    back: "Retour au portfolio",
    download: "Télécharger le PDF",
    experience: "Expériences",
    skills: "Compétences",
    education: "Formation & Apprentissage continu",
    sideProjects: "Side Projects & Engagements",
  },
};

export default function CVPage() {
  const { language } = useLanguage();
  const t = labels[language];
  const isFr = language === "fr";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            {t.back}
          </Link>
          <a
            href={PDF_URL}
            download
            className="flex items-center gap-2 rounded-full bg-[hsl(var(--contact))] text-[hsl(var(--contact-foreground))] px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download size={16} />
            {t.download}
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* ───── Hero ───── */}
        <ScrollReveal>
          <section className="space-y-4">
            <TextReveal as="h1" className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Ivan de Murard
            </TextReveal>
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
              Product Manager
            </p>
            <p className="text-base text-muted-foreground max-w-xl">
              {isFr ? cvTagline.fr : cvTagline.en}
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
              <a href={`mailto:${cvContact.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail size={14} /> {cvContact.email}
              </a>
              <a href={cvContact.calendar} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Calendar size={14} /> {isFr ? "Prendre RDV" : "Book a call"}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {cvContact.location}
              </span>
              <a
                href={cvContact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#0A66C2] transition-colors"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                href="https://github.com/ivandemurard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
              >
                <Github size={14} /> GitHub
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* ───── Experiences ───── */}
        <section>
          <ScrollReveal>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              {t.experience}
            </h2>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="space-y-10">
            {experiences.map((exp, i) => (
              <StaggerItem key={i}>
                <div className="group relative pl-6 border-l-2 border-border hover:border-[hsl(var(--contact))] transition-colors">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-border group-hover:bg-[hsl(var(--contact))] transition-colors" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-lg font-bold text-foreground">
                      {isFr ? exp.title_fr : exp.title_en}
                    </h3>
                    <span className="text-sm text-muted-foreground shrink-0">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[hsl(var(--contact))]">
                    {exp.company}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isFr ? exp.description_fr : exp.description_en}
                  </p>
                  {(isFr ? exp.details_fr : exp.details_en)?.map((d, j) => (
                    <p key={j} className="text-sm text-muted-foreground pl-3 before:content-['–'] before:mr-1.5">
                      {d}
                    </p>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ───── Skills ───── */}
        <section>
          <ScrollReveal>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              {t.skills}
            </h2>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cvSkills.map((cat, i) => (
              <StaggerItem key={i}>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {isFr ? cat.label_fr : cat.label_en}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ───── Education ───── */}
        <section>
          <ScrollReveal>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              {t.education}
            </h2>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="space-y-6">
            {/* Continuous learning first (most recent) */}
            {continuousLearning.map((cl, i) => (
              <StaggerItem key={`cl-${i}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-sm text-muted-foreground shrink-0 w-12">{cl.year}</span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {isFr ? cl.title_fr : cl.title_en}
                    </h3>
                    <p className="text-sm text-[hsl(var(--contact))]">{cl.source}</p>
                    <p className="text-sm text-muted-foreground">
                      {isFr ? cl.description_fr : cl.description_en}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* Formal education */}
            {education.map((edu, i) => (
              <StaggerItem key={`edu-${i}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-sm text-muted-foreground shrink-0 w-12">{edu.year}</span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {isFr ? edu.title_fr : edu.title_en}
                    </h3>
                    <p className="text-sm text-[hsl(var(--contact))]">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">
                      {isFr ? edu.description_fr : edu.description_en}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ───── Side Projects ───── */}
        <section>
          <ScrollReveal>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              {t.sideProjects}
            </h2>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cvSideProjects.map((sp, i) => (
              <StaggerItem key={i}>
                <div className="rounded-xl border border-border p-5 hover:border-[hsl(var(--contact))] hover:shadow-md transition-all space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-foreground">
                      {isFr ? sp.title_fr : sp.title_en}
                    </h3>
                    {sp.year && (
                      <span className="text-xs text-muted-foreground">{sp.year}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isFr ? sp.description_fr : sp.description_en}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ivan de Murard
      </footer>
    </div>
  );
}
