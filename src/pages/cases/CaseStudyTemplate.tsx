/**
 * =============================================================================
 * CASE STUDY TEMPLATE - Reference Implementation
 * =============================================================================
 * 
 * This file serves as the default template for all new case studies.
 * Copy this file and customize the content for each new project.
 * 
 * STRUCTURE (in order):
 * 1. Hero (image + title + tech stack icons)
 * 2.1 Sidebar Project Info (sticky on desktop)
 * 2.2 TL;DR (4-6 key points, scannable)
 * 3. Context & Problem (200-300 words) - PRIORITY SECTION
 * 4. My Role & Approach (150-200 words)
 * 5. Process & Key Decisions (4-6 phases timeline)
 * 6. Solution & Deliverables (300-400 words + visuals) - 2ND PRIORITY
 * [CTA Banner - mid-page]
 * 7. Impact (quantitative + qualitative metrics)
 * 8. Conclusion & Learnings (3-4 insights)
 * 9. Go Further (links, acknowledgments)
 * [Final CTA Contact]
 * 
 * DESIGN RULES:
 * - No emojis
 * - Professional, clean, scannable
 * - Consistent spacing (mb-16 between sections)
 * - WCAG AA accessibility (4.5:1 contrast minimum)
 * - --contact-green (#065f46) ONLY for Contact CTAs
 * - ProgressIndicator required
 * - Lighthouse score > 90
 * 
 * UX STANDARDS (applied globally via shared components):
 * - Hero overlay: bg-black/60 for optimal text contrast
 * - Smooth scroll: html { scroll-behavior: smooth } (index.css)
 * - Scroll offset: [id] { scroll-margin-top: 100px } for sticky navbar
 * - Preload critical images in index.html for faster LCP
 * - Animations: GPU-accelerated (transform, opacity only)
 * 
 * =============================================================================
 */

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/footer';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { CaseStudySidebar } from '@/components/case-study/CaseStudySidebar';
import { CaseStudyTLDR } from '@/components/case-study/CaseStudyTLDR';
import { TimelinePhase, TimelineContainer } from '@/components/case-study/TimelinePhase';
import { KeyLearning, KeyLearningsGrid } from '@/components/case-study/KeyLearning';
import { CaseImage } from '@/components/case/CaseImage';
import { ScrollRevealSection, StaggerList, StaggerItem, SectionTransition } from '@/components/case';
import { ImageLightbox } from '@/components/ImageLightbox';
import { ExternalLink, Mail, Linkedin, Calendar } from 'lucide-react';
import { SOCIAL_LINKS } from '@/site.config';

// =============================================================================
// CONFIGURATION - Customize these values for each case study
// =============================================================================

const CONFIG = {
  // Hero Section
  hero: {
    title: 'Your Case Study Title',
    subtitle: 'Optional subtitle describing the project in one line',
    backgroundImage: undefined, // Import and use: import heroImage from '@/assets/your-hero.png';
    tools: [
      // Add your tech stack icons
      { name: 'Figma', icon: '/img/figma-icon.svg' },
      { name: 'Notion', icon: '/img/notion-icon.png' },
      // Add more tools as needed
    ],
  },

  // Sidebar Project Info
  sidebar: {
    role: 'Product Manager',
    duration: 'X months (Year)',
    team: 'Team composition',
    client: 'Client name',
    industry: 'Industry / Domain',
    context: 'Project context',
  },

  // TL;DR Items (4-6 points, scannable)
  tldr: {
    items: [
      { label: 'Context', content: 'Brief project context (1-2 sentences)' },
      { label: 'Challenge', content: 'The core problem to solve' },
      { label: 'Solution', content: 'High-level solution approach' },
      { label: 'My Role', content: 'Your specific contribution' },
      { label: 'Impact', content: 'Key results achieved' },
      // Optional 6th item for constraints
      // { label: 'Constraints', content: 'Key limitations faced' },
    ],
    disclaimer: undefined, // Optional: { type: 'academic' | 'confidential', message: '...' }
    accentColor: 'blue' as const, // 'blue' | 'orange' | 'green' | 'purple'
  },

  // Progress Indicator Sections
  sections: [
    { id: 'context-problem', label: '1. Context' },
    { id: 'role-approach', label: '2. Role' },
    { id: 'process', label: '3. Process' },
    { id: 'solution', label: '4. Solution' },
    { id: 'impact', label: '5. Impact' },
    { id: 'learnings', label: '6. Learnings' },
    { id: 'faq', label: '7. FAQ' },
    { id: 'go-further', label: '8. More' },
  ],

  // Images for Lightbox
  lightboxImages: [
    // { src: '/path/to/image.png', alt: 'Description', caption: 'Caption text' },
  ],
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function CaseStudyTemplate() {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const images = CONFIG.lightboxImages;
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      navigate('/');
    } else if (id === 'contact') {
      navigate('/#contact');
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-hidden" role="main">
      <Navigation />
      {/* <ProgressIndicator sections={CONFIG.sections} /> */}

      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-16">
        {/* ================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ================================================================= */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="hidden lg:block" /> {/* Spacer for alignment */}
          <div className="lg:col-start-2 mb-4">
            <CaseStudyHero
              title={CONFIG.hero.title}
              subtitle={CONFIG.hero.subtitle}
              backgroundImage={CONFIG.hero.backgroundImage}
              tools={CONFIG.hero.tools}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* =============================================================== */}
          {/* 2.1 SIDEBAR - Project Info (sticky on desktop) */}
          {/* =============================================================== */}
          <CaseStudySidebar {...CONFIG.sidebar} />

          {/* Main Content */}
          <main>
            {/* ============================================================= */}
            {/* 2.2 TL;DR - Executive Summary (scannable) */}
            {/* ============================================================= */}
            <section className="mb-16">
              <CaseStudyTLDR
                items={CONFIG.tldr.items}
                disclaimer={CONFIG.tldr.disclaimer}
                accentColor={CONFIG.tldr.accentColor}
              />
            </section>

            {/* ============================================================= */}
            {/* 3. CONTEXT & PROBLEM - PRIORITY SECTION (200-300 words) */}
            {/* ============================================================= */}
            <SectionTransition id="context-problem">
              <div className="mb-16" aria-labelledby="context-problem-heading">
                <ScrollRevealSection variant="fade-in-up">
                  <h2 id="context-problem-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    1. Context & Problem
                  </h2>
                </ScrollRevealSection>

                <ScrollRevealSection variant="fade-in-up" delay={0.1}>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">The Challenge</h3>
                    <p className="text-base text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                      {/* 100-150 words describing the problem */}
                      Describe the business context and the core problem you were asked to solve.
                      Include relevant metrics or data points that quantify the problem.
                    </p>

                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Why It Matters</h3>
                    <StaggerList className="space-y-2 text-base text-gray-800 dark:text-gray-200 mb-8 list-none">
                      <StaggerItem>
                        <li className="flex items-start">
                          <span className="text-gray-900 dark:text-gray-100 mr-3 mt-1 font-bold" aria-hidden="true">•</span>
                          <span>Business impact point 1</span>
                        </li>
                      </StaggerItem>
                      <StaggerItem>
                        <li className="flex items-start">
                          <span className="text-gray-900 dark:text-gray-100 mr-3 mt-1 font-bold" aria-hidden="true">•</span>
                          <span>Business impact point 2</span>
                        </li>
                      </StaggerItem>
                      <StaggerItem>
                        <li className="flex items-start">
                          <span className="text-gray-900 dark:text-gray-100 mr-3 mt-1 font-bold" aria-hidden="true">•</span>
                          <span>Business impact point 3</span>
                        </li>
                      </StaggerItem>
                    </StaggerList>
                  </div>
                </ScrollRevealSection>

                {/* Context Image - Optional */}
                {/* 
                <div className="mb-8 max-w-xl mx-auto">
                  <CaseImage
                    alt="Descriptive alt text"
                    desktopSrc="/path/to/image.png"
                    caption="Caption describing the image"
                    onClick={() => openLightbox(0)}
                  />
                </div>
                */}
              </div>
            </SectionTransition>

            {/* ============================================================= */}
            {/* 4. MY ROLE & APPROACH (150-200 words) */}
            {/* ============================================================= */}
            <SectionTransition id="role-approach">
              <div className="mb-16" aria-labelledby="role-approach-heading">
                <ScrollRevealSection variant="fade-in-up">
                  <h2 id="role-approach-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    2. My Role & Approach
                  </h2>
                </ScrollRevealSection>

                <ScrollRevealSection variant="fade-in-up" delay={0.1}>
                  <div className="mb-8">
                    <p className="text-base text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                      {/* Describe your specific role, responsibilities, and approach */}
                      As [role], I was responsible for [key responsibilities].
                      My approach focused on [methodology/framework used].
                    </p>

                    {/* Key contributions */}
                    <StaggerList className="grid md:grid-cols-2 gap-6">
                      <StaggerItem variant="scale-in">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Discovery & Research</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">User interviews, data analysis, stakeholder alignment</p>
                        </div>
                      </StaggerItem>
                      <StaggerItem variant="scale-in">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Stakeholder Management</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Cross-functional collaboration, executive buy-in</p>
                        </div>
                      </StaggerItem>
                    </StaggerList>
                  </div>
                </ScrollRevealSection>
              </div>
            </SectionTransition>

            {/* ============================================================= */}
            {/* 5. PROCESS & KEY DECISIONS (4-6 phases) */}
            {/* ============================================================= */}
            <section className="mb-16" id="process" aria-labelledby="process-heading">
              <h2 id="process-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                3. Process & Key Decisions
              </h2>

              <TimelineContainer>
                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">1</span>}
                  phase="Discovery"
                  description="Understanding the problem space"
                  bullets={[
                    'Activity 1',
                    'Activity 2',
                    'Activity 3',
                  ]}
                  metric={{ label: 'Key Insight', value: 'Main discovery insight' }}
                  index={0}
                />

                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">2</span>}
                  phase="Analysis"
                  description="Synthesizing findings"
                  bullets={[
                    'Activity 1',
                    'Activity 2',
                  ]}
                  index={1}
                />

                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">3</span>}
                  phase="Ideation"
                  description="Generating solutions"
                  bullets={[
                    'Activity 1',
                    'Activity 2',
                  ]}
                  metric={{ label: 'Decision', value: 'Key decision made' }}
                  index={2}
                />

                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">4</span>}
                  phase="Validation"
                  description="Testing and iterating"
                  bullets={[
                    'Activity 1',
                    'Activity 2',
                  ]}
                  index={3}
                />
              </TimelineContainer>
            </section>

            {/* ============================================================= */}
            {/* 6. SOLUTION & DELIVERABLES - 2ND PRIORITY (300-400 words) */}
            {/* ============================================================= */}
            <SectionTransition id="solution">
              <div className="mb-16" aria-labelledby="solution-heading">
                <ScrollRevealSection variant="fade-in-up">
                  <h2 id="solution-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    4. Solution & Deliverables
                  </h2>
                </ScrollRevealSection>

                <ScrollRevealSection variant="fade-in-up" delay={0.1}>
                  <div className="mb-8">
                    <p className="text-base text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                      {/* Describe the solution in detail */}
                      Based on our research and analysis, we developed [solution name/type].
                      The key features include...
                    </p>

                    {/* Key Features Grid */}
                    <StaggerList className="grid md:grid-cols-3 gap-4 mb-8">
                      <StaggerItem variant="scale-in">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Feature 1</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Brief description</p>
                        </div>
                      </StaggerItem>
                      <StaggerItem variant="scale-in">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Feature 2</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Brief description</p>
                        </div>
                      </StaggerItem>
                      <StaggerItem variant="scale-in">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Feature 3</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Brief description</p>
                        </div>
                      </StaggerItem>
                    </StaggerList>
                  </div>
                </ScrollRevealSection>

              {/* Prototype/Deliverable Image - Make prominent */}
              {/*
              <div className="mb-8">
                <a
                  href="https://your-prototype-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <CaseImage
                    alt="Interactive prototype preview"
                    desktopSrc="/path/to/prototype-image.png"
                    caption="Click to view interactive prototype"
                  />
                </a>
              </div>
              */}
              </div>
            </SectionTransition>

            {/* ============================================================= */}
            {/* MID-PAGE CTA BANNER */}
            {/* Uses --contact-green (#065f46) for Contact-related elements */}
            {/* ============================================================= */}
            <section className="mb-16 py-8 px-6 bg-[#065f46]/10 dark:bg-[#065f46]/20 rounded-2xl border border-[#065f46]/20">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Questions about this project?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Feel free to reach out for more details or template improvements.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={SOCIAL_LINKS.mail.href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#065f46] text-white rounded-lg hover:bg-[#065f46]/90 transition-colors"
                    aria-label="Send email"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#065f46] text-[#065f46] dark:text-[#10b981] rounded-lg hover:bg-[#065f46]/10 transition-colors"
                    aria-label="Visit LinkedIn profile"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={SOCIAL_LINKS.calendar.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#065f46] text-[#065f46] dark:text-[#10b981] rounded-lg hover:bg-[#065f46]/10 transition-colors"
                    aria-label="Schedule a meeting"
                  >
                    <Calendar className="w-4 h-4" />
                    Calendar
                  </a>
                </div>
              </div>
            </section>

            {/* ============================================================= */}
            {/* 7. IMPACT - Metrics (quantitative + qualitative) */}
            {/* ============================================================= */}
            <section className="mb-16" id="impact" aria-labelledby="impact-heading">
              <h2 id="impact-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                5. Impact
              </h2>

              {/* Quantitative Metrics */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">+XX%</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Metric description</div>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">XX</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Metric description</div>
                </div>
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">XXx</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Metric description</div>
                </div>
              </div>

              {/* Qualitative Impact */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Qualitative Outcomes</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-gray-900 dark:text-gray-100 mr-3 font-bold" aria-hidden="true">•</span>
                    Qualitative outcome 1
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 dark:text-gray-100 mr-3 font-bold" aria-hidden="true">•</span>
                    Qualitative outcome 2
                  </li>
                </ul>
              </div>
            </section>

            {/* ============================================================= */}
            {/* 8. CONCLUSION & LEARNINGS (3-4 insights) */}
            {/* ============================================================= */}
            <section className="mb-16" id="learnings" aria-labelledby="learnings-heading">
              <h2 id="learnings-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                6. Key Learnings
              </h2>

              <KeyLearningsGrid>
                <KeyLearning
                  title="Learning 1"
                  description="What you learned and how it applies to future projects."
                  color="blue"
                />
                <KeyLearning
                  title="Learning 2"
                  description="What you learned and how it applies to future projects."
                  color="orange"
                />
                <KeyLearning
                  title="Learning 3"
                  description="What you learned and how it applies to future projects."
                  color="green"
                />
              </KeyLearningsGrid>
            </section>

            {/* ============================================================= */}
            {/* 9. FAQ (optional, before final CTA) */}
            {/* ============================================================= */}
            {/*
            <section className="mb-16" id="faq" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                7. Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                // Add expandable FAQ items here using ExpandSection component
                // Import: import { ExpandSection } from './Sonor_Composants';
              </div>
            </section>
            */}

            {/* ============================================================= */}
            {/* 10. GO FURTHER (links, acknowledgments) */}
            {/* ============================================================= */}
            <section className="mb-16" id="go-further" aria-labelledby="go-further-heading">
              <h2 id="go-further-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                8. Go Further
              </h2>

              {/* Related Links */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Related Resource 1
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Brief description of the resource</p>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Related Resource 2
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Brief description of the resource</p>
                </a>
              </div>

              {/* Acknowledgments - Optional */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Acknowledgments</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Special thanks to [team members, mentors, collaborators] for their contributions to this project.
                </p>
              </div>
            </section>

            {/* ============================================================= */}
            {/* FINAL CTA - Contact */}
            {/* Uses --contact-green (#065f46) */}
            {/* ============================================================= */}
            <aside
              className="py-12 px-8 bg-[#065f46] rounded-2xl text-center"
              aria-label="Contact"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Interested in working together?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new projects, product challenges, or opportunities to collaborate.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.mail.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#065f46] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  aria-label="Send email"
                >
                  <Mail className="w-5 h-5" />
                  Email me
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.calendar.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                  aria-label="Schedule a meeting"
                >
                  <Calendar className="w-5 h-5" />
                  Book a call
                </a>
              </div>
            </aside>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer
        siteName="Ivan de Murard"
        tagline="Product Manager building user-centered experiences"
        sections={[{ id: 'home', label: 'Back to Portfolio' }]}
        onSectionClick={scrollToSection}
        className="mt-16"
      />

      {/* Lightbox for Images */}
      {CONFIG.lightboxImages.length > 0 && (
        <ImageLightbox
          images={CONFIG.lightboxImages}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

/**
 * =============================================================================
 * CHECKLIST BEFORE PUBLISHING
 * =============================================================================
 * 
 * ACCESSIBILITY:
 * [ ] Alt text on ALL images
 * [ ] Contrast ratio WCAG AA (4.5:1 minimum)
 * [ ] Keyboard navigation functional
 * [ ] Aria labels on interactive components
 * [ ] Focus states visible
 * 
 * PERFORMANCE:
 * [ ] Images lazy-loaded
 * [ ] Animations GPU-accelerated
 * [ ] Lighthouse score > 90
 * 
 * DESIGN:
 * [ ] No emojis
 * [ ] Professional appearance
 * [ ] Consistent spacing (mb-16 between sections)
 * [ ] Typography hierarchy consistent
 * [ ] Dark mode fully supported
 * 
 * CONTENT:
 * [ ] TL;DR scannable in <30 seconds
 * [ ] Context & Problem clear and quantified
 * [ ] My Role clearly defined
 * [ ] Process shows PM methodology
 * [ ] Solution includes visuals
 * [ ] Impact has metrics
 * [ ] Learnings are actionable
 * 
 * =============================================================================
 */
