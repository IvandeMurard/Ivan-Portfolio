/**
 * Welcome to the Jungle Case Study - Professional Template Implementation
 * Accessible, professional design with all original images
 */

import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/footer';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { CaseStudySidebar } from '@/components/case-study/CaseStudySidebar';
import { CaseStudyTLDR } from '@/components/case-study/CaseStudyTLDR';
import { TimelinePhase, TimelineContainer } from '@/components/case-study/TimelinePhase';
import { KeyLearning, KeyLearningsGrid } from '@/components/case-study/KeyLearning';
import { useState } from 'react';
import { CaseImage } from '@/components/case/CaseImage';
import { ExternalLink, Mail, Linkedin, Calendar } from 'lucide-react';
import { ImageLightbox } from '@/components/ImageLightbox';
import { SOCIAL_LINKS } from '@/site.config';
import wttjHero from '@/assets/wttj-hero.png';
import wttjLogo from '@/assets/wttj-logo.svg';

export default function WTTJCaseStudy() {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Toutes les images pour la lightbox (sauf la première de Context & Problem)
  const lightboxImages = [
    // Section 2: Discovery
    { src: '/WTTJ/jtbd-desktop.png', alt: 'JTBD and key verbatims from user interviews', caption: 'JTBD and key verbatims' },
    { src: '/WTTJ/etude_de_cas_p31_desktop.png', alt: 'User journey mapping for senior profiles', caption: 'User journey mapping' },
    // Section 3: Strategic Pivot
    { src: '/WTTJ/pivot-desktop.png', alt: 'Strategic pivot analysis showing target segment selection', caption: 'Strategic pivot: Focus on tech seniors 5-8 years' },
    // Section 5: Solution & Prototype
    { src: '/WTTJ/tests-desktop.png', alt: 'User testing results and feedback', caption: 'User testing results' },
    { src: '/WTTJ/go-to-market-desktop.png', alt: 'Go to market strategy', caption: 'Go to market strategy' },
    { src: '/WTTJ/risques-desktop.png', alt: 'Risk matrix and mitigation strategies', caption: 'Risk matrix and mitigation strategies' },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1));
    } else {
      setCurrentImageIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0));
    }
  };

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      navigate('/');
    } else if (id === 'contact') {
      navigate('/#contact');
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="overflow-x-hidden" role="main">
      <Navigation />

      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar - Empty space for alignment */}
          <div className="hidden lg:block"></div>

          {/* Hero Section - Aligned with TL;DR */}
          <div className="lg:col-start-2 mb-4">
            <CaseStudyHero
              title="Increasing senior-candidate conversion on WTTJ"
              backgroundImage={wttjHero}
              tools={[
                { name: 'Slack', icon: '/img/slack-icon.svg' },
                { name: 'Notion', icon: '/img/notion-icon.png' },
                { name: 'Figma', icon: '/img/figma-icon.svg' },
                { name: 'Miro', icon: '/img/miro-icon.svg' },
                { name: 'Fathom', icon: '/img/fathom-icon.svg' },
                { name: 'Lovable', icon: '/img/lovable_icon.svg' },
                { name: 'Excel', icon: '/img/excel-icon.svg' },
              ]}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar - Metadata */}
          <CaseStudySidebar
            role="Product Manager"
            duration="12 jours (Oct 2024)"
            team="4 PMs"
            client="Welcome to the Jungle"
            industry="HR Tech / Job Platform"
            context="Formation PM Maestro"
          />

          {/* Main Content */}
          <main>
            {/* TL;DR avec Disclaimer Formation */}
            <section className="mb-16">
              <CaseStudyTLDR
                items={[
                  {
                    label: 'Context',
                    content: 'Training project completed as part of Product Management Maestro (12 days)',
                  },
                  {
                    label: 'Challenge',
                    content: 'Senior profiles CTR at 11% vs 20% for junior profiles',
                  },
                  {
                    label: 'Strategic Pivot',
                    content: 'Focus on tech profiles with 5-8 years of experience as core segment',
                  },
                  {
                    label: 'MVP Solution',
                    content: 'Standardization + AI-powered recommendations + Advanced filters',
                  },
                {
                  label: 'Target Impact',
                  content: 'Increase senior CTR from 11% to 13% within 6 months',
                },
                {
                  label: 'Key Constraints',
                  content: '12-day project timeline (training context) ; Focus on quick wins and realistic MVP scope',
                },
              ]}
                disclaimer={{
                  type: 'academic',
                  message:
                    'This is an academic case study completed during Product Management Maestro training. No contractual relationship exists with Welcome to the Jungle.',
                }}
                accentColor="blue"
              />
            </section>

            {/* Section 1: Context & Problem */}
            <section className="mb-16" id="context-problem" aria-labelledby="context-problem-heading">
              <h2 id="context-problem-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                1. Context & Problem
              </h2>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">The Challenge</h3>
                <p className="text-base text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                  Welcome to the Jungle (WTTJ) is a leading HR tech platform connecting job seekers
                  with companies. While junior profiles achieved a 20% click-through rate (CTR),
                  senior profiles with 5+ years of experience struggled at only 11% CTR.
                </p>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Why It Matters</h3>
                <ul className="space-y-2 text-base text-gray-800 dark:text-gray-200 mb-8 list-none">
                  <li className="flex items-start">
                    <span className="text-gray-900 dark:text-gray-100 mr-3 mt-1 font-bold" aria-hidden="true">•</span>
                    <span>Senior profiles represent higher-value placements for WTTJ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 dark:text-gray-100 mr-3 mt-1 font-bold" aria-hidden="true">•</span>
                    <span>Companies specifically seek experienced talent for strategic roles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 dark:text-gray-100 mr-3 mt-1 font-bold" aria-hidden="true">•</span>
                    <span>Low engagement suggests platform mismatch with senior expectations</span>
                  </li>
                </ul>
              </div>

              {/* Context Image */}
              <div className="mb-8 max-w-xl mx-auto">
                <CaseImage
                  alt="Data and market signals showing senior profile engagement metrics"
                  desktopSrc="/WTTJ/contexte-desktop.png"
                  caption="Data and market signals"
                />
              </div>
            </section>

            {/* Section 2: Discovery */}
            <section className="mb-16" id="discovery" aria-labelledby="discovery-heading">
              <h2 id="discovery-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                2. Discovery
              </h2>

              <div className="mb-8">
                <p className="text-base text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                  We conducted 8 qualitative video interviews with senior profiles (tech and other
                  industries) to understand their job search behavior and pain points.
                </p>
                <ul className="space-y-2 text-base text-gray-800 dark:text-gray-200 mb-8">
                  <li>Insights: transparency (salary, missions), relevant filters, guidance</li>
                  <li>CTR seniors ≈ 11% vs 20% juniors; need for offer clarity</li>
                  <li>Senior profiles seek stability and clear career progression</li>
                </ul>
              </div>

              {/* Discovery Images */}
              <div className="space-y-8 max-w-xl mx-auto">
                <CaseImage
                  alt="JTBD and key verbatims from user interviews"
                  desktopSrc="/WTTJ/jtbd-desktop.png"
                  caption="JTBD and key verbatims"
                  onClick={() => openLightbox(0)}
                />
                <CaseImage
                  alt="User journey mapping for senior profiles"
                  desktopSrc="/WTTJ/etude_de_cas_p31_desktop.png"
                  caption="User journey mapping"
                  onClick={() => openLightbox(1)}
                />
              </div>
            </section>

            {/* Section 3: Strategic Pivot */}
            <section className="mb-16" id="pivot" aria-labelledby="pivot-heading">
              <h2 id="pivot-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                3. Strategic Pivot
              </h2>

              <div className="mb-8">
                <p className="text-base text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                  Based on our research, we identified that tech profiles with 5-8 years of
                  experience represent the highest-value segment for WTTJ. This strategic pivot
                  allowed us to focus our solution on a well-defined target audience.
                </p>
              </div>

              {/* Pivot Image */}
              <div className="mb-8 max-w-xl mx-auto">
                <CaseImage
                  alt="Strategic pivot analysis showing target segment selection"
                  desktopSrc="/WTTJ/pivot-desktop.png"
                  caption="Strategic pivot: Focus on tech seniors 5-8 years"
                  onClick={() => openLightbox(2)}
                />
              </div>
            </section>

            {/* Section 4: Process & Key Decisions (Timeline) */}
            <section className="mb-16" id="process" aria-labelledby="process-heading">
              <h2 id="process-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                4. Process & Key Decisions
              </h2>
              <TimelineContainer>
                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">1</span>}
                  phase="Discovery"
                  description="Understanding the problem space and user needs"
                  bullets={[
                    'Analyzed WTTJ platform UX for senior profiles',
                    'Competitive research: LinkedIn, Indeed, Monster',
                    'Synthesized public reviews and forum discussions',
                    'Identified key pain points: generic listings, poor filters',
                  ]}
                  metric={{
                    label: 'Key Insight',
                    value: 'Seniors seek stability & clear career progression over quantity of offers',
                  }}
                  index={0}
                />

                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">2</span>}
                  phase="Segmentation"
                  description="Defining our target audience"
                  bullets={[
                    'Created 3 personas: Junior (0-2y), Mid (3-5y), Senior (5-8y)',
                    'Focused on tech profiles (developers, designers, PMs)',
                    'Analyzed behavior patterns per segment',
                    'Validated segment size and business value',
                  ]}
                  metric={{
                    label: 'Strategic Decision',
                    value: 'Target tech seniors 5-8 years as highest-value segment',
                  }}
                  index={1}
                />

                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">3</span>}
                  phase="Ideation"
                  description="Generating and prioritizing solutions"
                  bullets={[
                    '3 team brainstorming sessions (20+ ideas)',
                    'Prioritization matrix: Impact vs Effort',
                    'Evaluated feasibility with tech constraints',
                    'Aligned solutions with WTTJ business model',
                  ]}
                  metric={{
                    label: 'Ideas Generated',
                    value: '22 concepts → 5 prioritized features',
                  }}
                  index={2}
                />

                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">4</span>}
                  phase="Validation"
                  description="Testing hypotheses and assumptions"
                  bullets={[
                    'Validated with industry best practices',
                    'Competitor benchmarking for feature inspiration',
                    'Estimated ROI for top 5 features',
                    'Defined success metrics and tracking plan',
                  ]}
                  index={3}
                />

                <TimelinePhase
                  icon={<span className="text-2xl font-bold text-gray-700 dark:text-gray-300" aria-hidden="true">5</span>}
                  phase="MVP Definition"
                  description="Defining minimum viable solution"
                  bullets={[
                    'Scoped 3 core features for MVP',
                    'Created user flows and wireframes',
                    'Defined 6-month roadmap phases',
                    'Prepared stakeholder presentation',
                  ]}
                  metric={{
                    label: 'MVP Scope',
                    value: '3 features, 3-month build estimate',
                  }}
                  index={4}
                />
              </TimelineContainer>
            </section>

            {/* Section 5: Solution & Prototype - MAIN FOCUS */}
            <section className="mb-16" id="solution" aria-labelledby="solution-heading">
              <h2 id="solution-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                5. Solution & Prototype
              </h2>
              
              <div className="mb-8">
                <p className="text-base text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                  Our MVP focused on three core features designed to address senior professionals'
                  specific needs while remaining achievable within realistic constraints.
                </p>
              </div>


              {/* Features - Simplified list instead of cards */}
              <div className="mb-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">1. Offer Standardization</h3>
                  <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                    Structured job listings with mandatory fields: salary range, tech stack, team size, career path.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">2. AI-Powered Recommendations</h3>
                  <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                    Personalized job matching based on experience level, skills, and career trajectory preferences.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">3. Advanced Filters</h3>
                  <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                    Senior-specific filters: remote policy, management opportunities, equity options, company size.
                  </p>
                </div>
              </div>

              {/* PROTOTYPE - MAIN FOCUS - Large and clickable */}
              <div className="mb-8 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Interactive Prototype</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      Click the image below to explore the full prototype with all features implemented
                    </p>
                  </div>
                  <a
                    href="https://prototype-wttj.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                    aria-label="Open interactive prototype in new tab"
                  >
                    <CaseImage
                      alt="Interactive prototype showing the complete solution"
                      desktopSrc="/WTTJ/proto-onboarding-desktop.png"
                      caption="Interactive prototype - Click to explore"
                    />
                  </a>
                </div>
              </div>

              {/* Strategy Images - 3 images on same line */}
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                <CaseImage
                  alt="User testing results and feedback"
                  desktopSrc="/WTTJ/tests-desktop.png"
                  caption="User testing results"
                  onClick={() => openLightbox(3)}
                />
                <CaseImage
                  alt="Go to market strategy"
                  desktopSrc="/WTTJ/go-to-market-desktop.png"
                  caption="Go to market strategy"
                  onClick={() => openLightbox(4)}
                />
                <CaseImage
                  alt="Risk matrix and mitigation strategies"
                  desktopSrc="/WTTJ/risques-desktop.png"
                  caption="Risk matrix and mitigation strategies"
                  onClick={() => openLightbox(5)}
                />
              </div>
            </section>

            {/* Key Learnings */}
            <section className="mb-16" id="learnings" aria-labelledby="learnings-heading">
              <KeyLearningsGrid title="Key Learnings" columns={2}>
                <KeyLearning
                  title="Segment-specific UX matters"
                  description="Senior professionals have fundamentally different needs than juniors. Generic platforms fail both segments. Tailored experiences drive better engagement and conversion."
                  color="blue"
                />

                <KeyLearning
                  title="Information transparency builds trust"
                  description="Salary ranges, tech stacks, and career paths are non-negotiable for experienced candidates. Hiding these creates friction and reduces platform credibility."
                  color="blue"
                />

                <KeyLearning
                  title="Quick wins enable learning"
                  description="MVP approach allowed us to prioritize high-impact features and build a testable solution within constraints. Perfect is the enemy of shipped."
                  color="blue"
                />

                <KeyLearning
                  title="Cross-functional collaboration accelerates"
                  description="Working with diverse PM backgrounds enriched our analysis and challenged assumptions. Multiple perspectives revealed blind spots and strengthened solutions."
                  color="blue"
                />
              </KeyLearningsGrid>
            </section>

            {/* Section 6: Go Further */}
            <section className="mb-16" id="go-further" aria-labelledby="go-further-heading">
              <h2 id="go-further-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                6. Go Further
              </h2>

              {/* Product Spotlight Card */}
              <div className="mb-8">
                <a
                  href="https://solutions.welcometothejungle.com/ressources/event/product-spotlight-automne-2025?utm_campaign=27412829-Product%20Spotlight&utm_medium=email&_hsenc=p2ANqtz-9_uB7KAf0g7zXQazW2aiIcoCcUP48yORQH20pX0RFParQaTrUl4d-AUupML_57MNkTddWtdMZtgnUf3BKqa8pUA4FjhrjURT6r2i1zXqJSaxMrFKo&_hsmi=387584487&utm_content=387584487&utm_source=hs_email"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-6 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-transparent transition-all group hover:border-gray-300 dark:hover:border-gray-600"
                >
                  <div className="h-20 flex items-center justify-center mb-4">
                    <img
                      src={wttjLogo}
                      alt="Welcome to the Jungle"
                      className="h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 flex-grow">
                    Product Spotlight - Fall 2025
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 flex-grow">
                    Hidden features, pro tips, and product updates in preview!
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:underline underline-offset-4 transition-all">
                    Explore <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </div>

              {/* Acknowledgments */}
              <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Acknowledgments</h3>
                <div className="flex items-center gap-6 mb-4 flex-wrap">
                  <img
                    src={wttjLogo}
                    alt="Welcome to the Jungle"
                    className="h-10 object-contain"
                  />
                  <img
                    src="/img/maestro-icon.svg"
                    alt="Product Management Maestro"
                    className="h-10 object-contain"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
                </div>
                <p className="text-base text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
                  This project was completed as part of the <strong className="text-gray-900 dark:text-gray-100">Product Management Maestro</strong>{' '}
                  training program (October 2024). Special thanks to my teammates <strong className="text-gray-900 dark:text-gray-100">Clotilde</strong>,{' '}
                  <strong className="text-gray-900 dark:text-gray-100">Aminata</strong>, and <strong className="text-gray-900 dark:text-gray-100">Jean-Jules</strong> for their outstanding collaboration,
                  diverse perspectives, and dedication throughout this intense 12-day sprint.
                </p>
                <p className="text-base text-gray-800 dark:text-gray-200 mb-4">
                  Thank you to <strong className="text-gray-900 dark:text-gray-100">Welcome to the Jungle</strong> for serving as our case study subject. This
                  is an academic exercise with no contractual relationship with WTTJ.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 italic">
                  All data, insights, and recommendations are based on public information and competitive analysis.
                  No proprietary WTTJ data was accessed or used.
                </p>
              </div>
            </section>

            {/* Contact Banner */}
            <div className="mb-8 p-8 bg-contact text-contact-foreground rounded-xl" role="complementary" aria-label="Contact">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Contact</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.mail.href}
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-100 text-contact dark:text-gray-900 rounded-lg font-medium hover:bg-white/90 dark:hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-gray-300"
                  aria-label="Send email"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-100 text-contact dark:text-gray-900 rounded-lg font-medium hover:bg-white/90 dark:hover:bg-gray-200 hover:text-[#0077B5] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-gray-300 group"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin className="mr-2 h-5 w-5 group-hover:text-[#0077B5] transition-colors" />
                  LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.calendar.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-100 text-contact dark:text-gray-900 rounded-lg font-medium hover:bg-white/90 dark:hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-gray-300"
                  aria-label="Schedule a meeting"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Calendar
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ProgressIndicator
        sections={[
          { id: 'context-problem', label: 'Context & Problem' },
          { id: 'discovery', label: 'Discovery' },
          { id: 'pivot', label: 'Strategic Pivot' },
          { id: 'process', label: 'Process & Key Decisions' },
          { id: 'solution', label: 'Solution & Prototype' },
          { id: 'learnings', label: 'Key Learnings' },
          { id: 'go-further', label: 'Go Further' },
        ]}
      />

      <Footer
        siteName="Ivan de Murard"
        tagline="Product Designer & Manager crafting user-centered experiences"
        sections={[{ id: 'home', label: 'Back to Portfolio' }]}
        onSectionClick={scrollToSection}
      />

      {/* Image Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
