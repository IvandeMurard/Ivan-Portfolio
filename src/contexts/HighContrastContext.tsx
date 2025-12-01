import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HighContrastContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  setHighContrast: (enabled: boolean) => void;
}

const HighContrastContext = createContext<HighContrastContextType | undefined>(undefined);

interface HighContrastProviderProps {
  children: ReactNode;
}

export const HighContrastProvider: React.FC<HighContrastProviderProps> = ({ children }) => {
  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('highContrast');
    if (saved !== null) {
      return saved === 'true';
    }
    
    // Check system preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
    return prefersHighContrast;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('highContrast', String(highContrast));
    
    // Apply class to html element
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: more)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't set a preference
      const savedPreference = localStorage.getItem('highContrast');
      if (savedPreference === null) {
        setHighContrastState(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
  };

  const toggleHighContrast = () => {
    setHighContrastState(prev => !prev);
  };

  const value: HighContrastContextType = {
    highContrast,
    setHighContrast,
    toggleHighContrast,
  };

  return (
    <HighContrastContext.Provider value={value}>
      {children}
    </HighContrastContext.Provider>
  );
};

export const useHighContrast = () => {
  const context = useContext(HighContrastContext);
  if (context === undefined) {
    throw new Error('useHighContrast must be used within a HighContrastProvider');
  }
  return context;
};
