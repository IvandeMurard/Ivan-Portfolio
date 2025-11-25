import { useEffect, useState, Component, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

// Error Boundary to catch Router context errors
class RouterErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Silently catch Router context errors
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

// Main ScrollToTop component that uses Router
const ScrollToTopWithRouter = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Scroll to top on route change, or to section if hash is present
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  // Detect theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 rounded-full p-3.5 transition-all duration-300"
          aria-label="Retour en haut"
          style={{
            border: isDark 
              ? "1px solid hsl(var(--border) / 0.2)" 
              : "1px solid hsl(var(--border) / 0.3)",
            background: isDark 
              ? "hsl(var(--background) / 0.6)" 
              : "hsl(var(--background) / 0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: isDark
              ? "0 4px 16px hsl(var(--foreground) / 0.1), inset 0 1px 0 hsl(var(--background) / 0.8)"
              : "0 6px 20px hsl(var(--foreground) / 0.12), inset 0 1px 0 hsl(var(--background) / 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.08)";
            e.currentTarget.style.boxShadow = isDark
              ? "0 8px 24px hsl(var(--foreground) / 0.15), inset 0 1px 0 hsl(var(--background) / 0.9)"
              : "0 10px 30px hsl(var(--foreground) / 0.18), inset 0 1px 0 hsl(var(--background) / 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = isDark
              ? "0 4px 16px hsl(var(--foreground) / 0.1), inset 0 1px 0 hsl(var(--background) / 0.8)"
              : "0 6px 20px hsl(var(--foreground) / 0.12), inset 0 1px 0 hsl(var(--background) / 1)";
          }}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

// Fallback version without Router (just scroll button, no route detection)
const ScrollToTopFallback = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 rounded-full p-3.5 transition-all duration-300"
          aria-label="Retour en haut"
          style={{
            border: isDark 
              ? "1px solid hsl(var(--border) / 0.2)" 
              : "1px solid hsl(var(--border) / 0.3)",
            background: isDark 
              ? "hsl(var(--background) / 0.6)" 
              : "hsl(var(--background) / 0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: isDark
              ? "0 4px 16px hsl(var(--foreground) / 0.1), inset 0 1px 0 hsl(var(--background) / 0.8)"
              : "0 6px 20px hsl(var(--foreground) / 0.12), inset 0 1px 0 hsl(var(--background) / 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

// Export wrapped component with error boundary
export const ScrollToTop = () => (
  <RouterErrorBoundary fallback={<ScrollToTopFallback />}>
    <ScrollToTopWithRouter />
  </RouterErrorBoundary>
);
