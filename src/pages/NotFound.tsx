import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access:", location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    if (id === "home" || id === "hero") {
      navigate("/");
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      navigate("/");
      // Wait for navigation then scroll to section
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  };

  const proofPoints = [
    "Won 2 AI hackathons building agents & products",
    "Ship regurlaly new projects",
    "5+ years accompagnying various companies launching new projects",
  ];

  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <section className="relative min-h-screen pt-24 bg-background">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/15 dark:to-primary/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-[60fr_40fr] gap-8 lg:gap-12 items-start min-h-[70vh]">
            {/* Colonne gauche - Contenu */}
            <div className="space-y-8">
              {/* Hero Statement */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground"
              >
                I build AI products
                <br />
                that feel human.
              </motion.h1>

              {/* Sub-statement */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl font-medium mt-4 text-foreground/90"
              >
                I ship fast, polish after.
              </motion.h2>

              {/* Texte explicatif */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg leading-relaxed mt-6 text-foreground/80"
              >
                This page isn't ready yet.
                <br />
                But if you're looking for a PM who combines AI execution with human-first thinking, you're in the right place.
              </motion.p>

              {/* Proof Points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="space-y-3 mt-8"
              >
                {proofPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-base md:text-lg text-foreground/80"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-lg border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  onClick={() => scrollToSection("resources")}
                  aria-label="View my approach"
                >
                  My approach
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-lg border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  onClick={() => navigate("/")}
                  aria-label="View my work"
                >
                  View my work
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-lg border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  onClick={() => scrollToSection("contact")}
                  aria-label="Let's connect"
                >
                  Let's connect
                </Button>
              </motion.div>
            </div>

            {/* Colonne droite - Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:pt-8"
            >
              <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-2">Let's connect</h3>
                <p className="text-primary-foreground/90 mb-6 text-sm">
                  It's on me, give me a chance to get back to you
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        siteName="Ivan de Murard"
        tagline="Product Manager building user-centered experiences"
        sections={[
          { id: "hero", label: "Welcome" },
          { id: "work", label: "Work" },
          { id: "hackathons", label: "Hackathons" },
          { id: "experience", label: "Experience" },
          { id: "resources", label: "Resources" },
          { id: "contact", label: "Contact" },
        ]}
        onSectionClick={scrollToSection}
      />
    </div>
  );
};

export default NotFound;
